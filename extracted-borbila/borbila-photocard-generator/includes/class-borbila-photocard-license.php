<?php
if (!defined('ABSPATH')) {
    exit;
}

/** Secure Borbila license client for PhotoCard Generator. */
final class Borbila_PhotoCard_License
{
    const OPTION_NAME  = 'borbila_photocard_license';
    const TEMPLATE_ID  = 'photocard';
    const API_BASE_URL = 'https://borbila.com/wp-json/borbila-license/v1';
    const CRON_HOOK    = 'borbila_photocard_daily_license_check';

    private const MASTER_SENTINEL = 'BORBILA-PHOTOCARD-MASTER-ACTIVE';
    private const MASTER_KEY_HASH = 'cd9fecc95a533bfd7ed1b62a34a6105f4cb74e5495c20c986a1a7121c9a8f484';

    public static function register_hooks()
    {
        add_action('admin_init', array(__CLASS__, 'ensure_schedule'));
        add_action(self::CRON_HOOK, array(__CLASS__, 'check'));
        add_action('admin_post_borbila_photocard_license_action', array(__CLASS__, 'handle_admin_action'));
    }

    public static function defaults()
    {
        return array(
            'license_key'      => '',
            'source'           => '',
            'status'           => 'inactive',
            'message'          => '',
            'activated_domain' => '',
            'last_checked'     => '',
        );
    }

    public static function install()
    {
        if (!is_array(get_option(self::OPTION_NAME, null))) {
            update_option(self::OPTION_NAME, self::defaults(), false);
        }

        self::ensure_schedule();
    }

    public static function ensure_schedule()
    {
        if (!wp_next_scheduled(self::CRON_HOOK)) {
            wp_schedule_event(time() + HOUR_IN_SECONDS, 'daily', self::CRON_HOOK);
        }
    }

    public static function unschedule()
    {
        wp_clear_scheduled_hook(self::CRON_HOOK);
    }

    public static function get()
    {
        $stored = get_option(self::OPTION_NAME, array());
        $stored = is_array($stored) ? wp_parse_args($stored, self::defaults()) : self::defaults();
        $source = sanitize_key($stored['source']);

        return array(
            'license_key'      => self::sanitize_license_key($stored['license_key']),
            'source'           => in_array($source, array('master', 'server'), true) ? $source : '',
            'status'           => sanitize_key($stored['status']) ?: 'inactive',
            'message'          => sanitize_text_field($stored['message']),
            'activated_domain' => self::normalize_domain($stored['activated_domain']),
            'last_checked'     => sanitize_text_field($stored['last_checked']),
        );
    }

    public static function is_active()
    {
        $license = self::get();
        if ('active' !== $license['status']) {
            return false;
        }

        if ('master' === $license['source']) {
            return self::MASTER_SENTINEL === $license['license_key'];
        }

        return 'server' === $license['source'] && '' !== $license['license_key'];
    }

    public static function activate($submitted_key)
    {
        $current       = self::get();
        $submitted_key = trim(sanitize_text_field((string) $submitted_key));
        $key           = false !== strpos($submitted_key, '•') ? $current['license_key'] : self::sanitize_license_key($submitted_key);

        if ('' === $key) {
            return self::result(false, __('License key is required.', 'borbila-photocard-generator'));
        }

        if (self::MASTER_SENTINEL === $key && 'master' === $current['source']) {
            self::activate_master();
            return self::result(true, __('Master license is valid.', 'borbila-photocard-generator'));
        }

        if (hash_equals(self::MASTER_KEY_HASH, hash('sha256', $key))) {
            self::activate_master();
            return self::result(true, __('Master license activated instantly.', 'borbila-photocard-generator'));
        }

        if (self::MASTER_SENTINEL === $key) {
            return self::result(false, __('Enter a valid Borbila license key.', 'borbila-photocard-generator'));
        }

        $response = self::request('activate', $key);
        if ($response['success']) {
            self::save(array(
                'license_key'      => $key,
                'source'           => 'server',
                'status'           => 'active',
                'message'          => $response['message'],
                'activated_domain' => self::domain(),
                'last_checked'     => current_time('mysql'),
            ));

            return self::result(true, $response['message'] ?: __('License activated.', 'borbila-photocard-generator'));
        }

        if ($response['connection_error'] && self::is_active()) {
            self::save(array('message' => $response['message'], 'last_checked' => current_time('mysql')));
        } else {
            self::save(array(
                'license_key'      => $key,
                'source'           => 'server',
                'status'           => $response['connection_error'] ? 'inactive' : 'invalid',
                'message'          => $response['message'],
                'activated_domain' => '',
                'last_checked'     => current_time('mysql'),
            ));
        }

        return self::result(false, $response['message']);
    }

    public static function check()
    {
        $license = self::get();

        if ('master' === $license['source']) {
            self::activate_master();
            return self::result(true, __('Master license is valid.', 'borbila-photocard-generator'));
        }

        if ('' === $license['license_key']) {
            return self::result(false, __('No license key is saved.', 'borbila-photocard-generator'));
        }

        $response = self::request('check', $license['license_key']);
        if ($response['connection_error']) {
            self::save(array('message' => $response['message'], 'last_checked' => current_time('mysql')));
            return self::result(false, $response['message']);
        }

        self::save(array(
            'status'           => $response['success'] ? 'active' : 'invalid',
            'message'          => $response['message'],
            'activated_domain' => $response['success'] ? self::domain() : '',
            'last_checked'     => current_time('mysql'),
        ));

        return self::result($response['success'], $response['message']);
    }

