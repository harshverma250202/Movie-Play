import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton } from "@mui/material";
import DeleteButton from "./DeleteButton";
import EditIcon from "@mui/icons-material/Edit";

function UserTable(props) {
    const { data, onEdit, onDelete } = props;

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>username</TableCell>
                    <TableCell>email</TableCell>
                    <TableCell>mobileNumber</TableCell>
                    <TableCell>devicesLogged</TableCell>
                    <TableCell>lastPayment</TableCell>
                    <TableCell>Edit / Delete</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((user) => (
                    <TableRow key={user._id}>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.mobileNumber}</TableCell>
                        <TableCell>{user.devicesLogged}</TableCell>
                        <TableCell>{user.lastPayment}</TableCell>
                        <TableCell>
                            <IconButton onClick={() => onEdit(user)} style={{backgroundColor:'cadetblue'}}>
                                <EditIcon />
                            </IconButton>
                            <DeleteButton onClick={() => onDelete(user._id)} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default UserTable;