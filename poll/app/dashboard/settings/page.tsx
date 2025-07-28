import { Inter } from "next/font/google";
import ProfileSettingInput from "@/app/ui-components/inputs/ProfileSettingInput";

const inter = Inter({
    subsets: ["latin"],
});

export default function SettingsDashboard() {
    const userData = {
        username: "User1234",
        email: "User1234@example.com",
        country: "CountryName",
        bio: "This is the UI design of a poll creation application",
    };

    return (
        <section className="bg-panel-background m-4 flex min-h-screen flex-col rounded-2xl p-6">
            <h4 className="text-2xl font-bold">Settings</h4>

            <section className="mt-[4.125rem] grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
                {/* === User details section === */}
                <div className="bg-cards-background min-h-screen rounded-xl p-6">
                    <h3
                        className={`${inter.className} text-cards-foreground font-bold`}
                    >
                        Profile
                    </h3>

                    <div className="mt-[2.188rem] flex flex-col gap-[2.188rem]">
                        {/* === Username input === */}
                        <ProfileSettingInput
                            label="Username"
                            data={userData.username}
                        />

                        {/* === Email input === */}
                        <ProfileSettingInput
                            label="Email"
                            data={userData.email}
                        />

                        {/* === Country input === */}
                        <ProfileSettingInput
                            label="Country"
                            data={userData.country}
                        />

                        {/* === Bio input === */}
                        <ProfileSettingInput label="Bio" data={userData.bio} />
                    </div>
                </div>

                {/* === Password settings section === */}
                <div className="bg-cards-background min-h-screen rounded-xl p-6">
                    <h3
                        className={`${inter.className} text-cards-foreground font-bold`}
                    >
                        Change Password
                    </h3>

                    <p
                        className={`${inter.className} mt-[0.875rem] font-medium lg:max-w-[80%]`}
                    >
                        To change password enter your new password and confirm
                    </p>
                </div>
            </section>
        </section>
    );
}
