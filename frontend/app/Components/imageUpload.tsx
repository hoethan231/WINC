"use client"
import React, { useState, useRef } from "react";
import { Button } from "./button";
import { IconFileFilled } from "@tabler/icons-react";
import axios from "axios";

export function ImageUpload() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const uploadFile = (file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        axios.post("http://localhost:5000/upload_file", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            console.log("success", response);
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files?.[0]) {
            uploadFile(e.target.files?.[0]);

        }
    }

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div>
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
