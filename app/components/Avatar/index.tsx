import Image from "next/image";
import React from "react";
import { twMerge } from "tailwind-merge";

interface AvatarProps {
  src: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, className }) => {
  return (
    <Image
      className={twMerge(`h-12 w-12 rounded-full object-cover`, `${className}`)}
      src={src}
      alt="user"
      height={44}
      width={44}
    />
  );
};

export default Avatar;
