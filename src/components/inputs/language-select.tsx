import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";

const languages = [
  {
    id: "uz",
    name: "Uzbek",
  },
  {
    id: "en",
    name: "English",
  },
  {
    id: "ru",
    name: "Russian",
  },
];

export const LanguageSelect = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Select>
>(({ ...props }, ref) => {
  return (
    <div className="space-y-1">
      <Label className="text-sm">Tilni tanlang</Label>
      <Select defaultValue="uz" {...props}>
        <SelectTrigger ref={ref}>
          <SelectValue placeholder="Tilni tanlang" />
        </SelectTrigger>
        <SelectContent id="language-select">
          <SelectGroup>
            {languages.map(({ id, name }) => (
              <SelectItem key={id} value={id}>
                {name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
});

LanguageSelect.displayName = "LanguageSelect";

export default LanguageSelect;
