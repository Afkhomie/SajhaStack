import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In — SajhaStack",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-73px)] flex items-center justify-center px-6 py-12">
      {children}
    </div>
  );
}
