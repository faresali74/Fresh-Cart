import React from "react";
import { FaUser } from "react-icons/fa6";
import PageHeader from "../../_components/PageHeader";
import { ProfileSidebar } from "../../_components/ProfileSidebar";
import AddressList from "../../_components/AdressComponent";

export default function ProfileLayout() {
  return (
    <>
      <PageHeader
        title="My Account"
        description="Manage your addresses and account settings"
        breadcrumbSteps={[{ name: "My Account" }]}
        icon={<FaUser className="text-3xl" />}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="w-full lg:w-72 lg:sticky lg:top-24">
            <ProfileSidebar />
          </div>

          <div className="flex-1 min-w-0 w-full">
            <AddressList />
          </div>
        </div>
      </div>
    </>
  );
}
