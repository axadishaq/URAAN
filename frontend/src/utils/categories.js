import {
   Palette,
   Wrench,
   Shirt,
   ShoppingBasket,
   Plug,
   House,
   Car,
   Truck,
   Users,
} from "lucide-react";

// `value` is what is stored in the database (keep as is, existing data uses
// these spellings); `label` is what people see.
export const SERVICE_CATEGORIES = [
   { value: "design", label: "Design", hint: "Logos, banners and printing", icon: Palette },
   { value: "Technicion", label: "Technician & repair", hint: "AC, plumbing, wiring and appliances", icon: Wrench },
   { value: "Clothing", label: "Clothing & tailoring", hint: "Stitching, alterations and custom suits", icon: Shirt },
   { value: "Groceries", label: "Groceries", hint: "Vegetables, fruits, snacks and bakery", icon: ShoppingBasket },
   { value: "Electronics", label: "Electronics", hint: "Phones, laptops and gadgets", icon: Plug },
   { value: "Household", label: "Household", hint: "Cleaning, painting and home fixes", icon: House },
   { value: "Transport", label: "Transport", hint: "Rides, loaders and moving", icon: Car },
   { value: "Delievery", label: "Delivery", hint: "Parcels and errands", icon: Truck },
   { value: "GroupHiring", label: "Group hiring", hint: "Teams for events and bigger jobs", icon: Users },
];

// Courses use the same list, without group hiring
export const COURSE_CATEGORIES = SERVICE_CATEGORIES.filter(
   (c) => c.value !== "GroupHiring"
);

export const COURSE_LEVELS = ["Beginner", "Intermediate", "Advanced"];

export const categoryLabel = (value) =>
   SERVICE_CATEGORIES.find(
      (c) => c.value.toLowerCase() === String(value || "").toLowerCase()
   )?.label ||
   value ||
   "";
