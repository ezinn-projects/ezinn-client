import SearchSongsClient from "@/components/search-songs-client";
import { getBookingDetails } from "@/lib/data-cache";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  console.log("params", params);

  const { id } = await params; // <-- await params trước
  console.log("id", id);

  // SSR fetch booking details với room schedule ID
  // Sử dụng cached function để deduplicate requests
  const initialBookingDetails = await getBookingDetails(id);

  console.log("initialBookingDetails", initialBookingDetails);

  return (
    <SearchSongsClient
      roomScheduleId={id}
      initialBookingDetails={initialBookingDetails}
    />
  );
}
