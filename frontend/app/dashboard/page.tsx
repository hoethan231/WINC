"use client"
import { SidebarContainer } from "../Components/sidebarContainer";
import Weather from "../Components/weather";
import { GeneratedOutfit } from "../Components/generatedOutfit";
import { GenerateOptions } from "../Components/generateOptions";
import { MiniWardrobe } from "../Components/miniWardrobe";
import { useState } from "react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex">
      <SidebarContainer open={sidebarOpen} setOpen={setSidebarOpen} />
      <div>
        <div className="flex justify-between items-center m-10">
          <h1 className="text-5xl font-semibold text-[#39516E]">Dashboard</h1>
        </div>
        <div className="h-1 bg-[#39516E] mx-10 -my-3" />
        <div className="flex">
          <GenerateOptions />
          <GeneratedOutfit sidebarOpen={sidebarOpen} />
          <div>
            <Weather />
            <MiniWardrobe />
          </div>
        </div>
      </div>
    </div>
  );
}
