function PhotoCardModalHost({ item, db, onClose, defaultVersion = "v1", onSelectItem, setCurrentTab }) {
  const [currentVersion, setCurrentVersion] = Q.useState(() => {
    return defaultVersion || "v1";
  });

  // Lock document/body scrolling while modal is open, and restore on close
  Q.useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevOverscroll = document.body.style.overscrollBehavior;
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.overscrollBehavior = prevOverscroll;
    };
  }, []);

  const handleVersionChange = (ver) => {
    setCurrentVersion(ver);
  };

  return i.jsxs("div", {
    id: "photocard-builder-modal-host",
    className: "fixed inset-0 z-[150] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-2 sm:p-4 overflow-hidden overscroll-contain animate-fadeIn",
    style: { overscrollBehavior: "contain" },
    children: [
      i.jsxs("div", {
        className: "w-full max-w-7xl h-[95vh] max-h-[95vh] bg-slate-950 border border-slate-800/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden relative",
        children: [
          // Sticky Top Header containing Title, Tab Switcher and Close Button
          i.jsxs("div", {
            className: "w-full bg-slate-950 border-b border-slate-800/80 px-4 py-3 flex items-center justify-between gap-3 shrink-0 shadow-lg sticky top-0 z-50",
            children: [
              // Title
              i.jsxs("div", {
                className: "flex items-center gap-2",
                children: [
                  i.jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse" }),
                  i.jsx("h2", { className: "text-sm sm:text-base font-bold text-white tracking-wide font-sans", children: "ফটোকার্ড স্টুডিও" })
                ]
              }),
              // V1 / V2 Tab Switcher
              i.jsxs("div", {
                className: "flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800/85 gap-1",
                children: [
                  i.jsxs("button", {
                    onClick: () => handleVersionChange("v1"),
                    className: "px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer " + 
                      (currentVersion === "v1" 
                        ? "bg-rose-600 text-white shadow-md shadow-rose-950/40" 
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"),
                    children: [
                      i.jsx("span", { children: "ফটোকার্ড V1" }),
                      i.jsx("span", { className: "text-[10px] px-1.5 py-0.2 rounded bg-black/40 text-rose-300 font-mono hidden sm:inline", children: "ক্লাসিক" })
                    ]
                  }),
                  i.jsxs("button", {
                    onClick: () => handleVersionChange("v2"),
                    className: "px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer " + 
                      (currentVersion === "v2" 
                        ? "bg-rose-600 text-white shadow-md shadow-rose-950/40" 
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"),
                    children: [
                      i.jsx("span", { children: "ফটোকার্ড V2" }),
                      i.jsx("span", { className: "text-[10px] px-1.5 py-0.2 rounded bg-black/40 text-emerald-300 font-mono hidden sm:inline", children: "মডার্ন" })
                    ]
                  })
                ]
              }),
              // Close Button
              i.jsxs("button", {
                onClick: onClose,
                className: "p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl transition-all cursor-pointer border border-slate-800/80 flex items-center gap-1.5 shadow-sm",
                title: "বন্ধ করুন",
                children: [
                  i.jsx("svg", { className: "w-4.5 h-4.5", fill: "none", stroke: "currentColor", strokeWidth: "2", viewBox: "0 0 24 24", children: i.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" }) }),
                  i.jsx("span", { className: "text-xs font-semibold hidden md:inline", children: "বন্ধ করুন" })
                ]
              })
            ]
          }),
          // Modal Scrollable Content Panel
          i.jsx("div", {
            className: "w-full flex-grow min-h-0 h-full overflow-hidden flex flex-col bg-slate-950 relative overscroll-contain",
            style: { overscrollBehavior: "contain" },
            children: currentVersion === "v2"
              ? i.jsx(BorbilaPhotoCardV2, { item: item, db: db, onClose: onClose, onSelectItem: onSelectItem, setCurrentTab: setCurrentTab })
              : i.jsx(GQ, { item: item, onClose: onClose, isNested: true })
          })
        ]
      })
    ]
  });
}

window.BorbilaPhotoCardV2 = BorbilaPhotoCardV2;
window.PhotoCardModalHost = PhotoCardModalHost;
