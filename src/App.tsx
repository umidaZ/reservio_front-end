import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ReservationList from "./components/pages/clients/ReservationList";
import UpdateClientProfilePage from "./components/pages/clients/UpdateClientProfilePage";
import RestaurantMenuBuilder from "./components/pages/restaurant/features/menu/MenuBuilder";
import MenuCategoryCreator from "./components/pages/restaurant/features/menu/MenuCategoryCreator";
import Orders from "./components/pages/restaurant/features/orders/Orders";
import ReviewsPage from "./components/pages/restaurant/features/reviews/ReviewsPage";
import TablesPage from "./components/pages/restaurant/features/tables/TablesPage";
import TransactionsTable from "./components/pages/restaurant/features/transactions/TransactionsTable";
import RestaurantForm from "./components/pages/restaurant/RestaurantForm";
import RestaurantPage from "./components/pages/restaurant/RestaurantPage";
import UpdateRestaurantForm from "./components/pages/restaurant/update/UpdateRestaurantForm";
import RestaurantLayout from "./layout/RestaurantLayout";
import UserDashboardLayout from "./layout/UserDashboardLayout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RestaurantLayout></RestaurantLayout>,
  },
  {
    path: "/my-reservations",
    element: <ReservationList />,
  },
  {
    path: "/client/update-profile",
    element: <UpdateClientProfilePage />,
  },
  {
    path: "/restaurant/update-profile",
    element: <UpdateRestaurantForm />,
  },
  {
    path: "/restaurant/:restaurantSlug/:restaurantId",
    element: <RestaurantPage />,
  },
  {
    path: "/restaurant/user-dashboard/dashboard-orders",
    element: <UserDashboardLayout children={<Orders />}></UserDashboardLayout>,
  },
  {
    path: "/restaurant/user-dashboard/restaurant-details",
    element: (
      <UserDashboardLayout children={<RestaurantForm />}></UserDashboardLayout>
    ),
  },
  {
    path: "/restaurant/user-dashboard/reviews",
    element: (
      <UserDashboardLayout children={<ReviewsPage />}></UserDashboardLayout>
    ),
  },
  {
    path: "/restaurant/user-dashboard/menuCategory",
    element: (
      <UserDashboardLayout
        children={<MenuCategoryCreator />}
      ></UserDashboardLayout>
    ),
  },
  {
    path: "/restaurant/user-dashboard/tablesPage",
    element: (
      <UserDashboardLayout children={<TablesPage />}></UserDashboardLayout>
    ),
  },
  {
    path: "/restaurant/user-dashboard/transactions",
    element: (
      <UserDashboardLayout
        children={<TransactionsTable />}
      ></UserDashboardLayout>
    ),
  },
  {
    path: "/restaurant/user-dashboard/menu-builder",
    element: (
      <UserDashboardLayout
        children={<RestaurantMenuBuilder />}
      ></UserDashboardLayout>
    ),
  },
  {
    path: "*",
    element: <div>Not found!</div>,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
