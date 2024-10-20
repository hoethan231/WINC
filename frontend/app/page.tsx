import React from "react";
import { BackgroundGradientAnimation } from "./Components/background-gradient-animation";
import { Button } from "./Components/button";
import Link from "next/link";
import { TypewriterEffectSmooth } from "./Components/typewriter-effect";

export default function BackgroundGradientAnimationDemo() {
  const words = [
    {
      text: "Welcome",
      className: "text-[#ffffff] text-[100px] cursor-default drop-shadow-lg bg-gradient-to-b from-white/80 to-white/20 text-transparent bg-clip-text",
    },
    {
      text: "to",
      className: "text-[#ffffff] text-[100px] cursor-default drop-shadow-lg bg-gradient-to-b from-white/80 to-white/20 text-transparent bg-clip-text",
    },
    {
      text: "Winc",
      className: "text-[#cbddf7] text-[100px] cursor-default drop-shadow-lg underline decoration-4 underline-offset-8",
    },
    {
      text: ";)",
      className: "text-[#ffffff] text-[100px] cursor-default drop-shadow-lg bg-gradient-to-b from-white/80 to-white/20 text-transparent bg-clip-text",
    },
  ];
 
  return (
    <BackgroundGradientAnimation>
      <div className="absolute z-50 inset-0 flex flex-col items-center justify-center text-white font-bold px-4 text-center space-y-0">
        <TypewriterEffectSmooth words={words} />
        <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20 text-lg md:text-lg lg:text-xl font-medium px-64 mt-10">
        Come Build Your OOTD! Winc lets you upload your favorite pieces of clothing, and then it generates an outfit just for you! 
        It’s a super easy way to look great without the hassle—just pick your clothes, and we’ll help you style them perfectly for any occasion!
        </p>
        <div className="pointer-events-auto md:space-x-4">
          <Link href="/signup" passHref>
            <Button className=" py-2 px-8 text-2xl text-white border border-white rounded-[100px] cursor-pointer bg-gradient-to-b from-blue/80 to-white/20 shadow-lg hover:bg-white hover:text-[#39516E] mt-7">
              Get Started
            </Button>
          </Link>
          <Button className=" py-2 px-8 text-2xl text-white border border-white rounded-[100px] cursor-pointer bg-gradient-to-b from-blue/80 to-white/20 shadow-lg hover:bg-white hover:text-[#39516E] mt-7">
              Learn More
            </Button>
        </div>
      </div>
    </BackgroundGradientAnimation>
  );
}
