import { Button, Grid, IconButton, Paper, Popover, Typography } from '@material-ui/core'
import React, { useState, useRef } from 'react'
import useStyles from './item.styles'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

export default function Item({ item, getRoles, setSelectedRoleForEdit }) {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const deleteProccess = () => {
        var status
        fetch("http://localhost:8000/admin/role?_id=" + item._id, {
            method: "DELETE",
            headers: {
                "Authorization": localStorage.token
            }
        }).then(response => {
            status = response.status
            return response.json()
        }).then(responseJson => {
            if (status === 200) {
                setOpen(false)
                getRoles()
            }
        })
    }

    return (
        <Grid lg={3} sm={6} xs={12} className={classes.root} >
            <Paper className={classes.paper} >
                <Typography variant="h5">
                    {item.title}
                </Typography>
                <IconButton onClick={(e) => { setSelectedRoleForEdit(item) }} color="secondary" size="small" className={classes.editIcon} >
                    <EditIcon />
                </IconButton>
                <IconButton onClick={(e) => { setAnchorEl(e.currentTarget); setOpen(true) }} color="secondary" size="small" className={classes.deleteIcon} >
                    <DeleteIcon />
                </IconButton>
                <Popover
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={open} onClose={() => setOpen(false)} >
                    <Grid container direction="column" className={classes.popoverGrid} >
                        <Typography variant="h6">
                            Are use Sure?
                        </Typography>
                        <Grid container direction="row" className={classes.popoverGridBtns} >
                            <Button variant="text" color="secondary" size="small" onClick={deleteProccess} >Ok</Button>
                            <Button variant="text" color="primary" size="small" onClick={() => setOpen(false)} >cancel</Button>
                        </Grid>
                    </Grid>
                </Popover>
            </Paper>
        </Grid>
    )
}
