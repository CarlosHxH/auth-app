"use client"
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";

export default function CustomFab({ href }: { href: string }) {
  return (
    <>
    <Link href={href}>
      <Fab sx={{ position: "fixed", bottom: 20, right: 30 }} color="primary">
        <AddIcon />
      </Fab>
    </Link>
    </>
  );
}
