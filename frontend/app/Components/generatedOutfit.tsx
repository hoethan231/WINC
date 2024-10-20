"use client"
import { useState, useEffect } from "react";
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
import axios from "axios";

interface GeneratedOutfitProps {
    sidebarOpen: boolean;
  }
  
  export function GeneratedOutfit({ sidebarOpen }: GeneratedOutfitProps) {
  const [combinations, setCombinations] = useState([]);
  const [index, setIndex] = useState(0);
  const [vibe, setVibe] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(vibe) {
      axios.post("http://localhost:5000/get_combinations", { "vibe":vibe, "limit":5 })
      .then((response) => {
        setCombinations(response.data);
        console.log(combinations);
      })
      .catch((error) => {
        console.log("error:" + error);
      });
    }
  }

    return (
      <div className="flex flex-col items-center">
        <Card
          className={`bg-[#f5f5f5] ${
            sidebarOpen ? "w-[700px]" : "w-[950px]"
          } h-[600px] mt-10 ml-10`}
        >
          {combinations.length > 0 && index < combinations.length && (
            <div>
              <img src={combinations[index][0]}/>
              <img src={combinations[index][1]}/>
            </div>
          )}

        </Card>
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
  