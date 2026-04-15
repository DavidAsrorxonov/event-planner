import EventDetailContent from "@/components/event-detail-content";
import { getSession } from "@/lib/auth/server";
import React from "react";

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) => {
  const { eventId } = await params;
  const session = await getSession();
  return (
    <EventDetailContent userId={session.data?.user.id} eventId={eventId} />
  );
};

export default EventDetailsPage;
