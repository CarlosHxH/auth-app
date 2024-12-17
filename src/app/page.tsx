"use client";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MoreIcon from "@mui/icons-material/MoreVert";
import DrawerAppBar from "@/components/DrawerAppBar";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";


export default function Page() {
  const router = useRouter()
  return (
    <DrawerAppBar fab={() => router.push('/create')}>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {Array.from({ length: 100 }, (_, i) => i + 1).map((i) => (
          <ListItem
            key={i}
            secondaryAction={
              <IconButton aria-label="comment">
                <MoreIcon />
              </IconButton>
            }
          >
            <Box>
              <Typography>Teste</Typography>
              <ListItemText primary={`Fulano da silva ${i}`} />
            </Box>
          </ListItem>
        ))}
      </List>
    </DrawerAppBar>
  );
}
