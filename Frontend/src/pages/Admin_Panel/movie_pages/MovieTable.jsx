import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton } from "@mui/material";
import DeleteButton from "../admin_pages/DeleteButton";
import EditIcon from "@mui/icons-material/Edit";

function MovieTable(props) {
    const { data, onEdit, onDelete } = props;

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Cast</TableCell>
                    <TableCell>Countries</TableCell>
                    <TableCell>Director</TableCell>
                    <TableCell>Genres</TableCell>
                    <TableCell>Rating</TableCell>
                    <TableCell>Languages</TableCell>
                    <TableCell>Subscription Type</TableCell>
                    <TableCell>Edit / Delete</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((user) => (
                    <TableRow key={user._id}>
                        <TableCell>{user.title}</TableCell>
                        <TableCell>{user.cast.join(', ')}</TableCell>
                        <TableCell>{user.countries.join(', ')}</TableCell>
                        <TableCell>{user.directors.join(', ')}</TableCell>
                        <TableCell>{user.genres.join(', ')}</TableCell>
                        <TableCell>{user.imdb.rating}</TableCell>
                        <TableCell>{user.languages.join(', ')}</TableCell>
                        <TableCell>{user.subscriptionType}</TableCell>
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

export default MovieTable;