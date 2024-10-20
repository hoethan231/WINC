"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardTitle } from "../Components/card";
import {SidebarContainer} from "../Components/sidebarContainer"
import Image from "next/image";
import { AspectRatio } from "../Components/aspectRatio";

interface Outfit {
  top_part_url: string;
  bottom_part_url: string;
}

export default function savedOutfits() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [favoriteOutfits, setFavoriteOutfits] = useState<Outfit[]>([]);

  useEffect(() => {
    const fetchFavoriteOutfits = async () => {
      await axios.get("http://localhost:5000/get_outfits").then((response) => {
        setFavoriteOutfits(response.data);
        console.log(response.data)
      });
    };
    fetchFavoriteOutfits();
  },[]);


  
    return (
      <div className="flex">
      <SidebarContainer open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-grow">
        <div className="flex justify-between items-center m-10">
          <h1 className="text-5xl font-semibold text-[#39516E]">Saved Outfits</h1>
        </div>
        <div className="h-1 bg-[#39516E] mx-10 -my-3" />
        <div className="flex flex-col items-center">
          
          <div className="grid grid-cols-5 gap-20 mx-32 my-16">
            {favoriteOutfits && favoriteOutfits.map((outfit, index) => (
              <div key={index}>
  
                  <Image src={outfit.top_part_url} alt={`Wardrobe Item`} width={450} height={450} className="rounded-md object-cover" />
                  <Image src={outfit.bottom_part_url} alt={`Wardrobe Item`} width={450} height={450} className="rounded-md object-cover" />
              </div>
            ))}
    
          </div>
        </div>
      </div>
    </div>
    );
  }
   