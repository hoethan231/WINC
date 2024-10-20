"use client"
import { SidebarContainer } from "../Components/sidebarContainer"
import { ImageUpload } from "../Components/imageUpload";
import { useState, useEffect } from "react";
import axios from "axios";

export default function myWardrobe() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      await axios.get("http://localhost:5000/get_images").then((response) => {
        console.log(response.data);
        // setImages(fetchedImages);
      });
    };
    fetchImages();
  },[]);

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
            <div className="grid grid-cols-3 gap-4 p-10">
              {images.map((src, index) => (
                <div key={index}>
                  <img src={src} alt={`Wardrobe Item`} className="w-full h-auto object-cover" />
                </div>
              ))}
            </div>
        </div>
      </div>
    );
}
   