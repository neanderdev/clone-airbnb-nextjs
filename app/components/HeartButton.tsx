"use client";

import { User } from "@prisma/client";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
    listingId: string;
    currentUser?: User | null;
};

export function HeartButton({ listingId, currentUser }: HeartButtonProps) {
    const hasFavorite = false;

    function toggleFavorite() { }

    return (
        <div
            className="relative hover:opacity-80 transition cursor-pointer"
            onClick={toggleFavorite}
        >
            <AiOutlineHeart
                size={28}
                className="fill-white absolute -top-[2px] -right-[2px]"
            />

            <AiFillHeart
                size={24}
                className={hasFavorite ? "fill-rose-500" : "fill-neutral-500/70"}
            />
        </div>
    );
}
