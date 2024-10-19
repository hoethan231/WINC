import { SidebarContainer } from "../Components/sidebarContainer"
import { ImageUpload } from "../Components/imageUpload";

export default function myWardrobe() {
    return (
      <div className="flex">
        <SidebarContainer />
        <div className="flex-grow">
            <div className="flex justify-between items-center m-10">
                <h1 className="text-6xl font-semibold text-[#39516E]">My Wardrobe</h1>
                <div className="ml-auto mt-4 mr-10">
                    <ImageUpload />
                </div>
            </div>
            <div className="h-1 bg-[#39516E] mx-10" />
        </div>
      </div>
    );
}
   