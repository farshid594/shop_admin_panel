import { List, ListItem, ListItemText, Paper } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import useStyles from './roleModal.styles'

export default function RoleModal({ selectedUserForRole, setRoleModalOpen, getUsers }) {
    const classes = useStyles()
    const [data, setData] = useState([])
    useEffect(() => {
        getRoles()
    }, [])
    const getRoles = () => {
        var status
        fetch("http://localhost:8000/admin/role", {
            method: "GET",
            headers: {
                "Authorization": localStorage.token
            }
        }).then(response => {
            status = response.status
            return response.json()
        }).then(responseJson => {
            if (status === 200) {
                setData(responseJson.data)
            }
        })
    }
    return (
        <Paper className={classes.root} >
            <List>
                {data.map((item) => {
                    return (
                        <ListItem button onClick={() => {
                            var status;
                            fetch("http://localhost:8000/admin/users/add-role",
                                {
                                    method: "PUT",
                                    headers: {
                                        Authorization: localStorage.token,
                                        "content-type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        roleID: item._id,
                                        userID: selectedUserForRole._id
                                    })
                                })
                                .then((response) => {
                                    status = response.status;
                                    return response.json();
                                })
                                .then((responseJson) => {
                                    if (status === 200) {
                                        setRoleModalOpen(false)
                                        getUsers()
                                    }
                                });
                        }} >
                            <ListItemText primary={item.title} />
                        </ListItem>
                    )
                })}
            </List>
        </Paper>
    )
}
