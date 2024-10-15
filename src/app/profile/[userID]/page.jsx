"use client";
import { useState, useEffect } from "react";
import NavBarPerfil from "@/app/profile/[userID]/NavBarPerfil";
import PersonalInfo from "@/app/profile/[userID]/PersonalInfo";
import AccountInfo from "@/app/profile/[userID]/AccountInfo";
import AccountSettings from "@/app/profile/[userID]/AccountSettings";

export default function ProfilePage({ params }) {
  const [activeTab, setActiveTab] = useState("personal");
  // para fondo en etiqueta <main>  bg-white/10 backdrop-blur-md
  return (
    <div className="text-white">
      <div className="container mx-auto px-4 py-8 lg:px-8">
        <div className="flex flex-col gap-8 lg:gap-8 md:gap-2 md:flex-row">
          <NavBarPerfil activeTab={activeTab} setActiveTab={setActiveTab} />

          <main className="rounded-xl p-8 shadow-lg md:w-3/4">
            {activeTab === "personal" && <PersonalInfo />}
            {activeTab === "account" && <AccountInfo />}
            {activeTab === "config" && <AccountSettings />}
          </main>
        </div>
      </div>
    </div>
  );
}
