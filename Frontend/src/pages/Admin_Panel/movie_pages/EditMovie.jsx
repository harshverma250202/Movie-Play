import React from "react";
import { TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function EditMovie(props) {
    const { formData, onChange, onSubmit } = props;

    return (
        <form onSubmit={onSubmit}>
            <TextField
                label="Title"
                variant="outlined"
                margin="normal"
                name="title"
                value={formData.title}
                onChange={onChange}
                fullWidth
                required
                type="text"
            />
            <TextField
                label="Cast"
                variant="outlined"
                margin="normal"
                name="cast"
                value={formData.cast}
                onChange={onChange}
                fullWidth
                required
                type="text"
            />
            <TextField
                label="Countries"
                variant="outlined"
                margin="normal"
                name="countries"
                value={formData.countries}
                onChange={onChange}
                fullWidth
                required
                type="text"
            />
            <TextField
                label="Director"
                variant="outlined"
                margin="normal"
                name="directors"
                value={formData.directors}
                onChange={onChange}
                fullWidth
                required
                type="text"
            />
            <TextField
                label="Genres"
                variant="outlined"
                margin="normal"
                name="genres"
                value={formData.genres}
                onChange={onChange}
                fullWidth
                required
                type="text"
            />
            <TextField
                label="Rating"
                variant="outlined"
                margin="normal"
                name="rating"
                value={formData.imdb.rating}
                onChange={onChange}
                fullWidth
                required
                type="number"
            />
            <TextField
                label="Languages"
                variant="outlined"
                margin="normal"
                name="languages"
                value={formData.languages}
                onChange={onChange}
                fullWidth
                required
                type="text"
            />
            <TextField
                label="Subscription type"
                variant="outlined"
                margin="normal"
                name="subscritionType"
                value={formData.subscritionType}
                onChange={onChange}
                fullWidth
                required
                type="text"
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

export default EditMovie;