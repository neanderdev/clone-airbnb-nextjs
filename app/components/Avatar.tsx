"use client";

import Image from "next/image";

export function Avatar() {
    return (
        <Image
            className="rounded-full"
            src="/images/placeholder.jpg"
            alt="Avatar"
            width="30"
            height="30"
        />
    );
}
