"use client"
import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../Components/card"
import {IconArrowUp} from "@tabler/icons-react"
import { Button } from "./button"
import { Input } from "./input"

interface GeneratedOutfitProps {
    sidebarOpen: boolean;
  }

export function GeneratedOutfit({ sidebarOpen }: GeneratedOutfitProps) {
  const [vibe, setVibe] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Vibe sent to backend:", vibe);
  }

    return (
      <div className="flex flex-col items-center">
        <Card
          className={`bg-[#f5f5f5] ${
            sidebarOpen ? "w-[700px]" : "w-[950px]"
          } h-[600px] mt-10 ml-10`}
        ></Card>
        <form className={`flex ml-10 mt-3 ${sidebarOpen ? "w-[700px]" : "w-[950px]"}`}
        onSubmit={handleSubmit}>
          <Input placeholder="What's your vibe today?"
          className={`text-2xl p-7 text-left rounded-full font-light flex-1 ${sidebarOpen ? "w-[700px]" : "w-[950px]"}`}
          value={vibe}
          onChange={(e) => setVibe(e.target.value)}/>
          <Button
            className={`absolute bg-[#39516E] text-white p-3 rounded-full mt-[9px] ${sidebarOpen ? "ml-[650px]" : "ml-[900px]"}`}
            type="submit"
          >
            <IconArrowUp stroke={3}/>
          </Button>
        </form>
      </div>
    );
  }
  