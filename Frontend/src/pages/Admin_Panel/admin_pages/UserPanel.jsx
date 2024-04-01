import axios from "axios";
import React from "react";
import { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TableContainer, Paper } from "@mui/material";
import { Add } from "@mui/icons-material";
import UserTable from "./UserTable";
import EditForm from "./EditForm";
import { BACKEND_URL } from "../../../constants";
import { Link } from "react-router-dom";
const baseURL = BACKEND_URL;

export default function UserPanel() {
    // users are stored in post variable
    const [post, setPost] = React.useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null); // TODO: [selectedUser, setSelectedUser
    const [formData, setFormData] = useState({ name: "", email: "", password: "", mobileNumber: "", devicesLogged: "", lastPayment: "" });

    const handleFormChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });
    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (selectedUser) {
            axios.patch(`${baseURL}/users/${selectedUser._id}/`, formData).then((res) => {
                setDialogOpen(false);
            }).catch((err) => {
                console.log(err);
            })
        }
        else {
            axios.post(`${baseURL}/users`, formData).then((res) => {
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
        axios.delete(`${baseURL}/users/${id}`).then((res) => {
            alert("user deleted")
        }).catch((err) => {
            console.log(err);
        })
    };

    React.useEffect(() => {
        axios.get(`${baseURL}/users`).then((response) => {
            setPost(response.data);
        });
    }, []);

    if (!post) return null;

    return (
        <>
            <div style={{display:'flex', justifyContent:'center'}}>
                <Button variant="outlined" > <Link to='/admin-panel/moviepanel'> MoviePanel </Link> </Button>
                <Button variant="contained">UserPanel</Button>
            </div>
            <div>
                <Button onClick={() => { setFormData({ username: "", email: "", password: "", mobileNumber: "", devicesLogged: "", lastPayment: "" }); setSelectedUser(null); setDialogOpen(true) }}>
                    <Add /> Add User
                </Button>
                <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                    <DialogTitle>Add/Edit User</DialogTitle>
                    <DialogContent>
                        <EditForm formData={formData} onChange={handleFormChange} onSubmit={handleFormSubmit} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                        <Button type="submit" onClick={handleFormSubmit} color="primary">Save</Button>
                    </DialogActions>
                </Dialog>
                <TableContainer component={Paper}>
                    <UserTable data={post} onEdit={handleEdit} onDelete={handleDelete} />
                </TableContainer>
            </div>
        </>
    );
}
