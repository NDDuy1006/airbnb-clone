"use client";

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeReservation, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../components/ListingCard/ListingCard";


interface IProps {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
};

const TripsClient = ({
  reservations,
  currentUser
}: IProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success("Reservation cancelled");
        router.refresh();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error);
      })
      .finally(() => {
        setDeletingId("");
      });
  }, [router]);

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div className="mt-10 card-list-wrapper">
        {reservations.map((reservationItem) => (
          <ListingCard
            key={reservationItem.id}
            data={reservationItem.listing}
            reservation={reservationItem}
            actionId={reservationItem.id}
            onAction={onCancel}
            disabled={deletingId === reservationItem.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default TripsClient;