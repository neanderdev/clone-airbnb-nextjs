"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export function Logo() {
    const router = useRouter();

    return (
        <Image
            className="hidden md:block cursor-pointer"
            src="/images/logo.png"
            alt="logo"
            width="100"
            height="100"
        />
    );
}
