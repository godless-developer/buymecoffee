import Image from "next/image";
import { CoffeeLogo, Logo } from "../_components/Logo";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      {/* Left Side */}
      <div className="bg-[url('/Tuk.png')] bg-center bg-cover w-full md:w-1/2 flex justify-center items-center relative px-6 py-12">
        <div className="absolute top-5 left-5 md:left-20">
          <Logo color={"white"} />
        </div>
        <div className="backdrop-blur-[5px] text-white p-8 flex flex-col gap-10 items-center max-w-[455px] text-center">
          <CoffeeLogo />
          <div>
            <p className="text-2xl font-bold mb-3">Fund your creative work</p>
            <p className="text-base">
              Accept support. Start a membership. Setup a shop. It’s easier than
              you think.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side (children) */}
      <div className="flex-1 flex items-center justify-center p-4">
        {children}
      </div>
    </div>
  );
}
