/*
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";
*/
import Link from "next/link";
import { Button, Box } from "@mui/material";

export default async function Home() {
  //const session = await getServerSession(authOptions);

  return (
    <Box>
      <Button variant="contained">
        <Link href={"/auth/signin"} style={{ all: "unset" }}>
          Fazer login
        </Link>
      </Button>
    </Box>
  );
}
