import { Button, Grid, Paper, TextField } from '@material-ui/core'
import { Alert, Autocomplete } from '@material-ui/lab'
import React, { useState, useEffect } from 'react'
import useStyles from './addRole.styles'

export default function AddRole({ getRoles, selectedRoleForEdit, setSelectedRoleForEdit }) {
    const classes = useStyles()
    const [permisions, setPermisions] = useState([])
    const [title, setTitle] = useState("")
    const [selectedPermisions, setSelectedPermisions] = useState([])
    useEffect(() => {
        if (selectedRoleForEdit._id == undefined) {
            setSelectedPermisions([])
            setTitle("")
        } else {
            setTitle(selectedRoleForEdit.title)
            setSelectedPermisions(selectedRoleForEdit.permisions)
        }
    }, [selectedRoleForEdit])
    useEffect(() => {
        getPermisions()
    }, [])
    const getPermisions = () => {
        var status
        fetch("http://localhost:8000/admin/permision", {
            method: "GET",
            headers: {
                "Authorization": localStorage.token
            }
        }).then(response => {
            status = response.status
            return response.json()
        }).then(responseJson => {
            console.log(status, responseJson);
            if (status === 200) {
                setPermisions(responseJson.data)
            }
        })
    }
    const addProccess = () => {
        var pIds = []
        selectedPermisions.forEach((sp) => {
            pIds.push(sp._id)
        })
        var status
        fetch("http://localhost:8000/admin/role", {
            method: "POST",
            headers: {
                "Authorization": localStorage.token,
                "content-type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                permisions: pIds
            })
        }).then(response => {
            status = response.status
            return response.json()
        }).then(responseJson => {
            console.log(status, responseJson);
            if (status === 200) {
                setTitle("")
                setSelectedPermisions([])
                getRoles()
            }
        })
    }
    const editProccess = () => {
        var pIds = []
        selectedPermisions.forEach((sp) => {
            pIds.push(sp._id)
        })
        var status
        fetch("http://localhost:8000/admin/role", {
            method: "PUT",
            headers: {
                "Authorization": localStorage.token,
                "content-type": "application/json"
            },
            body: JSON.stringify({
                _id: selectedRoleForEdit._id,
                title: title,
                permisions: pIds
            })
        }).then(response => {
            status = response.status
            return response.json()
        }).then(responseJson => {
            console.log(status, responseJson);
            if (status === 200) {
                setSelectedRoleForEdit({})
                getRoles()
            }
        })
    }
    return (
        <Grid container className={classes.root} >
            <Paper className={classes.paper} >
                {selectedRoleForEdit._id == undefined ? null : (
                    <Grid container alignItems="center" className={classes.infoGrid}  >
                        <Alert className={classes.alert} severity="info" closeText="Cancel" onClose={() => { setSelectedRoleForEdit({}) }} >
                            Edit {selectedRoleForEdit.title}
                        </Alert>
                    </Grid>
                )}
                <Grid container>
                    <Grid item md={4} xs={12} className={classes.inputGrid} >
                        <TextField
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            variant="outlined" size="small" fullWidth label="title" />
                    </Grid>
                    <Grid item lg={7} md={6} xs={12} className={classes.inputGrid} >
                        <Autocomplete
                            onChange={(e, value) => {
                                setSelectedPermisions(value)
                            }}
                            value={selectedPermisions}
                            multiple
                            getOptionLabel={(option) => option.title}
                            options={permisions}
                            renderInput={(params) => (
                                <TextField {...params} variant="outlined" size="small" label="select permision" placeholder="permisions" />
                            )}
                        />
                    </Grid>
                    <Grid item lg={1} md={2} xs={12} className={classes.btnGrid} >
                        <Button fullWidth={window.innerWidth < 900} onClick={selectedRoleForEdit._id == undefined ? addProccess : editProccess} variant="contained" size="small" color="primary">
                            {selectedRoleForEdit._id == undefined ? "add role" : "edit role"}
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}



