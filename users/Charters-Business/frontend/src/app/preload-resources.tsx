import ReactDOM from "react-dom";

// Exact /_next/image URLs confirmed from browser console (w=1920)
// ReactDOM.preload is automatically deduplicated by React —
// renders exactly one <link> in <head> regardless of how many layouts nest
const MOBILE_BG =
  "/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fducgcl4dg%2Fimage%2Fupload%2Fq_auto%2Ff_auto%2Fcharters-business%2FBackground-M&w=1920&q=75";
const DESKTOP_BG =
  "/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fducgcl4dg%2Fimage%2Fupload%2Fq_auto%2Ff_auto%2Fcharters-business%2Fbackground&w=1920&q=75";

export function PreloadResources() {
  ReactDOM.preload(MOBILE_BG, {
    as: "image",
    media: "(max-width: 768px)",
  });
  ReactDOM.preload(DESKTOP_BG, {
    as: "image",
    media: "(min-width: 769px)",
  });
  return null;
}