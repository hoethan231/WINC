"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../Components/card"


export function MiniWardrobe () {
    return (
        <div className="flex flex-col items-center">
            <Card className ="bg-[#f5f5f5] w-[350px] h-[468px] mt-4 ml-4">
                <CardTitle className="text-[#39516E] font-medium m-6">Mini Wardrobe</CardTitle>
            </Card>
        </div>
    )
}