import React from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function DeleteMovie(props) {
  const { onClick } = props;
  return (
    <IconButton onClick={onClick} style={{backgroundColor:'brown'}}>
      <DeleteIcon color="secondary" />
    </IconButton>
  );
}

export default DeleteMovie;