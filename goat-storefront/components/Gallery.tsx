"use client";

import Image from "next/image";
import { useState } from "react";
import { ProductStage } from "./ProductStage";
import type { Img } from "@/lib/commerce";

export function Gallery({ images }: { images: Img[] }) {
  const [i, setI] = useState(0);
  const current = images[i] ?? images[0];
  return (
    <div>
      <ProductStage key={current.url} image={current} priority />
      {images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto no-scrollbar" role="tablist" aria-label="Product images">
          {images.map((im, idx) => (
            <button key={im.url} role="tab" aria-selected={idx === i} aria-label={`Image ${idx + 1}`} onClick={() => setI(idx)} className={`relative size-20 shrink-0 overflow-hidden rounded-xl border transition ${idx === i ? "border-accent" : "border-line opacity-60 hover:opacity-100"}`}>
              <Image src={im.url} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
