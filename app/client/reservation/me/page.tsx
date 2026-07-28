import ClientFooter from "@/components/client/layout/ClientFooter";
import ClientHeader from "@/components/client/layout/ClientHeader";
import MyReservationsHeader from "@/components/client/reservations/myReservationsHeader";
import MyReservationsList from "@/components/client/reservations/myReservationsList";

export default function MyReservationsPage() {
  return (
    <main className="mx-auto px-4 md:px-10 py-10 bg-white">
      <MyReservationsHeader />
      <MyReservationsList />
    </main>
  );
}
