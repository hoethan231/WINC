"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../Components/card";
import { IconArrowUp } from "@tabler/icons-react";
import { Button } from "./button";
import { Input } from "./input";
import axios from "axios";
import { IconArrowLeft, IconArrowRight, IconHeart } from "@tabler/icons-react";

import Image from "next/image";
import { AspectRatio } from "../Components/aspectRatio";

interface GeneratedOutfitProps {
  sidebarOpen: boolean;
}

export function GeneratedOutfit({ sidebarOpen }: GeneratedOutfitProps) {
  const [combinations, setCombinations] = useState([]);
  const [index, setIndex] = useState(-1);
  const [vibe, setVibe] = useState("");
  const [saved, setSaved] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (vibe) {
      await axios
        .post("http://localhost:5000/get_combinations", {
          vibe: vibe,
          limit: 5,
        })
        .then((response) => {
          if (response.data.length !== 0) {
            setCombinations(response.data);
            setIndex(0);
            console.log(combinations);
          }
        })
        .catch((error) => {
          console.log("error:" + error);
        });
    }
  };

  const handleNextClick = (n: number) => {
    if (n + index < 0) {
      setIndex(combinations.length - 1);
    } else {
      setIndex((index + n) % combinations.length);
    }
  };

  const handleLogOutfit = () => {
    let today = new Date();
    const todayString = today.toISOString().slice(0, 19).replace("T", " ");
    axios
      .post("http://localhost:5000/upload_outfit", {
        userID: 2251799813685250,
        top_part_url: combinations[index][0],
        bottom_part_url: combinations[index][1],
        date_added: todayString,
        saved: 0,
      })
      .then((response) => {
        console.log("success");
      })
      .catch((error) => {
        console.log("error:" + error);
      });
  };

  const handleFavorite = () => {
    axios.post("http://localhost:5000/bookmark_outfit", {
      userID: 2251799813685250,
      top_part_url: combinations[index][0],
      bottom_part_url: combinations[index][1],
      saved: saved,
    });
    setSaved(!saved);
  };
    return (
      <div className="flex flex-col items-center">
        <Card
          className={`bg-[#f5f5f5] flex justify-center items-center ${
            sidebarOpen ? "w-[700px]" : "w-[950px]"
          } h-[600px] mt-10 ml-10`}
        >
          {combinations.length > 0 && (
            <div className="flex justify-between items-center">
              <Button onClick={() => handleNextClick(-1)} className="ml-12"><IconArrowLeft size={128} /></Button>
              <Card className={`w-[800px] h-[550px] flex justify-center items-center ${
            sidebarOpen ? "w-[500px]" : "w-[750px]"
          }`}>
                <div className="">
                  <img src={combinations[index][0]} alt={`Wardrobe Item`} width={200} height={200} className="rounded-md object-cover"/>
                  <img src={combinations[index][1]} alt={`Wardrobe Item`} width={200} height={200} className="rounded-md object-cover"/>
                </div>
              </Card>
              <div className="">
                <Button onClick={() => handleNextClick(1)} className="mb-16 mt-40"><IconArrowRight size={48} /></Button>
                <div>
                  <Button onClick={handleFavorite} className="static left-96 bottom-24"><IconHeart/></Button>
                  <div>
                    <Button>Wear Today</Button>
                  </div>
                </div>
              </div>
            </Card>
            <div className="">
              <Button onClick={() => handleNextClick(1)}>
                <IconArrowRight size={48} />
              </Button>
              <Button
                onClick={handleFavorite}
                className="static left-96 bottom-24"
              >
                <IconHeart />
              </Button>
            </div>
          </div>
        )}
      </Card>
      <form
        className={`flex ml-10 mt-3 ${sidebarOpen ? "w-[700px]" : "w-[950px]"}`}
        onSubmit={handleSubmit}
      >
        <Input
          placeholder="What's your vibe today?"
          className={`text-2xl p-7 text-left rounded-full font-light flex-1 ${sidebarOpen ? "w-[700px]" : "w-[950px]"}`}
          value={vibe}
          onChange={(e) => setVibe(e.target.value)}
        />
        <Button
          className={`absolute bg-[#39516E] text-white p-3 rounded-full mt-[9px] ${sidebarOpen ? "ml-[650px]" : "ml-[900px]"}`}
          type="submit"
        >
          <IconArrowUp stroke={3} />
        </Button>
      </form>
    </div>
  );
}

