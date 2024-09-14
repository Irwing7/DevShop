"use client";
import Image from "next/image";
import React from "react";
import { WobbleCard } from "../ui/wobble-card";

export function FeatureSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          Jumpstart Your Development with DevMart
          </h2>
          <p className="mt-4 text-left  text-base/6 text-neutral-200">
          Why reinvent the wheel? At DevMart, developers can upload their projects, and buyers can purchase and implement them instantly. Get ahead with ready-made solutions and focus on what truly matters—innovation.
          </p>
        </div>
        <img
          src="https://wallpapers.com/images/hd/coding-background-9izlympnd0ovmpli.jpg"
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px]">
        <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
        Create. Upload. Profit.
        </h2>
        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
        Looking for a specific functionality? Browse our extensive marketplace to find the project that fits your needs. From simple scripts to full-fledged applications, DevMart has what you&apos;re looking for.
        </p>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          Start Building Faster
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
          Skip the initial setup and dive straight into development. With DevMart, you can quickly integrate pre-built projects into your workflow. Save time and accelerate your progress with our curated marketplace.
          </p>
        </div>
        <img
          src="https://wallpapers.com/images/hd/coding-background-9izlympnd0ovmpli.jpg"
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
    </div>
  );
}
