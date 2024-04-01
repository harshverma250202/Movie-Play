import axios from "axios";
import React from "react";
import { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TableContainer, Paper } from "@mui/material";
import { Add } from "@mui/icons-material";
import MovieTable from "./MovieTable";
import EditMovie from "./EditMovie";
import { BACKEND_URL } from "../../../constants";
import { Link } from "react-router-dom";
const baseURL = BACKEND_URL;

export default function MoviePanel() {
    const [post, setPost] = React.useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null); // TODO: [selectedUser, setSelectedUser]
    const [formData, setFormData] = useState({ title: "", Cast: "", countries: "", Director: "", Genres: "", rating: "", languages: "", subscritionType: "" });

    const handleFormChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });
    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (selectedUser) {
            axios.patch(`${baseURL}/movies/${selectedUser._id}/`, formData).then((res) => {
                setDialogOpen(false);
            }).catch((err) => {
                console.log(err);
            })
        }
        else {
            axios.post(`${baseURL}/movies`, formData).then((res) => {
                setDialogOpen(false);
            }).catch((err) => {
                console.log(err);
            })
        }
    };

    const handleEdit = (place) => {
        setFormData(place);
        setSelectedUser(place);
        setDialogOpen(true);
    };

    const handleDelete = (id) => {
        axios.delete(`${baseURL}/movies/${id}`).then((res) => {
            alert("Movie deleted")
        }).catch((err) => {
            console.log(err);
        })
    };

    React.useEffect(() => {
        axios.get(`${baseURL}/movies`).then((response) => {
            setPost(response.data);
        });
    }, []);

    if (!post) return null;

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', padding:'10px 0', gap:'10px'}} >
                <Button variant="contained" > MoviePanel </Button>
                <Button variant="outlined" > <Link to='/admin-panel/userpanel'> UserPanel </Link></Button>
            </div>
            <div>
                <Button onClick={() => { setFormData({ title: "", Cast: "", countries: "", Director: "", Genres: "", rating: "", languages: "", subscritionType: "" }); setSelectedUser(null); setDialogOpen(true) }}>
                    <Add /> Add Movie
                </Button>
                <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                    <DialogTitle>Add/Edit Movie</DialogTitle>
                    <DialogContent>
                        <EditMovie formData={formData} onChange={handleFormChange} onSubmit={handleFormSubmit} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                        <Button type="submit" onClick={handleFormSubmit} color="primary">Save</Button>
                    </DialogActions>
                </Dialog>
                <TableContainer component={Paper}>
                    <MovieTable data={post} onEdit={handleEdit} onDelete={handleDelete} />
                </TableContainer>
            </div>
        </>
    );
}
