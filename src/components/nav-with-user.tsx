import Nav from "@/components/nav";
import { getCurrentUser } from "@/lib/auth-server";

export default async function NavWithUser() {
  const currentUser = await getCurrentUser();
  return <Nav currentUser={currentUser} />;
}
