"use client"
import React, { useState, useRef } from "react";
import { Button } from "./button";
import { IconFileFilled } from "@tabler/icons-react";

export function ImageUpload() {
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files?.[0]) {
            setUploadedImage(e.target.files?.[0]);
        }
    }

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleUpload = async () => {
        if (uploadedImage) {
            const formData = new FormData();
            formData.append('image', uploadedImage);
            console.log("Uploading:", uploadedImage.name);
        }
    }

    return (
        <div>
            {uploadedImage && <img src={URL.createObjectURL(uploadedImage)} alt="Selected"/>}
            
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageChange}
            />
            
            <Button onClick={handleButtonClick} variant="default" className="bg-[#39516E] text-white font-light px-8 py-6 text-xl rounded-[15px]">
                <IconFileFilled /> upload item
            </Button>
        </div>
    );
}
