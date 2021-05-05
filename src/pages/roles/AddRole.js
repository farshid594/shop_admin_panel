import { Button, Grid, Paper, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import React, { useState, useEffect } from 'react'
import useStyles from './addRole.styles'

export default function AddRole({ getRoles }) {
    const classes = useStyles()
    const [permisions, setPermisions] = useState([])
    const [title, setTitle] = useState("")
    const [selectedPermisions, setSelectedPermisions] = useState([])

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
                getRoles()
            }
        })
    }
    return (
        <Grid container className={classes.root} >
            <Paper className={classes.paper} >
                <Grid container>
                    <Grid item lg={4} className={classes.inputGrid} >
                        <TextField
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            variant="outlined" size="small" fullWidth label="title" />
                    </Grid>
                    <Grid item lg={7} className={classes.inputGrid} >
                        <Autocomplete
                            onChange={(e, value) => {
                                setSelectedPermisions(value)
                            }}
                            multiple
                            getOptionLabel={(option) => option.title}
                            options={permisions}
                            renderInput={(params) => (
                                <TextField {...params} variant="outlined" size="small" label="select permision" placeholder="permisions" />
                            )}
                        />
                    </Grid>
                    <Grid item lg={1} className={classes.btnGrid} >
                        <Button onClick={addProccess} variant="contained" size="small" color="primary">
                            add role
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}



