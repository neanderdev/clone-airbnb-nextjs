"use client";

import { Listing, Reservation, User } from "@prisma/client";
import { useMemo } from "react";

import { Container } from "../../components/Container";
import { ListingHead } from "../../components/listings/ListingHead";
import { ListingInfo } from "../../components/listings/ListingInfo";
import { categories } from "../../components/navbar/Categories";

interface ListingClientProps {
    listing: Listing & {
        user: User;
    };
    reservations?: Reservation[];
    currentUser?: User | null;
};

export function ListingClient({ listing, reservations, currentUser }: ListingClientProps) {
    const category = useMemo(() => {
        return categories.find((category) => category.label === listing.category);
    }, [listing.category]);

    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        id={listing.id}
                        currentUser={currentUser}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <ListingInfo
                            user={listing.user}
                            category={category}
                            description={listing.description}
                            roomCount={listing.roomCount}
                            guestCount={listing.guestCount}
                            bathroomCount={listing.bathroomCount}
                            locationValue={listing.locationValue}
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
}
