import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

const InviteRSVPContent = async ({
  token,
  submitted,
}: {
  token: string;
  submitted: boolean;
}) => {
  const row = await prisma.eventInvite.findFirst({
    where: { token },
    include: {
      event: {
        select: {
          id: true,
          title: true,
          description: true,
          location: true,
          eventDate: true,
        },
      },
    },
  });

  if (!row) {
    notFound();
  }

  const event = {
    title: row.event.title,
    description: row.event.description,
    location: row.event.location,
    eventDate: row.event.eventDate ? row.event.eventDate.toISOString() : null,
  };

  return (
    <div className="flex flex-1 flex-col gap-6">
      <Card>
        <CardHeader className="space-y-3">
          <Badge>RSVP</Badge>
          <CardTitle>{event.title}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {event.eventDate
              ? new Date(event.eventDate).toLocaleString()
              : "No date specified"}
            {event.location ? `- ${event.location}` : "No location specified"}
          </p>
          <p>
            {event.description ? (
              <p className="text-sm text-muted-foreground">event.description</p>
            ) : (
              "No description provided"
            )}
          </p>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
};

export default InviteRSVPContent;
