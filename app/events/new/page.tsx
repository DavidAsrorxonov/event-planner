import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import React from "react";

const NewEventPage = async () => {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Create Event</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="title">Title</FieldLabel>
                <Input
                  id="title"
                  name="title"
                  required
                  placeholder="Team dinner..."
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Optional details about the event"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="location">Location</FieldLabel>
                <Input
                  id="location"
                  name="location"
                  placeholder="Optional location for the event"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="eventDate">Event Date</FieldLabel>
                <Input id="eventDate" name="eventDate" type="datetime-local" />
                <FieldDescription>
                  Optional, you can set this later.
                </FieldDescription>
              </Field>

              <div className="flex items-center gap-3">
                <Button type="submit">Create Event</Button>
                <Button type="button" variant="outline" asChild>
                  <Link href={"/dashboard"}>Cancel</Link>
                </Button>
              </div>
            </FieldGroup>
          </FieldSet>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewEventPage;
