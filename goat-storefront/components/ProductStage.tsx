"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import type { Img } from "@/lib/commerce";

/** Subtle 3D tilt on hover (desktop). Static under reduced motion. */
export function ProductStage({ image, priority = false, className = "", aspect = "aspect-[4/5]" }: { image: Img; priority?: boolean; className?: string; aspect?: string }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 140, damping: 18 });
  const sy = useSpring(my, { stiffness: 140, damping: 18 });
  const rotY = useTransform(sx, [0, 1], [-7, 7]);
  const rotX = useTransform(sy, [0, 1], [6, -6]);

  return (
    <div style={{ perspective: 1200 }} className={className}>
      <motion.div
        onPointerMove={(e) => {
          if (reduce || e.pointerType === "touch") return;
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width);
          my.set((e.clientY - r.top) / r.height);
        }}
        onPointerLeave={() => { mx.set(0.5); my.set(0.5); }}
        style={reduce ? undefined : { rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        className={`relative ${aspect} overflow-hidden rounded-[1.75rem] bg-coal`}
      >
        <Image src={image.url} alt={image.alt} fill priority={priority} sizes="(min-width:1024px) 45vw, 92vw" className="object-cover" />
      </motion.div>
    </div>
  );
}
