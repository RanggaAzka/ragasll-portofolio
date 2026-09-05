import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registering plugins at import time is safe here because this module is
// only ever imported from "use client" components, and the guard keeps the
// Node-side render pass (which has no `window`) from touching the DOM APIs
// ScrollTrigger relies on.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
