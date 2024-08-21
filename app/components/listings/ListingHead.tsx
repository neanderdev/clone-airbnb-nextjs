"use client";

import { User } from "@prisma/client";
import Image from "next/image";

import { Heading } from "../Heading";
import { HeartButton } from "../HeartButton";

import { useCountries } from "../../hooks/useCountries";

interface ListingHeadProps {
    title: string;
    imageSrc: string;
    locationValue: string;
    id: string;
    currentUser?: User | null;
};

export function ListingHead({
    title,
    imageSrc,
    locationValue,
    id,
    currentUser,
}: ListingHeadProps) {
    const { getByValue } = useCountries();

    const location = getByValue(locationValue);

    return (
        <>
            <Heading
                title={title}
                subtitle={`${location?.region}, ${location?.label}`}
            />

            <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
                <Image
                    className="object-cover w-full"
                    src={imageSrc}
                    alt="Image"
                    fill
                />

                <div className="absolute top-5 right-5">
                    <HeartButton
                        listingId={id}
                        currentUser={currentUser}
                    />
                </div>
            </div>
        </>
    );
}
