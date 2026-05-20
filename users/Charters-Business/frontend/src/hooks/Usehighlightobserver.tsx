// import { useEffect } from "react";

// export function useHighlightObserver(threshold = 0.3) {
//     useEffect(() => {
//         console.log('[useHighlightObserver] Initializing observer with threshold:', threshold);

//         const observer = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach((entry) => {
//                     console.log('[useHighlightObserver] Entry:', entry.target.textContent.trim(), 'isIntersecting:', entry.isIntersecting, 'classes:', entry.target.className);
//                     if (entry.isIntersecting) {
//                         entry.target.classList.add("hl-active");
//                         console.log('[useHighlightObserver] Added hl-active to:', entry.target);
//                     } else {
//                         entry.target.classList.remove("hl-active");
//                         console.log('[useHighlightObserver] Removed hl-active from:', entry.target);
//                     }
//                 });
//             },
//             { threshold }
//         );

//         const observeAll = () => {
//             const elements = document.querySelectorAll(".hl-wrap");
//             console.log('[useHighlightObserver] Found .hl-wrap elements:', elements.length);

//             elements.forEach((el) => {
//                 if (!(el as HTMLElement).dataset.hlObserved) {
//                     (el as HTMLElement).dataset.hlObserved = "true";
//                     console.log('[useHighlightObserver] Observing element:', el.textContent.trim());
//                     observer.observe(el);
//                 }
//             });
//         };

//         // Initial observation
//         observeAll();

//         // Watch for new .hl-wrap elements added to DOM (for client-side navigation, hydration, etc.)
//         const mutationObserver = new MutationObserver((mutations) => {
//             let newWrapsFound = false;
//             mutations.forEach((mutation) => {
//                 mutation.addedNodes.forEach((node) => {
//                     if (node.nodeType === Node.ELEMENT_NODE) {
//                         const el = node as Element;
//                         if (el.matches && el.matches('.hl-wrap')) {
//                             newWrapsFound = true;
//                         }
//                         // Also check descendants
//                         const descendantWraps = el.querySelectorAll?.('.hl-wrap') || [];
//                         if (descendantWraps.length > 0) {
//                             newWrapsFound = true;
//                         }
//                     }
//                 });
//             });

//             if (newWrapsFound) {
//                 console.log('[useHighlightObserver] DOM mutation detected, re-scanning for .hl-wrap elements');
//                 // Use setTimeout to ensure elements are fully rendered
//                 setTimeout(observeAll, 0);
//             }
//         });

//         mutationObserver.observe(document.body, { childList: true, subtree: true });

//         return () => {
//             console.log('[useHighlightObserver] Disconnecting observers');
//             observer.disconnect();
//             mutationObserver.disconnect();
//         };
//     }, [threshold]);
// }