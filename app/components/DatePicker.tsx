import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { CardProps } from "~/atom/card";

export function DatePicker({
  props,
  setProps,
}: {
  props: CardProps;
  setProps: React.Dispatch<React.SetStateAction<CardProps>>;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[150px] justify-start text-left font-normal",
            !new Date(props.cardBackend.github.toDate) &&
              "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {new Date(props.cardBackend.github.toDate) ? (
            format(new Date(props.cardBackend.github.toDate), "PPP")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={new Date(props.cardBackend.github.toDate)}
          onSelect={(date) => {
            if (date) {
              setProps({
                ...props,
                cardBackend: {
                  ...props.cardBackend,
                  github: {
                    ...props.cardBackend.github,
                    toDate: date.toISOString(),
                  },
                },
              });
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
