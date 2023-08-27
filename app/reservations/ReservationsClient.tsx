"use client";

import React, { useCallback, useState } from 'react'
import { SafeReservation, SafeUser } from '../types';
import Container from '../components/Container';
import Heading from '../components/Heading';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ListingCard from '../components/ListingCard/ListingCard';

interface IProps {
  reservations: SafeReservation[];
  currentUser: SafeUser | null;
};

const ReservationsClient = ({
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
        router.refresh()
      })
      .catch(() => {
        toast.error("Something went wrong.")
      })
      .finally(() => {
        setDeletingId("");
      });
  }, [router])

  return (
    <Container>
      <Heading
        title="Reservations"
        subtitle="Bookings on your properties"
      />
      <div className="mt-10 card-list-wrapper">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;