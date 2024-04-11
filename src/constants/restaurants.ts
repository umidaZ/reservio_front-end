import img1 from "../assets/images/1.png";
import img2 from "../assets/images/2.png";
import img3 from "../assets/images/3.png";
import img4 from "../assets/images/4.png";
import img5 from "../assets/images/5.png";
export interface RestaurantData {
  name: string;

  restaurantLink: string;
  location: string;
  description: string;
  photos: string;
  contact_number: string;
  email: string;
  website: string;
  instagram: string;
  telegram: string;
  opening_time: string;
  closing_time: string;
  rating: number;
  is_halal: boolean;
  cuisines: string[];
}

export const dummyRestaurants = [
  {
    name: "Green Garden Grill",
    restaurantLink: "green-garden-grill",
    location: "789 Elm Street",
    description: "A vegetarian paradise with fresh, organic ingredients.",
    photos: img1,
    contact_number: "789-012-3456",
    email: "info@greengardengrill.com",
    website: "http://www.greengardengrill.com",
    instagram: "@greengardengrill",
    telegram: "",
    opening_time: "09:00",
    closing_time: "20:00",
    rating: 4.8,
    is_halal: false,
    cuisines: ["Vegetarian", "Healthy"],
  },
  {
    name: "Seafood Sensation",
    restaurantLink: "seafood-sensation",
    location: "321 Pine Street",
    description: "Savor the taste of the ocean with our fresh seafood dishes.",
    photos: img2,
    contact_number: "321-654-9870",
    email: "contact@seafoodsensation.com",
    website: "http://www.seafoodsensation.com",
    instagram: "",
    telegram: "",
    opening_time: "11:00",
    closing_time: "22:00",
    rating: 4.6,
    is_halal: false,
    cuisines: ["Seafood"],
  },
  {
    name: "Sizzling Steaks",
    restaurantLink: "sizzling-steaks",
    location: "567 Maple Avenue",
    description: "Indulge in premium cuts of steak grilled to perfection.",
    photos: img3,

    contact_number: "567-890-1234",
    email: "info@sizzlingsteaks.com",
    website: "http://www.sizzlingsteaks.com",
    instagram: "@sizzlingsteaks",
    telegram: "",
    opening_time: "17:00",
    closing_time: "23:00",
    rating: 4.4,
    is_halal: false,
    cuisines: ["Steakhouse", "American"],
  },
  {
    name: "Tokyo Delights",
    restaurantLink: "tokyo-delights",
    location: "987 Cedar Street",
    description: "Authentic Japanese cuisine served with traditional flair.",
    photos: img4,
    contact_number: "987-654-3210",
    email: "hello@tokyodelights.com",
    website: "http://www.tokyodelights.com",
    instagram: "@tokyodelights",
    telegram: "",
    opening_time: "12:00",
    closing_time: "21:30",
    rating: 4.7,
    is_halal: false,
    cuisines: ["Japanese", "Sushi"],
  },
  {
    name: "Mediterranean Oasis",
    restaurantLink: "mediterranean-oasis",
    location: "234 Olive Street",
    description:
      "Transport yourself to the shores of the Mediterranean with our flavorful dishes.",
    photos: img5,

    contact_number: "234-567-8901",
    email: "info@mediterraneanoasis.com",
    website: "http://www.mediterraneanoasis.com",
    instagram: "@mediterraneanoasis",
    telegram: "",
    opening_time: "10:30",
    closing_time: "22:30",
    rating: 4.3,
    is_halal: true,
    cuisines: ["Mediterranean"],
  },
];

interface Reservation {
  num_guests: number;
  reservation_day: string;
  reservation_time: string;
  customer_name: string;
  customer_id: number;
  order_status: "Pending" | "Accepted" | "Rejected";
}

export const reservations: Reservation[] = [
  {
    num_guests: 2,
    reservation_day: "2024-03-18",
    reservation_time: "18:30",
    customer_name: "John Doe",
    customer_id: 1001,
    order_status: "Pending",
  },
  {
    num_guests: 4,
    reservation_day: "2024-03-19",
    reservation_time: "19:00",
    customer_name: "Jane Smith",
    customer_id: 1002,
    order_status: "Accepted",
  },
  {
    num_guests: 3,
    reservation_day: "2024-03-20",
    reservation_time: "20:00",
    customer_name: "David Lee",
    customer_id: 1003,
    order_status: "Pending",
  },
  {
    num_guests: 5,
    reservation_day: "2024-03-21",
    reservation_time: "18:45",
    customer_name: "Emily Wang",
    customer_id: 1004,
    order_status: "Rejected",
  },
  {
    num_guests: 2,
    reservation_day: "2024-03-22",
    reservation_time: "17:30",
    customer_name: "Michael Tan",
    customer_id: 1005,
    order_status: "Accepted",
  },
  {
    num_guests: 4,
    reservation_day: "2024-03-23",
    reservation_time: "19:30",
    customer_name: "Sarah Chen",
    customer_id: 1006,
    order_status: "Pending",
  },
  {
    num_guests: 3,
    reservation_day: "2024-03-24",
    reservation_time: "20:15",
    customer_name: "Kevin Liu",
    customer_id: 1007,
    order_status: "Accepted",
  },
  {
    num_guests: 6,
    reservation_day: "2024-03-25",
    reservation_time: "18:00",
    customer_name: "Lisa Kim",
    customer_id: 1008,
    order_status: "Rejected",
  },
  {
    num_guests: 2,
    reservation_day: "2024-03-26",
    reservation_time: "17:45",
    customer_name: "Brian Wong",
    customer_id: 1009,
    order_status: "Pending",
  },
  {
    num_guests: 4,
    reservation_day: "2024-03-27",
    reservation_time: "19:45",
    customer_name: "Olivia Zhao",
    customer_id: 1010,
    order_status: "Accepted",
  },
];
