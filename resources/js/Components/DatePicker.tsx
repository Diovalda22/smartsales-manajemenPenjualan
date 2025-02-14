"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/Components/ui/button";
import { Calendar } from "@/Components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";

export function DatePicker({
    date,
    onChange,
}: {
    date?: Date;
    onChange: (date?: Date) => void;
}) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[240px] h-[50px] justify-start text-left font-normal rounded-xl"
                    )}
                >
                    <CalendarIcon className="mr-2" />
                    {date ? format(date, "PPP") : <span>Pilih Tanggal</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={onChange} // Gunakan onChange dari props
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}
