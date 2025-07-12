import NotFound from "../NotFound";
import HomePage from "../modules/home";
import LoginPage from "../modules/auth";
import ProfilePage from "../modules/profile";
import ProtectedRoute from "./ProtectedRoute";
import PageLayout from "../layout/PageLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const createRoutes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <PageLayout>
          <HomePage />
        </PageLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <PageLayout>
          <ProfilePage />
        </PageLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const Routes = () => {
  return <RouterProvider router={createRoutes} />;
};

export default Routes;
