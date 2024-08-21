import { ClientOnly } from "../../components/ClientOnly";
import { EmptyState } from "../../components/EmptyState";

import { getCurrentUser } from "../../actions/getCurrentUser";
import { getListingById } from "../../actions/getListingById";

import { ListingClient } from "./ListingClient";

interface IParams {
    listingId?: string;
};

export default async function ListingPage({ params }: { params: IParams }) {
    const listing = await getListingById(params);
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
                currentUser={currentUser}
            />
        </ClientOnly>
    );
}
