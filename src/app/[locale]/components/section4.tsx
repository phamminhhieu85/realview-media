"use client";

import AnimateInView from "@/components/animation";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import TextareaAutoSize from "react-textarea-autosize";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useZodForm } from "@/lib/zod-form";
import { Loader } from "lucide-react";
import Link from "next/link";
import { Control } from "react-hook-form";
import { toast } from "sonner";
import { ClassValue } from "clsx";
import { Separator } from "@/components/ui/separator";
import { ContactForm, contactSchema } from "@/schemas/contact";
import { Icons } from "@/components/ui/icons";

interface Props {
  data: {
    header: string;
    title: string;
    description: string;
    message: {
      successMessage: string;
      errorMessage: string;
    };
    placeholder: {
      name: string;
      email: string;
      phone: string;
      type: string;
      description: string;
      send: string;
    };
    businessType: {
      type: string;
    }[];
    email: {
      title: string;
      email: string;
    };
    socialTitle: string;
  };
}

export default function Section4({ data }: Props) {
  const message = data.message;
  const placeholder = data.placeholder;

  const form = useZodForm({
    schema: contactSchema,
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      type: "",
      describe: "",
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({ ...data, locale: "en" }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      reset();

      toast.success(message.successMessage);
    } catch (error) {
      toast.error(message.errorMessage);
    }
  });

  return (
    <AnimateInView offsetY={-50}>
      <div className="container mx-auto py-20 md:py-28 max-w-6xl">
        <div className="space-y-4">
          <p className="font-medium text-lg">{data.header}</p>
          <h1 className="text-2xl md:text-3xl xl:text-4xl font-semibold">
            {data.title}
          </h1>
          <p className="md:text-lg text-muted-foreground">{data.description}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-10 mt-20">
          <Form {...form}>
            <form
              onSubmit={onSubmit}
              className="w-full transition-all focus-within:z-10"
            >
              <InputField
                control={control}
                name="name"
                isSubmitting={isSubmitting}
                placeholder={placeholder.name}
                className="rounded-t-xl border-b-0"
              />

              <InputField
                control={control}
                name="phone"
                isSubmitting={isSubmitting}
                placeholder={placeholder.phone}
                className="border-b-0"
              />

              <InputField
                control={control}
                name="email"
                isSubmitting={isSubmitting}
                placeholder={placeholder.email}
                className="border-b-0"
              />

              <FormField
                control={control}
                name="type"
                render={({ field, fieldState }) => {
                  return (
                    <FormItem>
                      <Select
                        disabled={isSubmitting}
                        value={field.value || ""}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={cn(
                              "duration-200 text-base py-10 rounded-none border-y-none focus:ring-1 focus:ring-offset-0 focus:ring-ring focus:z-10 relative px-4 border-b-0",
                              {
                                "bg-red-50": fieldState.invalid,
                              }
                            )}
                          >
                            <div
                              className={cn("", {
                                "[&>span]:text-muted-foreground": !field.value,
                              })}
                            >
                              <SelectValue placeholder={placeholder.type}>
                                <p>{field.value || "test"}</p>
                              </SelectValue>
                            </div>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {data.businessType.map((type) => (
                            <SelectItem
                              key={type.type}
                              value={type.type}
                              className="text-base"
                            >
                              {type.type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={control}
                name="describe"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <TextareaAutoSize
                      {...field}
                      className={cn(
                        "w-full border rounded-b-xl min-h-[120px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50   placeholder:text-muted-foreground focus:placeholder:text-transparent duration-200 py-10 px-4 focus:z-10 relative",
                        {
                          "bg-red-50": fieldState.error,
                        }
                      )}
                      placeholder={placeholder.description}
                      disabled={isSubmitting}
                    />
                  </FormItem>
                )}
              />

              <div className="flex justify-center sm:justify-start w-full">
                <Button
                  disabled={isSubmitting}
                  className="rounded-full gap-2 mt-5 w-32"
                  size="lg"
                >
                  {isSubmitting && (
                    <Loader size={20} className="animate-spin" />
                  )}
                  {placeholder.send}
                </Button>
              </div>
            </form>
          </Form>

          <div className="space-y-8 w-1/3 shrink-0">
            <div>
              <p className="text-lg mb-4 font-medium">{data.email.title}</p>

              <Link
                href="mailto:contact@rvmedia.vn"
                className="text-muted-foreground hover:text-foreground"
              >
                {data.email.email}
              </Link>
            </div>

            <Separator />

            <div>
              <p className="text-lg mb-4">{data.socialTitle}</p>

              <div className="flex gap-5 -ml-1.5">
                <Link
                  target="_blank"
                  href="https://www.facebook.com/profile.php?id=61557394537326"
                  rel="noreferrer"
                >
                  <Icons.facebook size={50} />
                </Link>

                <Link
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.instagram.com/realviewmedia_vn/"
                >
                  <Icons.instagram size={50} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimateInView>
  );
}

const InputField = ({
  control,
  name,
  isSubmitting,
  placeholder,
  className,
}: {
  control: Control<ContactForm>;
  name: keyof ContactForm;
  isSubmitting: boolean;
  placeholder: string;
  className?: ClassValue;
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormControl>
            <Input
              {...field}
              disabled={isSubmitting}
              placeholder={placeholder}
              className={cn(
                "border rounded-none focus:placeholder:text-transparent duration-200 px-4 py-10 focus-visible:ring-1 focus-visible:ring-offset-0 text-base focus-visible:z-10 relative",
                className,
                {
                  "bg-red-50": fieldState.invalid,
                }
              )}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
