import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="text-brand-green flex h-screen items-center justify-center text-4xl font-bold">
      <h1>Hello World</h1>
      <Link href="/sign-in">
        <Button>Sign In</Button>
      </Link>
    </div>
  );
}
