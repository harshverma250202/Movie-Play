import React from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function DeleteButton(props) {
  const { onClick } = props;
  return (
    <IconButton onClick={onClick} style={{backgroundColor:'brown', margin:'4px'}}>
      <DeleteIcon color="secondary" />
    </IconButton>
  );
}

export default DeleteButton;