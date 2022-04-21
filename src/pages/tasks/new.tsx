/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import {
  Button,
  CardContent,
  CardActions,
  Card,
  TextField,
  TextareaAutosize,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
} from "@mui/material";
import { useState, useEffect } from "react";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import { Task } from "src/interfaces/Task";

export default function newPage() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [confirm, setConfirm] = useState<boolean>(false);
  const router = useRouter();

  const loadTask = async (id: string) => {
    const res = await fetch("http://localhost:3000/api/tasks/" + id);
    const task = await res.json();
    setTitle(task.title);
    setDescription(task.description);
  };

  useEffect(() => {
    if (typeof router.query.id === "string") {
      loadTask(router.query.id);
    }
  }, [router.query]);

  const handleTask = async (titles: string, descriptions: string) => {
    await fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: titles,
        description: descriptions,
      }),
    });
  };

  const updateTask = async (id: string, title: string, description: string) => {
    await fetch("http://localhost:3000/api/tasks/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
      }),
    });
  };

  const handleSubmit = async () => {
    try {
      if (typeof router.query.id === "string") {
        updateTask(router.query.id, title, description);
      } else {
        await handleTask(title, description);
      }
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await fetch("http://localhost:3000/api/tasks/" + id, {
        method: "DELETE",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickOpen = () => {
    setConfirm(true);
  };
  return (
    <Grid padding="5rem" height="90vh">
      <Card
        className="form"
        sx={{ maxWidth: 500, maxHeight: 350, margin: "auto" }}
      >
        <CardContent>
          <TextField
            fullWidth
            label="Title"
            id="fullWidth"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "100%", height: "100px", margin: "10px 0" }}
          />
        </CardContent>
        <CardActions>
          {router.query.id ? (
            <>
              <Button
                startIcon={<SaveIcon color="success" />}
                color="success"
                onClick={() => handleSubmit()}
                size="small"
                variant="outlined"
              >
                Update
              </Button>
              <Button
                startIcon={<DeleteIcon color="error" />}
                color="error"
                onClick={handleClickOpen}
                size="small"
                variant="outlined"
              >
                Delete
              </Button>
              <Dialog
                open={confirm}
                onClose={handleClickOpen}
                aria-labelledby="draggable-dialog-title"
              >
                <DialogTitle
                  style={{ cursor: "move" }}
                  id="draggable-dialog-title"
                >
                  Delete s task
                </DialogTitle>
                <DialogContent>
                  <DialogContentText >
                  {`Are you sure you want to delete this task id: ${router.query.id}`}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={() => setConfirm(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() =>
                  typeof router.query.id === "string" &&
                  deleteTask(router.query.id)
                }>Ok</Button>
                </DialogActions>
              </Dialog>
            </>
          ) : (
            <Button
              startIcon={<SaveIcon color="primary" />}
              onClick={() => handleSubmit()}
              size="small"
              variant="outlined"
            >
              Save
            </Button>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}
