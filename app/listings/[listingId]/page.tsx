import { ClientOnly } from "../../components/ClientOnly";
import { EmptyState } from "../../components/EmptyState";

import { getCurrentUser } from "../../actions/getCurrentUser";
import { getListingById } from "../../actions/getListingById";
import { getReservations } from "../../actions/getReservations";

import { ListingClient } from "./ListingClient";

interface IParams {
    listingId?: string;
};

export default async function ListingPage({ params }: { params: IParams }) {
    const listing = await getListingById(params);
    const reservations = await getReservations(params);
    const currentUser = await getCurrentUser();

    if (!listing) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <ListingClient
                listing={listing}
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
}
