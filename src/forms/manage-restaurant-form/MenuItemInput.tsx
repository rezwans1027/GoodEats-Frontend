import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useFormContext } from "react-hook-form";

interface props {
  index: number;
  removeMenuItem: () => void;
}

const MenuItemInput = ({ index, removeMenuItem }: props) => {
  const { control } = useFormContext();
  return (
    <div className="flex items-end gap-2">
      <FormField
        control={control}
        name={`menuItems.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Name <FormMessage />
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Cheese Pizza"
                className="bg-white"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`menuItems.${index}.price`}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              Price ($) <FormMessage />
            </FormLabel>
            <FormControl>
              <Input {...field} placeholder="8.00" className="bg-white" />
            </FormControl>
          </FormItem>
        )}
      />
      <Button
        type="button"
        onClick={removeMenuItem}
        className="bg-red-500 max-h-fit max-[381px]:h-10 max-[381px]:w-4"
      >
        <div className="max-[380px]:hidden">Remove</div>
        <div className="min-[381px]:hidden p-0 m-0">
          <X size={12} />
        </div>
      </Button>
    </div>
  );
};

export default MenuItemInput;
