"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardTitle } from "../Components/card";
import {SidebarContainer} from "../Components/sidebarContainer"

interface Outfit {
  top_part_url: string;
  bottom_part_url: string;
}

export default function savedOutfits() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [favoriteOutfits, setFavoriteOutfits] = useState<Outfit[]>([]);
  const [outfit, setOutfit] = useState<Outfit[]>([]);

  useEffect(() => {
    const fetchFavoriteOutfits = async () => {
      await axios.post("http://localhost:5000/upload_outfit").then((response) => {
        setFavoriteOutfits(response.data);
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
          <ul>
            {favoriteOutfits.map((outfit, index) => (
              <li key={index}>
                <Card>
                  <CardContent>
                    <CardTitle>{outfit.top_part_url} {outfit.bottom_part_url}</CardTitle>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    );
  }
   