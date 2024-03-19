import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types";
import { useEffect } from "react";

interface props {
  onSave: (RestaurantFormData: FormData) => void;
  isLoading: boolean;
  restaurant?: Restaurant;
}

function ManageRestaurantForm({ onSave, isLoading, restaurant }: props) {
  const formSchema = z.object({
    restaurantName: z.string({ required_error: "Restaurant name is required" }),
    city: z.string({ required_error: "City is required" }),
    country: z.string({ required_error: "Country is required" }),
    deliveryPrice: z.coerce.number({
      required_error: "Delivery price is required",
      invalid_type_error: "Delivery price is required",
    }),
    estimatedDeliveryTime: z.coerce.number({
      required_error: "Estimated delivery time is required",
      invalid_type_error: "Estimated delivery time is required",
    }),
    cuisines: z.array(z.string()).nonempty({
      message: "At least one cuisine is required",
    }),
    menuItems: z.array(
      z.object({
        name: z.string().min(1, { message: "is required" }),
        price: z.coerce
          .number({ invalid_type_error: "Must be a number" })
          .min(1, { message: "is required" }),
      })
    ),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "Image is required" }).optional(),
  }).refine((data) => data.imageUrl || data.imageFile, { 
    message: "Image is required",
    path: ["imageFile"],
  });

  type RestaurantFormData = z.infer<typeof formSchema>;

  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      restaurantName: "",
      city: "",
      country: "",
      deliveryPrice: undefined,
      estimatedDeliveryTime: undefined,
      cuisines: [],
      menuItems: [{ name: "", price: undefined }],
    },
  });

  useEffect(() => {
    if (!restaurant) return;

    const deliveryPriceFormatted = (restaurant.deliveryPrice / 100).toFixed(2);
    const menuItemsFormatted = restaurant.menuItems.map((menuItem) => {
      return {
        name: menuItem.name,
        price: parseInt((menuItem.price / 100).toFixed(2)),
      };
    });

    const updatedRestaurant = {
      ...restaurant,
      deliveryPrice: parseFloat(deliveryPriceFormatted),
      menuItems: menuItemsFormatted,
    };

    form.reset(updatedRestaurant);
  }, [form, restaurant]);

  const onSubmit = (formDataJson: RestaurantFormData) => {
    const formData = new FormData();

    formData.append("restaurantName", formDataJson.restaurantName);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append(
      "deliveryPrice",
      (formDataJson.deliveryPrice * 100).toString()
    );
    formData.append(
      "estimatedDeliveryTime",
      formDataJson.estimatedDeliveryTime.toString()
    );
    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });
    formDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(
        `menuItems[${index}][price]`,
        (menuItem.price * 100).toString()
      );
    });
    if (formDataJson.imageFile) {
      formData.append("imageFile", formDataJson.imageFile);
    }

    onSave(formData);
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 bg-gray-50 rounded-lg sm:p-8"
        >
          <DetailsSection />
          <Separator />
          <CuisinesSection />
          <Separator />
          <MenuSection />
          <Separator />
          <ImageSection />
          {isLoading ? (
            <LoadingButton />
          ) : (
            <Button type="submit" className="bg-orange-500">
              Submit
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}

export default ManageRestaurantForm;