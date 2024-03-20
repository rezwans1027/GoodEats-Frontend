import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const formSchema = z.object({
  searchQuery: z.string({ required_error: "Search query is required" }),
});

export type SearchForm = z.infer<typeof formSchema>;

interface SearchBarProps {
  onSubmit: (formData: SearchForm) => void;
  placeholder: string;
  onReset?: () => void;
  searchQuery?: string;
}

const SearchBar = ({
  onSubmit,
  placeholder,
  onReset,
  searchQuery,
}: SearchBarProps) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery: searchQuery || "",
    },
  });

  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });
    if (onReset) onReset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex items-center flex-1 gap-3 justify-between flow-row border-2 rounded-full p-3 mx- max-[460px]:p-1 ${
          form.formState.errors.searchQuery && "border-red-500"
        }`}
      >
        <Search
          strokeWidth={2.5}
          size={30}
          className="ml-1 text-orange-500 max-md:hidden"
        />
        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  className="border-none bg-transparent outline-none focus-visible:ring-0 rounded-full focus-visible:ring-none focus-visible:outline-none md:text-md text-sm"
                  placeholder={placeholder}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="button"
          variant="outline"
          className="rounded-full max-[460px]:w-12 max-[460px]:text-xs"
          onClick={handleReset}
        >
          Clear
        </Button>
        <Button
          type="submit"
          className="rounded-full bg-orange-500 max-[460px]:w-12 max-[460px]:text-xs"
        >
          Search
        </Button>
      </form>
    </Form>
  );
};

export default SearchBar;
