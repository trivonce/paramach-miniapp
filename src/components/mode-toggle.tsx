import { useTheme } from "@/components/theme-provider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTranslation } from 'react-i18next';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  const themes = [
    {
      id: "light",
      name: t('theme_light'),
    },
    {
      id: "dark",
      name: t('theme_dark'),
    },
    {
      id: "system",
      name: t('theme_system'),
    },
  ];

  return (
    <div className="space-y-1">
      <Label className="text-sm font-normal">{t('select_theme')}</Label>
      <RadioGroup
        className="grid grid-cols-3 items-center gap-0 relative overflow-hidden dark:bg-gray-900 bg-gray-100 rounded-xl z-[1]"
        onValueChange={setTheme}
        defaultValue="option-one"
      >
        {themes.map(({ id, name }) => (
          <div key={id} className={`text-center py-3 cursor-pointer`}>
            <RadioGroupItem hidden value={id} id={`option-${id}`} />
            <Label
              className={`dark:text-white  flex items-center justify-center gap-2 ${theme === id ? "text-white" : ""}`}
              htmlFor={`option-${id}`}
            > {name}
            </Label>
          </div>
        ))}
        <span
          className={`absolute top-0 left-0 w-1/3 h-full dark:bg-brand bg-brand -z-[1] rounded-xl duration-200 ${
            theme === "dark" ? "translate-x-full" : theme === "system" ? "translate-x-[200%]" : ""
          }`}
        />
      </RadioGroup>
    </div>
  );
}
