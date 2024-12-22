"use client";
import Fab from "@mui/material/Fab";
import { Edit as EditIcon, Add as AddIcon } from "@mui/icons-material";
import Link from "next/link";
import { MouseEventHandler } from "react";

interface Props
{
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: "Plus" | "Edit";
}

export default function CustomFab({ href, onClick, variant }: Props)
{
  if (Boolean(href))
  {
    return (
      <Link href={href||''}>
        <Fab sx={{ position: "fixed", bottom: 20, right: 30 }} color="primary">
          {variant === "Edit" ? <EditIcon /> : <AddIcon />}
        </Fab>
      </Link>
    )
  }
  return (
    <Fab onClick={onClick} sx={{ position: "fixed", bottom: 20, right: 30 }} color="primary">
      {variant === "Edit" ? <EditIcon /> : <AddIcon />}
    </Fab>
  );
}