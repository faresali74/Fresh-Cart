import React from "react";
import PageHeader from "@/app/_components/PageHeader";
import { FaUser } from "react-icons/fa6";
import { ProfileSidebar } from "@/app/_components/ProfileSidebar";
import ProfileInfoForm from "@/app/_components/ProfileInformatios";
import ChangePasswordForm from "@/app/_components/ChangePasswordForm";

export default function profileSettings() {
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

          <div className="flex-1 min-w-0 w-full space-y-8">
            <ProfileInfoForm />
            <ChangePasswordForm />
          </div>
        </div>
      </div>
    </>
  );
}
