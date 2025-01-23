"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const graph = [
    { label: "Barre", value: "Barre" },
    { label: "Pie", value: "Pie" },
]

export function ComboBoxGraphType({ onChange }) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    const handleSelect = (currentValue) => {
        const newValue = currentValue === value ? "" : currentValue
        setValue(newValue)
        setOpen(false)
        if (onChange) {
            onChange(newValue)
        }
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? graph.find((graph) => graph.value === value)?.label
                        : "Selectionner graph"}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Rechercher graph..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>Aucun graph trouvé.</CommandEmpty>
                        <CommandGroup>
                            {graph.map((graph) => (
                                <CommandItem
                                    key={graph.value}
                                    value={graph.value}
                                    onSelect={handleSelect}
                                >
                                    {graph.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === graph.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}