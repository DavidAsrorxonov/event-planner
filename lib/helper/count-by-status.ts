import type { RsvpStatus as PrismaRsvpStatus } from "@/lib/generated/prisma/enums";

export const countByStatus = (rsvps: { status: PrismaRsvpStatus }[]) => {
  let going = 0;
  let maybe = 0;
  let not_going = 0;

  for (const r of rsvps) {
    if (r.status === "going") going++;
    if (r.status === "maybe") maybe++;
    if (r.status === "not_going") not_going++;
  }

  return { going, maybe, not_going };
};
