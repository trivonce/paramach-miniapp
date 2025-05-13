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
import { useTranslation } from 'react-i18next';

const languages = [
  {
    id: "uz",
    name: "Uzbek",
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
  const { i18n } = useTranslation();
  return (
    <div className="space-y-1">
      <Label className="text-sm">Tilni tanlang</Label>
      <Select defaultValue={i18n.language} onValueChange={i18n.changeLanguage} {...props}>
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
