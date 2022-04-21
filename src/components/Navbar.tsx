import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import { useRouter } from "next/router";

function Navbar() {
  const router = useRouter();

  const myLoader = () => {
    return `https://task.io/files/assets/landing-v3/logo-taskio-white-9f0bddfb8d1a9b2fe4e091f0daddfa513bd0f5b60de4d3a7e2b87166bf11491d.png`;
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Image
          onClick={() => router.push('/')}
            width={50}
            height={20}
            loader={myLoader}
            src=" https://task.io/files/assets/landing-v3/logo-taskio-white-9f0bddfb8d1a9b2fe4e091f0daddfa513bd0f5b60de4d3a7e2b87166bf11491d.png"
            alt="..."
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <Button color="inherit" onClick={() => router.push("/tasks/new")}>
            Addid New Task
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
