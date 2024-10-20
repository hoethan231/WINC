"use client"
import { SidebarContainer } from "../Components/sidebarContainer"
import { ImageUpload } from "../Components/imageUpload";
import { useState } from "react";

export default function myWardrobe() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
      <div className="flex">
        <SidebarContainer open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className="flex-grow">
            <div className="flex justify-between items-center m-10">
                <h1 className="text-5xl font-semibold text-[#39516E]">My Wardrobe</h1>
                <div className="ml-auto mt-4 mr-10">
                    <ImageUpload />
                </div>
            </div>
            <div className="h-1 bg-[#39516E] mx-10 -my-3" />
        </div>
      </div>
    );
}
   