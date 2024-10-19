"use client";
import { TypewriterEffectSmooth } from "./Components/typewriter-effect";
import { Button } from "./Components/button";
import Link from "next/link";
export default function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "Come",
    },
    {
      text: "Build",
    },
    {
      text: "Your",
    },
    {
      text: "OOD",
    },
    {
      text: "!!!",
      className: "text-blue-500 font-size-200px",
      //className="text-black h-6 w-6 flex-shrink-0" />
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-center">
      <p className="text-[100px] text-black mb-5">
        Welcome to Our App!
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <Link href="/signup" passHref>
        <Button className="bg-[#39516E] py-2 px-5 text-2xl text-white border-none rounded-[200px] cursor-pointer">
          Join now
        </Button>
        </Link>
      </div>
    </div>
  );
}