import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-[80vh] place-items-center px-5 text-center">
      <div>
        <p className="eyebrow">404</p>
        <h1 className="h-mix mt-3 text-7xl">Off the <em>rack</em></h1>
        <Link href="/shop" className="btn btn-primary mt-8">Back to shop</Link>
      </div>
    </div>
  );
}
