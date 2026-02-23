import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { InventoryApp } from "./components/InventoryApp";

export default function Home() {
  return (
    <>
      <SignedIn>
        <InventoryApp />
      </SignedIn>
      <SignedOut>
        <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-zinc-50 p-4">
          <h1 className="text-2xl font-bold text-zinc-900">Storage Locker</h1>
          <p className="text-center text-zinc-500">
            Sign in to manage your inventory
          </p>
          <div className="rounded-lg bg-zinc-900 px-6 py-2 text-white transition-colors hover:bg-zinc-800">
            <SignInButton mode="modal" />
          </div>
        </div>
      </SignedOut>
    </>
  );
}