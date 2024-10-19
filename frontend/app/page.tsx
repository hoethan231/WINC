"use client";
import { TypewriterEffectSmooth } from "./Components/typewriter-effect";
import { Button } from "./Components/button";
import Link from "next/link";
export default function TypewriterEffectSmoothDemo() {
  
  const words = [
    {
      text: "Welcome",
      className: "text-[#ffffff] text-[100px] cursor-default drop-shadow-lg",
    },
    {
      text: "to",
      className: "text-[#ffffff] text-[100px] cursor-default drop-shadow-lg",
    },
    {
      text: "Winc",
      className: "text-[#cbddf7] text-[100px] cursor-default drop-shadow-lg underline decoration-4 underline-offset-8",
    },
    {
      text: ";)",
      className: "text-[#ffffff] text-[100px] cursor-default drop-shadow-lg",
    },
  ];
  return (
    //bg-gradient-to-tr from-[#082242] to-[#2A65AD]
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gradient-to-tr from-[#082242] to-[#2A65AD]">
      <TypewriterEffectSmooth words={words} />
      <p className="text-3xl text-white mb-5 cursor-default drop-shadow-lg">
        Come Build Your OOTD!!
      </p>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <Link href="/signup" passHref>
        <Button className="bg-[#39516E] py-2 px-8 text-2xl text-white border-none rounded-[100px] cursor-pointer shadow-lg shadow-blue-100/40 hover:shadow-blue-500/40">
          Join now
        </Button>
        </Link>
      </div>
    </div>
  );
}