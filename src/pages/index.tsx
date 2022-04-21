/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { Grid, Box, Paper, Container , Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Task } from "src/interfaces/Task";
import { useRouter } from "next/router";

interface Props {
  tasks: Task[];
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function index({ tasks }: Props) {
  const router = useRouter()



  return (
    <>
      <Box>
        <Container fixed>
        {tasks.length ? (
          <Grid py={5} container spacing={4}>
            {tasks.map((items) => (
              <Grid onClick={() => router.push(`/tasks/edit/${items.id}`)} item xs={4} key={items.id}>
                <Item>
                  <Typography>{items.title}</Typography>
                  {items.created_on && (
                    <Typography variant="body2">
                      {new Date(items.created_on).toLocaleDateString()}
                    </Typography>
                  )}
                  <Typography>{items.description}</Typography>
                </Item>
              </Grid>
            )).reverse()}
          </Grid>
        ) : (
          <>
            <Typography
              variant="h5"
              sx={{
                justifyContent: "center",
                display: "flex",
                padding:'8rem'
              }}
            >
              Not found task
            </Typography>
          </>
        )}
          </Container>
      </Box>
    </>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/tasks");
  const tasks = await res.json();

  return {
    props: {
      tasks,
    },
  };
};
