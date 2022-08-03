import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/game">
        <a>Start Game!</a>
      </Link>
    </div>
  );
}
