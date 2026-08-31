function PhotoCardModalHost({ item, db, onClose, defaultVersion = "v2", onSelectItem, setCurrentTab }) {
  const [currentVersion, setCurrentVersion] = Q.useState(() => {
    return localStorage.getItem("ssf_photocard_version") || defaultVersion || "v2";
  });

  const handleVersionChange = (ver) => {
    setCurrentVersion(ver);
    try {
      localStorage.setItem("ssf_photocard_version", ver);
    } catch (e) {}
  };

  return i.jsxs("div", {
    className: "fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-0 sm:p-2 overflow-hidden animate-fadeIn",
    children: [
      i.jsxs("div", {
        className: "w-full max-w-7xl bg-slate-950 border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0 shadow-xl",
        children: [
          i.jsxs("div", {
            className: "flex items-center gap-2",
            children: [
              i.jsx("span", { className: "text-xs font-bold text-slate-400 hidden sm:inline mr-1", children: "সংস্করণ পরিবর্তন:" }),
              i.jsxs("button", {
                onClick: () => handleVersionChange("v2"),
                className: "px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer " + (currentVersion === "v2" ? "bg-rose-600 text-white shadow-md shadow-rose-950 ring-1 ring-rose-400/50" : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"),
                children: [
                  i.jsx("span", { className: "w-2 h-2 rounded-full bg-white animate-pulse" }),
                  i.jsx("span", { children: "ফটোকার্ড মেকার V2 (Borbila জেনারেটর)" }),
                  i.jsx("span", { className: "text-[10px] px-1.5 py-0.2 rounded bg-black/40 text-emerald-300 font-mono", children: "NEW V2" })
                ]
              }),
              i.jsxs("button", {
                onClick: () => handleVersionChange("v1"),
                className: "px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer " + (currentVersion === "v1" ? "bg-rose-600 text-white shadow-md shadow-rose-950 ring-1 ring-rose-400/50" : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"),
                children: [
                  i.jsx("span", { children: "ফটোকার্ড মেকার V1 (ক্লাসিক স্টুডিও)" }),
                  i.jsx("span", { className: "text-[10px] px-1.5 py-0.2 rounded bg-black/40 text-slate-300 font-mono", children: "২৮+ টেমপ্লেট" })
                ]
              })
            ]
          }),
          i.jsxs("button", {
            onClick: onClose,
            className: "p-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg text-xs transition cursor-pointer border border-slate-800 flex items-center gap-1.5 shadow-sm",
            children: [
              i.jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: i.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M6 18L18 6M6 6l12 12" }) }),
              i.jsx("span", { className: "text-xs font-semibold", children: "বন্ধ করুন" })
            ]
          })
        ]
      }),
      i.jsx("div", {
        className: "w-full max-w-7xl flex-grow overflow-hidden flex flex-col bg-slate-950 rounded-b-xl shadow-2xl relative",
        children: currentVersion === "v2"
          ? i.jsx(BorbilaPhotoCardV2, { item: item, db: db, onClose: onClose, onSelectItem: onSelectItem, setCurrentTab: setCurrentTab })
          : i.jsx(GQ, { item: item, onClose: onClose })
      })
    ]
  });
}

window.BorbilaPhotoCardV2 = BorbilaPhotoCardV2;
window.PhotoCardModalHost = PhotoCardModalHost;

