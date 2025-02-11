import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

const years = [
    { label: "2018", value: "2018" },
    { label: "2019", value: "2019" },
    { label: "2020", value: "2020" },
];

export function ComboBoxYear({ value, onChange, startYear }) {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(value);

    const handleSelect = (currentValue) => {
        const newValue = currentValue === selectedValue ? "" : currentValue;
        
        if(!newValue) {
            setOpen(false);
            return;
        }
        setSelectedValue(newValue);
        setOpen(false);
        if (onChange) {
            onChange(newValue);
        }
    };

    const filteredYears = startYear
        ? years.filter((year) => parseInt(year.value) > parseInt(startYear))
        : years;

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {selectedValue
                        ? years.find((year) => year.value === selectedValue)?.label
                        : "Select year"}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search year..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No year found.</CommandEmpty>
                        <CommandGroup>
                            {filteredYears.map((year) => (
                                <CommandItem
                                    key={year.value}
                                    value={year.value}
                                    onSelect={handleSelect}
                                >
                                    {year.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            selectedValue === year.value ? "opacity-100" : "opacity-0"
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