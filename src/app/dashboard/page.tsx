import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { Container } from "@mui/material";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="p-6">
      <Navbar />
      <Container>
        {session.user.name}
        {session.user.image && (
          <Image
            width={500}
            height={500}
            src={session.user.image}
            alt="Profile"
            className="rounded-full w-24 h-24 mt-4"
          />
        )}
      </Container>
    </div>
  );
}
