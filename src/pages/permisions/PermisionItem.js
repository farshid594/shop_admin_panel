import { Checkbox, FormControlLabel, IconButton, TableCell, TableRow, Tooltip } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";

export default function PermisionItem({ item, index, getPermisions, setSelectedItemForEdit, selectedItemForEdit, setModalOpen }) {
    const [title, setTitle] = useState(item.title)
    const [method, setMethod] = useState(item.method)
    useEffect(() => {
        setMethod(item.method)
    }, [item])
    const deleteProccess = () => {
        var status
        fetch("http://localhost:8000/admin/permision?_id=" + item._id, {
            method: "DELETE",
            headers: {
                "Authorization": localStorage.token
            }
        }).then(response => {
            status = response.status
            return response.json()
        }).then(responseJson => {
            console.log(status, responseJson);
            if (status === 200) {
                getPermisions()
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
                path: item.path,
                method: method,
                _id: selectedItemForEdit._id
            })
        }).then(response => {
            status = response.status
            return response.json()
        }).then(responseJson => {
            if (status === 200) {
                getPermisions()
                setSelectedItemForEdit({})
            }
        })
    }
    return (
        <TableRow>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
                {selectedItemForEdit._id === item._id ? (
                    <input value={title} onChange={(e) => setTitle(e.target.value)} />
                ) : (
                    item.title
                )}
            </TableCell>
            <TableCell>
                <Tooltip title="Create" >
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={method.includes("POST")}
                                onChange={(e) => {
                                    if (selectedItemForEdit._id === item._id) {
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
                                    }
                                }}
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
                                checked={method.includes("GET")}
                                onChange={(e) => {
                                    if (selectedItemForEdit._id === item._id) {
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
                                    }
                                }}
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
                                checked={method.includes("PUT")}
                                onChange={(e) => {
                                    if (selectedItemForEdit._id === item._id) {
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
                                    }
                                }}
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
                                checked={method.includes("DELETE")}
                                onChange={(e) => {
                                    if (selectedItemForEdit._id === item._id) {
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
                                    }
                                }}
                                name="delete"
                                color="primary"
                            />
                        }
                        label="D"
                    />
                </Tooltip>

            </TableCell>
            <TableCell>
                {selectedItemForEdit._id === item._id ? (
                    <IconButton onClick={EditProccess} >
                        <CheckIcon fontSize="small" color="secondary" />
                    </IconButton>
                ) : (
                    <>
                        <Tooltip title="Delete Permision" >
                            <IconButton onClick={deleteProccess} >
                                <DeleteIcon fontSize="small" color="secondary" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Permision" >
                            <IconButton onClick={() => {
                                setSelectedItemForEdit(item)
                                setModalOpen(true)
                            }} >
                                <EditIcon fontSize="small" color="secondary" />
                            </IconButton>
                        </Tooltip>
                    </>
                )}

            </TableCell>
        </TableRow>

    )
}
