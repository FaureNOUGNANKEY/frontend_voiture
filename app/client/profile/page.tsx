import AccountDetailsForm from "@/components/client/profile/accountDetailsForm";
import ProfileCard from "@/components/client/profile/profileCard";
import RecentReservations from "@/components/client/profile/recentReservations";
import SecuritySection from "@/components/client/profile/securitySection";
import RequireClient from "@/contexts/RequireClient";

export default function ProfilePage() {
  return (
    <RequireClient>
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Colonne gauche */}
          <div className="md:col-span-4">
            <ProfileCard />
          </div>

          {/* Colonne droite */}
          <div className="md:col-span-8 space-y-6">
            <AccountDetailsForm />
            <SecuritySection />
            <RecentReservations />
          </div>
        </div>
      </main>
    </RequireClient>
  );
}
