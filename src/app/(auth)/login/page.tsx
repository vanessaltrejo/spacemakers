import type { Metadata } from "next";
import { LoginCard } from "@/components/auth/LoginCard";
import { Starfield } from "@/components/ui/Starfield";

export const metadata: Metadata = {
  title: "Iniciar sesión | SpaceMakers",
};

export default function LoginPage() {
  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-void px-4 pt-14">
      <Starfield className="absolute inset-0 size-full" />
      <div className="relative z-10 flex w-full justify-center">
        <LoginCard />
      </div>
    </div>
  );
}
