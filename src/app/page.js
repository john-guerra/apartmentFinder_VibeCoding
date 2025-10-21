import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid">
      <main className="p-6">
        <h1>Apartment Finder</h1>
        <div>why is it</div>


        <Link href="/listings" className="text-blue-500 underline">
          Go to Listings
        </Link>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
