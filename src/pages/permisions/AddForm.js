import { Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, TextField, Tooltip } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import useStyles from './addFrom.styles'

export default function AddForm({ getPermisions, selectedItemForEdit, setSelectedItemForEdit, isModal, setModalOpen }) {
    const classes = useStyles()
    const [title, setTitle] = useState("")
    const [path, setPath] = useState("")
    const [method, setMethod] = useState([])
    const AddProccess = () => {
        var status
        fetch("http://localhost:8000/admin/permision", {
            method: "POST",
            headers: {
                "Authorization": localStorage.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                path: path,
                method: method,
            })
        }).then(response => {
            status = response.status
            return response.json()
        }).then(responseJson => {
            console.log(status, responseJson);
            if (status === 200) {
                getPermisions()
                setTitle("")
                setPath("")
                setMethod([])
                setModalOpen(false)
            }
        })
    }
    const EditProccess = () => {
        var status
        fetch("http://localhost:8000/admin/permision", {
            method: "PUT",
            headers: {
                "Authorization": localStorage.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                path: path,
                method: method,
                _id: selectedItemForEdit._id
            })
        }).then(response => {
            status = response.status
            return response.json()
        }).then(responseJson => {
            console.log(status, responseJson);
            if (status === 200) {
                getPermisions()
                setTitle("")
                setPath("")
                setMethod([])
                setSelectedItemForEdit({})
                setModalOpen(false)

            }
        })
    }
    useEffect(() => {
        if (selectedItemForEdit._id !== undefined) {
            setTitle(selectedItemForEdit.title)
            setPath(selectedItemForEdit.path)
            setMethod(selectedItemForEdit.method)
        } else {
            setTitle("")
            setPath("")
            setMethod([])
        }
    }, [selectedItemForEdit])
    return (
        <Paper style={{ width: isModal ? 400 : "auto" }} className={classes.root} >
            <Grid container>
                <Grid item lg={isModal ? 12 : 3} style={{ marginTop: isModal ? 15 : 0 }}>
                    <TextField
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                        fullWidth size="small" variant="outlined" label="title" />
                </Grid>
                <Grid item lg={isModal ? 12 : 5} className={classes.checkboxesGrid} style={{ marginTop: isModal ? 15 : 0 }} >
                    <Tooltip title="Create" >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setMethod([...method, "POST"])
                                        } else {
                                            setMethod(method.filter((m) => {
                                                if (m === "POST") {
                                                    return false
                                                }
                                                return true
                                            }))
                                        }
                                    }}
                                    checked={method.includes("POST")}
                                    name="create"
                                    color="primary"
                                />
                            }
                            label="C"
                        />
                    </Tooltip>
                    <Tooltip title="Read" >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setMethod([...method, "GET"])
                                        } else {
                                            setMethod(method.filter((m) => {
                                                if (m === "GET") {
                                                    return false
                                                }
                                                return true
                                            }))
                                        }
                                    }}
                                    checked={method.includes("GET")}
                                    name="read"
                                    color="primary"
                                />
                            }
                            label="R"
                        />
                    </Tooltip>
                    <Tooltip title="Update" >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setMethod([...method, "PUT"])
                                        } else {
                                            setMethod(method.filter((m) => {
                                                if (m === "PUT") {
                                                    return false
                                                }
                                                return true
                                            }))
                                        }
                                    }}
                                    checked={method.includes("PUT")}
                                    name="update"
                                    color="primary"
                                />
                            }
                            label="U"
                        />
                    </Tooltip>
                    <Tooltip title="Delete" >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setMethod([...method, "DELETE"])
                                        } else {
                                            setMethod(method.filter((m) => {
                                                if (m === "DELETE") {
                                                    return false
                                                }
                                                return true
                                            }))
                                        }
                                    }}
                                    checked={method.includes("DELETE")}
                                    name="delete"
                                    color="primary"
                                />
                            }
                            label="D"
                        />
                    </Tooltip>

                </Grid>
                <Grid item lg={isModal ? 12 : 3} style={{ marginTop: isModal ? 15 : 0 }}>
                    <FormControl size="small" variant="outlined" fullWidth>
                        <InputLabel>Path</InputLabel>
                        <Select
                            onChange={(e) => {
                                setPath(e.target.value);
                            }}
                            value={path}
                            label="Path"
                        >
                            <MenuItem value="/post">post</MenuItem>
                            <MenuItem value="/product">product</MenuItem>
                            <MenuItem value="/discount">discount</MenuItem>
                            <MenuItem value="/user">user</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item lg={isModal ? 12 : 1} style={{ marginTop: isModal ? 15 : 0 }} container justify="center" alignItems="center" >
                    <Button onClick={selectedItemForEdit._id == undefined ? AddProccess : EditProccess}
                        fullWidth={isModal}
                        variant="contained" size="small" color="primary"   >
                        {selectedItemForEdit._id == undefined ? "Add" : "Edit"}
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    )
}

