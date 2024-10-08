import { FavoritesClient } from "./FavoritesClient";

import { ClientOnly } from "../components/ClientOnly";
import { EmptyState } from "../components/EmptyState";

import { getCurrentUser } from "../actions/getCurrentUser";
import { getFavoriteListings } from "../actions/getFavoriteListings";

export default async function FavoritesPage() {
    const listings = await getFavoriteListings();
    const currentUser = await getCurrentUser();

    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No favorites found"
                    subtitle="Looks like you have no favorite listings."
                />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <FavoritesClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
}
