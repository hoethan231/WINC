"use client"
import Image from "next/image"
import { AspectRatio } from "../Components/aspectRatio"
import { SidebarContainer } from "../Components/sidebarContainer"
import { ImageUpload } from "../Components/imageUpload";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";

export default function myWardrobe() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [images, setImages] = useState<{ imgURL: string }[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ imgURL: string; category?: string; description?: string } | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      await axios.get("http://localhost:5000/get_images").then((response) => {
        console.log(response.data);
        setImages(response.data);
      });
    };
    fetchImages();
  },[]);

  const handleImageClick = (image: { imgURL: string }) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };

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
            <div className="grid grid-cols-5 gap-20 mx-32 my-16">
              {images && images.map((src, index) => (
                <div key={index}>
                  <AspectRatio ratio={1 / 1}>
                    <Image src={src.imgURL} alt={`Wardrobe Item`} width={450} height={450} className="rounded-md object-cover" onClick={() => handleImageClick(src)} />
                  </AspectRatio>
                </div>
              ))}
            </div>
            <div>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleModalClose}
                className="w-[700px] h-[500px] bg-white fixed top-[150px] left-[450px] rounded-[20px]"
                overlayClassName="overlay"
              >
                {selectedImage && (
                  <div className="flex justify-between items-center mt-20">
                    <img src={selectedImage.imgURL} alt={selectedImage.category} className="w-60 h-auto mr-11"/>
                    <div className="mr-8">
                      <h2 className="font-normal"><span className="font-bold">Category: </span>{selectedImage.category}</h2>
                      <br/>
                      <p className="font-normal"><span className="font-bold">Description: </span>{selectedImage.description}</p>
                    </div>
                  </div>
                )}
              </Modal>
            </div>
        </div>
      </div>
    );
}
   