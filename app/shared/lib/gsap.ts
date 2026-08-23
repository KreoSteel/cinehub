import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SlideEffectConfig {
  duration?: number;
  y?: number;
  stagger?: number;
}

gsap.registerPlugin(ScrollTrigger, useGSAP);

gsap.registerEffect({
  name: "slide",
  effect: (targets: string, config: SlideEffectConfig) => {
    return gsap.fromTo(targets, { y: config.y, opacity: 0 },
      { y: 0, opacity: 1, duration: config.duration, ease: "power4.out", clear: "transform,opacity", delay: 0.2 ,stagger: config.stagger, scrollTrigger: { trigger: targets } })
  },
  defaults: { duration: 1.4, y: 120, stagger: 0.1 },
})

export { gsap, useGSAP, ScrollTrigger };