"use client"
import { SidebarContainer } from "../Components/sidebarContainer";
import Weather from "../Components/weather";
import { GeneratedOutfit } from "../Components/generatedOutfit";
import { MiniWardrobe } from "../Components/miniWardrobe";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [vibe, setVibe] = useState("");
  const [combinations, setCombinations] = useState([]);

  const handleVibeChange = (newVibe: string) => {
    setVibe(newVibe);
  };

  useEffect(() => {
    if(vibe) {
      axios.post("http://localhost:3000/get_combinations", { "vibe":vibe, "limit":5 })
      .then((response) => {
        setCombinations(response.data);
      })
      .catch((error) => {
        console.log("error:" + error);
      })
    }
  },[vibe]);

  return (
    <div className="flex">
      <SidebarContainer open={sidebarOpen} setOpen={setSidebarOpen} />
      <div>
        <div className="flex justify-between items-center m-10">
          <h1 className="text-5xl font-semibold text-[#39516E]">Dashboard</h1>
        </div>
        <div className="h-1 bg-[#39516E] mx-10 -my-3" />
        <div className="flex">
          <GeneratedOutfit sidebarOpen={sidebarOpen} onVibeChange={handleVibeChange}/>
          <div>
            <Weather />
            <MiniWardrobe />
          </div>
        </div>
      </div>
    </div>
  );
}
