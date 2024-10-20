"use client";
import React, { useState, Dispatch, SetStateAction } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./sidebar";
import defaultPfp from "../assets/default_pfp.jpg";
import winc from "../assets/winc.png";
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

interface SidebarContainerProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>; // Updated type
}

export function SidebarContainer({ open, setOpen }: SidebarContainerProps) {
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="text-black h-6 w-6 flex-shrink-0" />
      ),
    },
    {
      label: "My Wardrobe",
      href: "/myWardrobe",
      icon: (
        <IconHanger2 className="text-black h-6 w-6 flex-shrink-0" />
      ),
    },
    {
      label: "Outfit Log",
      href: "/outfitLog",
      icon: (
        <IconCalendarMonth className="text-black h-6 w-6 flex-shrink-0" />
      ),
    },
    {
      label: "Saved Outfits",
      href: "/savedOutfits",
      icon: (
        <IconHeartFilled className="text-black h-6 w-6 flex-shrink-0" />
      ),
    },
    {
      label: "Log Out",
      href: "/",
      icon: (
        <IconArrowLeft className="text-black h-6 w-6 flex-shrink-0" />
      ),
    },
  ];

  return (
    <div className={cn("rounded-md min-h-screen")}>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-16">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden mt-6">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-4">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Ethan Ho",
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
      href="/dashboard"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-6 w-7 bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0">
      <Image src={winc} width={50} height={50} alt="logo"/>
      </div>
      <motion.span
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        style={{ color: '#39516E', fontSize: '24px' }}
        className="font-bold whitespace-pre"
      >
        winc
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="/dashboard"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-6 w-7 bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0">
        <Image src={winc} width={50} height={50} alt="logo"/>
      </div>
    </Link>
  );
};