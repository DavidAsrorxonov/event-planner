import EventDetailContent from "@/components/event-detail-content";
import InviteRSVPContent from "@/components/invite-rsvp-content";
import { getSession } from "@/lib/auth/server";
import React from "react";

const InvitePage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ submitted?: string }>;
}) => {
  const { token } = await params;
  const query = await searchParams;

  const session = await getSession();
  return (
    <InviteRSVPContent token={token} submitted={query.submitted === "1"} />
  );
};

export default InvitePage;