    public static function deactivate()
    {
        $license = self::get();

        if ('master' !== $license['source'] && '' !== $license['license_key']) {
            $response = self::request('deactivate', $license['license_key']);
            if ($response['connection_error']) {
                return self::result(false, $response['message']);
            }
        }

        self::save(array(
            'license_key'      => '',
            'source'           => '',
            'status'           => 'inactive',
            'message'          => __('License deactivated.', 'borbila-photocard-generator'),
            'activated_domain' => '',
            'last_checked'     => current_time('mysql'),
        ));

        return self::result(true, __('License deactivated.', 'borbila-photocard-generator'));
    }

    public static function handle_admin_action()
    {
        if (!current_user_can('manage_options')) {
            wp_die(esc_html__('You are not allowed to manage this license.', 'borbila-photocard-generator'));
        }

        check_admin_referer('borbila_photocard_license_action', 'borbila_photocard_license_nonce');
        $operation = isset($_POST['license_operation']) && is_scalar($_POST['license_operation'])
            ? sanitize_key(wp_unslash($_POST['license_operation']))
            : '';

        if ('activate' === $operation) {
            $key    = isset($_POST['license_key']) && is_scalar($_POST['license_key']) ? wp_unslash($_POST['license_key']) : '';
            $result = self::activate($key);
        } elseif ('check' === $operation) {
            $result = self::check();
        } elseif ('deactivate' === $operation) {
            $result = self::deactivate();
        } else {
            $result = self::result(false, __('Invalid license action.', 'borbila-photocard-generator'));
        }

        set_transient(
            'borbila_photocard_license_notice_' . get_current_user_id(),
            array(
                'success' => !empty($result['success']),
                'message' => sanitize_text_field(isset($result['message']) ? $result['message'] : ''),
            ),
            MINUTE_IN_SECONDS
        );

        wp_safe_redirect(admin_url('admin.php?page=borbila-photocard-generator&tab=license#tab-license'));
        exit;
    }

    public static function mask($key)
    {
        $key = self::sanitize_license_key($key);
        if ('' === $key) {
            return '';
        }

        if (self::MASTER_SENTINEL === $key) {
            return 'Master license · •••1426';
        }

        return substr($key, 0, 4) . '-••••-••••-' . substr($key, -4);
    }

    public static function domain()
    {
        return self::normalize_domain(home_url('/'));
    }

    private static function activate_master()
    {
        self::save(array(
            'license_key'      => self::MASTER_SENTINEL,
            'source'           => 'master',
            'status'           => 'active',
            'message'          => __('Master license valid.', 'borbila-photocard-generator'),
            'activated_domain' => self::domain(),
            'last_checked'     => current_time('mysql'),
        ));
    }

    private static function request($action, $key)
    {
        $response = wp_remote_post(
            trailingslashit(self::API_BASE_URL) . sanitize_key($action),
            array(
                'timeout'     => 20,
                'redirection' => 3,
                'sslverify'   => true,
                'headers'     => array('Accept' => 'application/json', 'Content-Type' => 'application/json'),
                'body'        => wp_json_encode(array(
                    'license_key' => self::sanitize_license_key($key),
                    'template_id' => self::TEMPLATE_ID,
                    'domain'      => self::domain(),
                )),
            )
        );

        if (is_wp_error($response)) {
            return array(
                'success'          => false,
                'connection_error' => true,
                'message'          => __('Could not connect to the Borbila license server.', 'borbila-photocard-generator'),
            );
        }

        $data = json_decode(wp_remote_retrieve_body($response), true);
        if (!is_array($data) || !array_key_exists('success', $data)) {
            return array(
                'success'          => false,
                'connection_error' => true,
                'message'          => __('Invalid license server response.', 'borbila-photocard-generator'),
            );
        }

        $success = true === $data['success'] || 1 === $data['success'] || in_array(strtolower((string) $data['success']), array('1', 'true', 'yes'), true);
        $message = isset($data['message']) && is_scalar($data['message']) ? sanitize_text_field((string) $data['message']) : '';

        return array('success' => $success, 'connection_error' => false, 'message' => $message);
    }

    private static function save($values)
    {
        $data   = wp_parse_args($values, self::get());
        $source = sanitize_key($data['source']);

        update_option(
            self::OPTION_NAME,
            array(
                'license_key'      => self::sanitize_license_key($data['license_key']),
                'source'           => in_array($source, array('master', 'server'), true) ? $source : '',
                'status'           => sanitize_key($data['status']),
                'message'          => sanitize_text_field($data['message']),
                'activated_domain' => self::normalize_domain($data['activated_domain']),
                'last_checked'     => sanitize_text_field($data['last_checked']),
            ),
            false
        );
    }

    private static function result($success, $message)
    {
        return array('success' => (bool) $success, 'message' => (string) $message, 'license' => self::get());
    }

    private static function sanitize_license_key($key)
    {
        $key = strtoupper(trim(sanitize_text_field((string) $key)));
        return substr((string) preg_replace('/[^A-Z0-9\-]/', '', $key), 0, 64);
    }

    private static function normalize_domain($value)
    {
        $value  = strtolower(trim((string) $value));
        $parsed = false !== strpos($value, '://') ? $value : 'https://' . ltrim($value, '/');
        $domain = wp_parse_url($parsed, PHP_URL_HOST);

        if (!is_string($domain) || '' === $domain) {
            $domain = strtok((string) preg_replace('#^https?://#i', '', $value), '/:');
        }

        return sanitize_text_field(preg_replace('/^www\./i', '', strtolower(trim((string) $domain))));
    }
}
