import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon, PlusIcon } from "lucide-react";

type ContactInfoProps = React.ComponentProps<"div"> & {
  icon: LucideIcon;
  label: string;
  value: string;
};

type ContactCardProps = React.ComponentProps<"div"> & {
  // Content props
  title?: string;
  description?: string;
  contactInfo?: ContactInfoProps[];
  formSectionClassName?: string;
};

export function ContactCard({
  title = "Contact With Us",
  description = "If you have any questions regarding our Services or need help, please fill out the form here. We do our best to respond within 1 business day.",
  className,
  formSectionClassName,
  children,
  ...props
}: ContactCardProps) {
  return (
    <div
      className={cn(
        " bg-[#f3f0f3]/30 border relative grid h-full w-full max-w-[95vw] md:max-w-[90vw] lg:max-w-full mx-auto shadow md:grid-cols-2 lg:grid-cols-3",
        className
      )}
      {...props}
    >
      <PlusIcon className="absolute -top-3 -left-3 h-6 w-6 text-muted-foreground" />
      <PlusIcon className="absolute -top-3 -right-3 h-6 w-6 text-muted-foreground" />
      <PlusIcon className="absolute -bottom-3 -left-3 h-6 w-6 text-muted-foreground" />
      <PlusIcon className="absolute -right-3 -bottom-3 h-6 w-6 text-muted-foreground" />
      <div className="flex flex-col items-center justify-center justify-between lg:col-span-2">
        <div className="flex flex-col items-center justify-between relative h-full lg:py-36 py-12 lg:px-8 px-4">
          <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl text-muted-foreground">
            {title}
          </h1>
          <p className="lg:max-w-xl max-w-sm text-center text-sm md:text-base lg:text-lg text-white">
            {description}
          </p>
        </div>
      </div>
      <div
        className={cn(
          "bg-[#f3f0f3]/60 flex h-full w-full items-center border-t p-5 md:col-span-1 md:border-t-0 md:border-l",
          formSectionClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
