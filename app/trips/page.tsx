import { TripsClient } from "./TripsClient";

import { ClientOnly } from "../components/ClientOnly";
import { EmptyState } from "../components/EmptyState";

import { getCurrentUser } from "../actions/getCurrentUser";
import { getReservations } from "../actions/getReservations";

export default async function TripsPage() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Unauthorized"
                    subtitle="Please login"
                />
            </ClientOnly>
        );
    }

    const reservations = await getReservations({ userId: currentUser.id });

    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No trips found"
                    subtitle="Looks like you haven't reserved any trips."
                />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <TripsClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
}
