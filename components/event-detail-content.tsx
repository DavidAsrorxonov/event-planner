import { countByStatus } from "@/lib/helper/count-by-status";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader } from "./ui/card";
import { createInviteLinkAction } from "@/lib/actions/events";
import { CopyButton } from "./ui/copy-button";

const EventDetailContent = async ({
  userId,
  eventId,
}: {
  userId: string | undefined;
  eventId: string;
}) => {
  const row = await prisma.event.findFirst({
    where: { id: eventId, ownerUserId: userId },
    select: {
      id: true,
      title: true,
      description: true,
      location: true,
      eventDate: true,
      invite: { select: { token: true } },
      rsvps: { select: { status: true } },
    },
  });

  if (!row) notFound();

  const counts = countByStatus(row.rsvps);

  const event = {
    id: row.id,
    title: row.title,
    description: row.description,
    location: row.location,
    eventDate: row.eventDate ? row.eventDate.toISOString() : null,
    inviteToken: row.invite?.token ?? null,
    ...counts,
  };

  const createInviteActionForEvent = createInviteLinkAction.bind(
    null,
    event.id,
  );

  const inviteUrl = event.inviteToken
    ? `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/invite/${event.inviteToken}`
    : null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-2">
          <h1 className="font-semibold text-2xl tracking-tight">
            {event.title}
          </h1>
          <p>
            {event.eventDate
              ? new Date(event.eventDate).toLocaleString()
              : "No date set"}

            {event.location ? ` - ${event.location}` : "No location set"}
          </p>
          {event.description && (
            <p className="max-w-2xl text-sm text-muted-foreground">
              {event.description}
            </p>
          )}
        </div>

        <Button asChild variant={"outline"}>
          <Link href={"/dashboard"}>Back</Link>
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 text-xs">
        <Badge>Going: {event.going}</Badge>
        <Badge variant={"secondary"}>Maybe: {event.maybe}</Badge>
        <Badge variant={"outline"}>Not Going: {event.not_going}</Badge>
      </div>

      <Card>
        <CardHeader>Invite Link</CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Share this link with guests so they can RSVP without creating an
            account.
          </p>
          {inviteUrl ? (
            <div className="flex items-center justify-between rounded-md border border-border bg-accent p-3 text-sm gap-2">
              <span className="truncate">{inviteUrl}</span>
              <CopyButton text={inviteUrl} />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No invite link generated yet.
            </p>
          )}

          <Button onClick={createInviteActionForEvent}>Generate Link</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventDetailContent;
