"use client"
import { useState } from "react";
import {SidebarContainer} from "../Components/sidebarContainer"

export default function savedOutfits() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
      <div className="flex">
      <SidebarContainer open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-grow">
        <div className="flex justify-between items-center m-10">
          <h1 className="text-5xl font-semibold text-[#39516E]">Saved Outfits</h1>
        </div>
        <div className="h-1 bg-[#39516E] mx-10 -my-3" />
      </div>
    </div>
    );
  }
   