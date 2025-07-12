import  { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import EditProfileModal from "./component/EditProfileModal";

const ProfilePage = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <section className="bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="container py-8 min-h-screen">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-primary from-35% to-tertiary rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Profile Information
              </h1>
              <button
                onClick={() => {
                  setIsOpen(true);
                }}
                className="px-4 py-2 bg-secondary rounded-xl text-slate-50 hover:bg-secondary/80 transition-colors duration-200"
              >
                Edit Profile
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Name
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {user?.name || "Budi Santoso"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Email
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {user?.email || "budi@example.com"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Phone
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {user?.phone || "081234567890"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Address
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {user?.address || "Jl. Sudirman No. 123"}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    City
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {user?.city || "Jakarta"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Division
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {user?.division || "Marketing"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Position
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {user?.position || "Marketing Manager"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <EditProfileModal
        initialData={{
          id: user?.id || 0,
          address: user?.address || "",
          city: user?.city || "",
          division: user?.division || "",
          name: user?.name || "",
          phone: user?.phone || "",
          position: user?.position || "",
        }}
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
      />
    </>
  );
};

export default ProfilePage;
