"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./sidebar";
import defaultPfp from "../assets/default_pfp.jpg";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconHanger2,
  IconCalendarMonth,
  IconHeartFilled,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/app/lib/utils";

export function SidebarDemo() {
  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="text-black h-6 w-6 flex-shrink-0" />
      ),
    },
    {
      label: "My Wardrobe",
      href: "#",
      icon: (
        <IconHanger2 className="text-black h-6 w-6 flex-shrink-0" />
      ),
    },
    {
      label: "Outfit Log",
      href: "#",
      icon: (
        <IconCalendarMonth className="text-black h-6 w-6 flex-shrink-0" />
      ),
    },
    {
      label: "Saved Outfits",
      href: "#",
      icon: (
        <IconHeartFilled className="text-black h-6 w-6 flex-shrink-0" />
      ),
    },
    {
      label: "Log Out",
      href: "#",
      icon: (
        <IconArrowLeft className="text-black h-6 w-6 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
<<<<<<< HEAD:frontend/app/Components/sidebar1.tsx
<<<<<<< HEAD:frontend/app/Components/sidebar1.tsx
        "rounded-md flex flex-col md:flex-row bg-white-100 w-full flex-1 max-w-7xl mx-auto border border-neutral-200 overflow-hidden",
        "h-[60vh]" // for your use case, use `h-screen` instead of `h-[60vh]`
=======
        "rounded-md flex flex-col md:flex-row min-w-full h-screen flex-1 overflow-hidden"
>>>>>>> bd30308 (add sidebar):frontend/app/Components/sidebarContainer.tsx
=======
        "rounded-md h-screen overflow-hidden"
>>>>>>> 7e4606b (my wardrobe page general layout):frontend/app/Components/sidebarContainer.tsx
      )}
    >
      <Sidebar open={open} setOpen={setOpen} >
        <SidebarBody className="justify-between gap-16">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden mt-6">
            {/* {open ? <Logo /> : <LogoIcon />} */}
            <Logo />
            <div className="mt-8 flex flex-col gap-4">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "[User's Name]",
                href: "#",
                icon: (
                  <Image
                    src={defaultPfp}
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        style={{ color: '#39516E', fontSize: '24px' }}
        className="font-bold whitespace-pre"
      >
        [name in progress]
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};