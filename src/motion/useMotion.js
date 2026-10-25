import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * The page's whole motion system, in one place.
 *
 * One clock: GSAP's ticker drives Lenis, ScrollTrigger and the cursor, so
 * there is a single requestAnimationFrame loop. Everything animates
 * transform, opacity or clip-path. Reduced-motion visitors get the final
 * state with no tweens, and touch devices keep native scrolling.
 *
 * Vocabulary (data attributes in the markup):
 *   data-split   heading lines rise out of a mask
 *   data-rise    children rise in sequence
 *   data-stage   project stage: a cinematic, scroll-linked settle
 *   data-count   number counts up once
 *   data-draw    SVG stroke draws as it scrolls through
 */
export function useMotion(onLenis) {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        fine: "(hover: hover) and (pointer: fine)",
        wide: "(min-width: 900px)",
      },
      (ctx) => {
        const { motion, fine, wide } = ctx.conditions;
        if (!motion) return undefined;

        // Smooth wheel scrolling on desktop, driven by the shared ticker.
        let lenis = null;
        let tick = null;
        if (fine) {
          lenis = new Lenis({ lerp: 0.11, smoothWheel: true });
          lenis.on("scroll", ScrollTrigger.update);
          tick = (time) => lenis.raf(time * 1000);
          gsap.ticker.add(tick);
          gsap.ticker.lagSmoothing(0);
          onLenis?.(lenis);
        }

        const splits = [];

        /* ---- Hero: intro timeline, then a scroll-linked exit ---- */
        const hero = document.querySelector(".hero");
        if (hero) {
          const title = hero.querySelector(".hero__title");
          const split = SplitText.create(title, {
            type: "lines",
            mask: "lines",
            linesClass: "split-line",
          });
          splits.push(split);
          const intro = gsap.timeline({
            defaults: { ease: "expo.out" },
            delay: 0.15,
          });
          intro
            .from(split.lines, { yPercent: 110, duration: 1.25, stagger: 0.09 })
            .from(".hero__eyebrow", { y: 14, autoAlpha: 0, duration: 0.9 }, 0.1)
            .from(
              ".hero [data-intro]",
              { y: 24, autoAlpha: 0, duration: 1, stagger: 0.08 },
              0.45,
            )
            .from(
              ".hero__strand",
              {
                strokeDashoffset: 1,
                duration: 2.2,
                ease: "power2.inOut",
                stagger: 0.18,
              },
              0.2,
            );

          gsap.to(".hero__content", {
            yPercent: -10,
            autoAlpha: 0.15,
            scale: 0.97,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
          gsap.to(".hero__strands", {
            yPercent: 18,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        /* ---- Section headings ---- */
        gsap.utils.toArray("[data-split]").forEach((el) => {
          const split = SplitText.create(el, {
            type: "lines",
            mask: "lines",
            linesClass: "split-line",
          });
          splits.push(split);
          gsap.from(split.lines, {
            yPercent: 105,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.08,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        /* ---- Staggered groups ---- */
        gsap.utils.toArray("[data-rise]").forEach((group) => {
          const items = group.children.length ? group.children : [group];
          gsap.from(items, {
            y: 36,
            autoAlpha: 0,
            duration: 1,
            ease: "expo.out",
            stagger: 0.07,
            scrollTrigger: { trigger: group, start: "top 90%", once: true },
          });
        });

        /* ---- Project stages: tilt back, then settle flat as they arrive ---- */
        gsap.utils.toArray("[data-stage]").forEach((stage) => {
          const frame = stage.querySelector(".stage__frame");
          const glow = stage.querySelector(".stage__glow");
          gsap.fromTo(
            frame,
            {
              scale: wide ? 0.88 : 0.94,
              rotateX: wide ? 14 : 6,
              y: wide ? 90 : 40,
              transformPerspective: 1600,
            },
            {
              scale: 1,
              rotateX: 0,
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: stage,
                start: "top bottom",
                end: "top 22%",
                scrub: true,
              },
            },
          );
          if (glow) {
            gsap.fromTo(
              glow,
              { autoAlpha: 0, scale: 0.7 },
              {
                autoAlpha: 1,
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: stage,
                  start: "top 90%",
                  end: "top 30%",
                  scrub: true,
                },
              },
            );
          }
        });

        /* ---- Project headers: index outline lights up, thread draws ---- */
        gsap.utils.toArray(".project__head").forEach((head) => {
          ScrollTrigger.create({
            trigger: head,
            start: "top 80%",
            once: true,
            toggleClass: { targets: head, className: "is-lit" },
          });
        });

        /* ---- Counters ---- */
        gsap.utils.toArray("[data-count]").forEach((el) => {
          const target = Number(el.dataset.count);
          const rest = el.dataset.rest ?? "";
          const obj = { n: 0 };
          el.textContent = `0${rest}`;
          gsap.to(obj, {
            n: target,
            duration: 1.6,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
            onUpdate: () => {
              el.textContent = `${Math.round(obj.n)}${rest}`;
            },
          });
        });

        /* ---- Strokes that draw with scroll ---- */
        gsap.utils.toArray("[data-draw]").forEach((path) => {
          gsap.fromTo(
            path,
            { strokeDashoffset: 1 },
            {
              strokeDashoffset: 0,
              ease: "none",
              scrollTrigger: {
                trigger: path.closest("section, article") ?? path,
                start: "top 85%",
                end: "top 35%",
                scrub: true,
              },
            },
          );
        });

        // Late content (lazy demos, images, fonts) changes heights: re-measure.
        let pending = 0;
        const ro = new ResizeObserver(() => {
          clearTimeout(pending);
          pending = setTimeout(() => ScrollTrigger.refresh(), 150);
        });
        ro.observe(document.body);
        document.fonts?.ready.then(() => ScrollTrigger.refresh());

        return () => {
          ro.disconnect();
          clearTimeout(pending);
          splits.forEach((s) => s.revert());
          if (tick) gsap.ticker.remove(tick);
          lenis?.destroy();
          onLenis?.(null);
        };
      },
    );

    return () => mm.revert();
  }, [onLenis]);
}

export { gsap, ScrollTrigger };
