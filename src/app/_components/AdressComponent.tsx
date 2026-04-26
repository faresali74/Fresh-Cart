"use client";
import React, { useEffect, useState } from "react";
import { FaPlus, FaLocationDot, FaTrashCan, FaMapPin } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { getUserAddresses } from "@/Services/user/Adresses/GetUserAdressrs";
import AddAddressModal from "./AddAdderssForm";
import { deleteAddress } from "@/Services/user/Adresses/DeleteAdress";
import Swal from "sweetalert2";
import { Address } from "@/Services/user/Adresses/AddAdress";

export default function AddressList() {
  const { data: session } = useSession();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      const token = session?.accessToken;
      if (!token) return;

      try {
        setIsLoading(true);
        const result = await getUserAddresses(token);
        if (result.status === "success") {
          setAddresses(result.data);
        }
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Failed to load addresses";
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddresses();
  }, [session, isModalOpen]);

  const handleDelete = async (addressId: string) => {
    const token = session?.accessToken;
    if (!token) return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      customClass: { popup: "rounded-3xl" },
    });

    if (!result.isConfirmed) return;

    try {
      const apiResult = await deleteAddress(addressId, token);
      if (apiResult.status === "success") {
        setAddresses((prev) => prev.filter((addr) => addr._id !== addressId));
        toast.success(apiResult.message || "Address deleted successfully");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to delete address";
      toast.error(message);
    }
  };

  return (
    <main className="flex-1 min-w-0">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">My Addresses</h2>
            <p className="text-gray-500 text-sm mt-1">
              Manage your saved delivery addresses
            </p>
          </div>
          {addresses.length > 0 && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/25"
            >
              <FaPlus className="text-sm" />
              <span>Add Address</span>
            </button>
          )}
        </div>

        {/* Loading */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-500 font-medium">
              Fetching your addresses...
            </p>
          </div>
        ) : addresses.length > 0 ? (
          /* Address Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((addr) => (
              <div
                key={addr._id}
                className="group bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:border-green-500 transition-all relative overflow-hidden"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                      <FaMapPin />
                    </div>
                    <h3 className="font-bold text-gray-900 capitalize">
                      {addr.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => handleDelete(addr._id)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-2"
                  >
                    <FaTrashCan />
                  </button>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    <span className="font-semibold text-gray-900">
                      Details:
                    </span>{" "}
                    {addr.details}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">City:</span>{" "}
                    {addr.city}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">Phone:</span>{" "}
                    {addr.phone}
                  </p>
                </div>

                <div className="absolute -right-4 -bottom-4 text-gray-50 group-hover:text-green-50/50 transition-colors">
                  <FaLocationDot className="text-8xl" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-sm">
            <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-5 border border-gray-100">
              <FaLocationDot className="text-3xl text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              No Addresses Yet
            </h3>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto text-sm leading-relaxed">
              Add your first delivery address to make checkout faster and easier
              for your future orders.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-green-600 text-white font-bold hover:bg-green-700 transition-all active:scale-95 shadow-lg shadow-green-600/20"
            >
              <FaPlus className="text-sm" />
              <span>Add Your First Address</span>
            </button>
          </div>
        )}

        <AddAddressModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            if (session?.accessToken) {
              getUserAddresses(session.accessToken);
            }
          }}
        />
      </div>
    </main>
  );
}
