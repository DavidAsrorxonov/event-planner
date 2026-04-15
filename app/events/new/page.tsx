"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createEventAction, CreateEventInput } from "@/lib/actions/events";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  title: z
    .string()
    .min(3, "Event title must be at least 3 characters.")
    .max(100, "Event title must be at most 100 characters."),
  description: z
    .string()
    .max(500, "Description must be at most 500 characters.")
    .optional(),
  location: z
    .string()
    .max(200, "Location must be at most 200 characters.")
    .optional(),
  eventDate: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const NewEventPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      title: "",
      description: "",
      location: "",
      eventDate: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Convert form data to the expected format
      const actionData: CreateEventInput = {
        title: data.title,
        description: data.description ? data.description : undefined,
        location: data.location ? data.location : undefined,
        eventDate: data.eventDate as string | undefined,
      };

      const result = await createEventAction(actionData);

      if (result.success) {
        router.push("/dashboard");
      } else if ("errors" in result && result.errors) {
        // Handle field-level errors
        const fieldErrors = result.errors as Record<string, string[]>;
        Object.entries(fieldErrors).forEach(([field, errors]) => {
          if (Array.isArray(errors) && errors.length > 0) {
            form.setError(field as keyof FormData, {
              message: errors[0],
            });
          }
        });
      } else if ("error" in result) {
        setSubmitError(result.error || "Failed to create event");
      }
    } catch (error) {
      setSubmitError("An unexpected error occurred");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Create Event</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldSet>
              <FieldGroup>
                <Controller
                  name="title"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Team dinner..."
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="description"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                      <Textarea
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Optional details about the event"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="location"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Location</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Optional location for the event"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="eventDate"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Event Date</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="datetime-local"
                        aria-invalid={fieldState.invalid}
                      />
                      <FieldDescription>
                        Optional, you can set this later.
                      </FieldDescription>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {submitError && (
                  <FieldError className="bg-destructive/10 p-3 rounded">
                    {submitError}
                  </FieldError>
                )}

                <div className="flex items-center gap-3">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create Event"}
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link href={"/dashboard"}>Cancel</Link>
                  </Button>
                </div>
              </FieldGroup>
            </FieldSet>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewEventPage;
