import React from "react";
import { TextField } from "@mui/material";

function EditForm(props) {
    const { formData, onChange, onSubmit } = props;

    return (
        <form onSubmit={onSubmit}>
            <TextField
                label="username"
                variant="outlined"
                margin="normal"
                name="username"
                value={formData.username}
                onChange={onChange}
                fullWidth
                required
            />
            <TextField
                label="email"
                variant="outlined"
                margin="normal"
                name="email"
                value={formData.email}
                onChange={onChange}
                fullWidth
                required
            />
            <TextField
                label="Password"
                variant="outlined"
                margin="normal"
                name="password"
                value={formData.password}
                onChange={onChange}
                fullWidth
                required
                type="password"
            />
            <TextField
                label="mobileNumber"
                variant="outlined"
                margin="normal"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={onChange}
                fullWidth
                required
                type="number"
            />
            <TextField
                label="devicesLogged"
                variant="outlined"
                margin="normal"
                name="devicesLogged"
                value={formData.devicesLogged}
                onChange={onChange}
                fullWidth
                required
                type="number"
            />
            <TextField
                label="lastPayment"
                variant="outlined"
                margin="normal"
                name="lastPayment"
                value={formData.lastPayment}
                onChange={onChange}
                fullWidth
                required
                type="date"
            />
            {/* <FormControl variant="outlined" margin="normal" fullWidth required>
                <InputLabel>Role</InputLabel>
                <Select
                    name="role"
                    value={formData.role}
                    onChange={onChange}
                    label="Role"
                >
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="superadmin">Super Admin</MenuItem>
                </Select>
            </FormControl> */}
        </form>
    );
}

export default EditForm;