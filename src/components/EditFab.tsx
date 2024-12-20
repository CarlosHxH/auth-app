"use client"
import Fab from "@mui/material/Fab";
import { Edit as EditIcon } from "@mui/icons-material";
import Link from "next/link";

export default function EditFab({ href }: { href: string }) {
  return (
    <>
    <Link href={href}>
      <Fab sx={{ position: "fixed", bottom: 20, right: 30 }} color="primary">
        <EditIcon />
      </Fab>
    </Link>
    </>
  );
}
