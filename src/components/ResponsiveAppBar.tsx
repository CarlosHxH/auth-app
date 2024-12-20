"use client";
import React from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Container,
  Box,
} from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import LogoutButton from "./LogoutButton";

interface Props {
  title: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export default function SimpleAppBar({
  title,
  showBackButton = false,
  onBackClick,
}: Props) {
  const router = useRouter();

  const handleBack = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      router.back();
    }
  };

  return (
    <AppBar component={'nav'}>
      <Container maxWidth="xl">
        <Toolbar>
          {showBackButton && (
            <IconButton
              color="inherit"
              aria-label="back"
              onClick={handleBack}
              edge="start"
              sx={{ mr: 2 }}
            >
              <ArrowBackIcon />
            </IconButton>
          )}

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Box sx={{ flexGrow: 0, marginLeft: "auto" }}>
            <LogoutButton />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
