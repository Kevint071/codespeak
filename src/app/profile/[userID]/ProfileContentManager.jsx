"use client";
import { useState } from "react";
import PersonalInfo from "@/app/profile/[userID]/PersonalInfo";
import AccountInfo from "@/app/profile/[userID]/AccountInfo";
import AccountSettings from "@/app/profile/[userID]/AccountSettings";
import NavBarPerfil from "@/app/profile/[userID]/NavBarPerfil";


function MainOptions() {
	const [activeTab, setActiveTab] = useState("personal");

	return (
		<div className="flex flex-col gap-8 md:flex-row md:gap-2 lg:gap-8">
			<NavBarPerfil activeTab={activeTab} setActiveTab={setActiveTab} />

			<main className="rounded-xl p-8 shadow-lg md:w-3/4">
				{activeTab === "personal" && <PersonalInfo />}
				{activeTab === "account" && <AccountInfo />}
				{activeTab === "config" && <AccountSettings />}
			</main>
		</div>
	);
}

export default MainOptions;
