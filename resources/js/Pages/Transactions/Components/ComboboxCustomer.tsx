import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/Components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/Components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";

interface Customer {
    id: number;
    name: string;
}

interface ComboboxCustomerProps {
    customers: Customer[];
    selected: number | null;
    setSelected: (value: number) => void;
}

export function ComboboxCustomer({
    customers,
    selected,
    setSelected,
}: ComboboxCustomerProps) {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {selected
                        ? customers.find((cat) => cat.id === selected)?.name
                        : "Pilih Pelanggan..."}
                    <ChevronsUpDown className="ml-2 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                <Command>
                    <CommandInput
                        className="my-2"
                        placeholder="Cari Pelanggan..."
                    />
                    <CommandList>
                        <CommandEmpty>
                            Tidak ada pelanggan ditemukan.
                        </CommandEmpty>
                        <CommandGroup>
                            {customers.map((customer) => (
                                <CommandItem
                                    key={customer.id}
                                    value={customer.name}
                                    onSelect={() => {
                                        setSelected(customer.id);
                                        setOpen(false);
                                    }}
                                >
                                    {customer.name}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            selected === customer.id
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
