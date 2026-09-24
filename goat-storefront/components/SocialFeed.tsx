import Image from "next/image";
import { Reveal } from "./Reveal";
import { SocialLinks } from "./SocialLinks";
import { SocialIcon } from "./Icons";
import { SOCIALS } from "@/lib/brand";
import { IMAGES } from "@/lib/commerce";

type Post = { id: string; src: string; href: string; alt: string };
const IG = SOCIALS[0];

const FALLBACK: Post[] = [
  [IMAGES.tubIce, "GOAT PWO on ice"], [IMAGES.gymBag, "GOAT PWO in the gym bag"], [IMAGES.bundle3, "Three tubs on ice"], [IMAGES.sunset, "GOAT PWO at sunset"],
  [IMAGES.tubMango, "GOAT PWO with mango"], [IMAGES.bundle2, "Two tubs with mango"], [IMAGES.tubIce2, "GOAT PWO studio shot"], [IMAGES.emblem, "GOAT emblem"],
].map(([src, alt], i) => ({ id: `f${i}`, src, href: IG.href, alt }));

/**
 * Live feed via the Instagram Graph API when INSTAGRAM_USER_ID + INSTAGRAM_ACCESS_TOKEN are set
 * (Business/Creator account). Otherwise brand photos link to the profile.
 */
async function getPosts(): Promise<{ posts: Post[]; live: boolean }> {
  const id = process.env.INSTAGRAM_USER_ID, token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!id || !token) return { posts: FALLBACK, live: false };
  try {
    const res = await fetch(`https://graph.facebook.com/v21.0/${id}/media?fields=id,media_type,media_url,thumbnail_url,permalink,caption&limit=12&access_token=${token}`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(String(res.status));
    const json = (await res.json()) as { data: { id: string; media_type: string; media_url?: string; thumbnail_url?: string; permalink: string; caption?: string }[] };
    const posts = json.data.map((m) => ({ id: m.id, src: (m.media_type === "VIDEO" ? m.thumbnail_url : m.media_url) ?? "", href: m.permalink, alt: m.caption?.slice(0, 90) ?? "GOAT on Instagram" })).filter((p) => p.src);
    return posts.length ? { posts: posts.slice(0, 8), live: true } : { posts: FALLBACK, live: false };
  } catch {
    return { posts: FALLBACK, live: false };
  }
}

export async function SocialFeed() {
  const { posts, live } = await getPosts();
  return (
    <section aria-labelledby="social-title" className="mx-auto max-w-7xl px-5 py-20">
      <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">Join the pack</p>
          <h2 id="social-title" className="h-mix mt-3 text-5xl md:text-7xl">The GOAT <em>Experience</em></h2>
          <a href={IG.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-mute hover:text-white"><SocialIcon name="instagram" width={18} height={18} />{IG.handle}</a>
        </div>
        <SocialLinks />
      </Reveal>
      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {posts.map((p, i) => (
          <Reveal key={p.id} delay={(i % 4) * 0.07}>
            <a href={p.href} target="_blank" rel="noopener noreferrer" aria-label={`${p.alt} (opens Instagram)`} className={`group relative block overflow-hidden rounded-2xl bg-coal ${i % 5 === 0 ? "aspect-[4/5]" : "aspect-square"}`}>
              <Image src={p.src} alt={p.alt} fill sizes="(min-width:768px) 25vw, 50vw" unoptimized={live} className="object-cover transition duration-700 group-hover:scale-110" />
              <span className="absolute inset-0 grid place-items-center bg-black/40 text-[#fff] opacity-0 transition group-hover:opacity-100"><SocialIcon name="instagram" width={28} height={28} /></span>
            </a>
          </Reveal>
        ))}
      </div>
      <div className="mt-10 text-center"><a href={IG.href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Follow {IG.handle}</a></div>
    </section>
  );
}
