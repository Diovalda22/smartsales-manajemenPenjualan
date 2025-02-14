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

interface Category {
    id: number;
    name: string;
}

interface ComboboxCategoryProps {
    categories: Category[];
    selected: number | null;
    setSelected: (value: number) => void;
}

export function ComboboxCategory({
    categories,
    selected,
    setSelected,
}: ComboboxCategoryProps) {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {selected
                        ? categories.find((cat) => cat.id === selected)?.name
                        : "Pilih Kategori..."}
                    <ChevronsUpDown className="ml-2 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Cari kategori..." />
                    <CommandList>
                        <CommandEmpty>
                            Tidak ada kategori ditemukan.
                        </CommandEmpty>
                        <CommandGroup>
                            {categories.map((category) => (
                                <CommandItem
                                    key={category.id}
                                    value={category.name}
                                    onSelect={() => {
                                        setSelected(category.id);
                                        setOpen(false);
                                    }}
                                >
                                    {category.name}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            selected === category.id
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
