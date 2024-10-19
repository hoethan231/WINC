"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../Components/card"
import { Button } from "./button"

interface GeneratedOutfitProps {
    sidebarOpen: boolean;
  }

export function GeneratedOutfit({ sidebarOpen }: GeneratedOutfitProps) {
    return (
      <div className="flex flex-col items-center">
        {/* Adjust the width based on sidebarOpen */}
        <Card
          className={`bg-[#f5f5f5] ${
            sidebarOpen ? "w-[450px]" : "w-[700px]"
          } h-[600px] mt-10`}
        ></Card>
        <Button className="bg-[#39516E] text-white text-2xl py-7 px-44 rounded-[15px] font-light mt-3">
          generate outfits
        </Button>
      </div>
    );
  }
  