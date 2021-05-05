import { Checkbox, FormControlLabel, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import useStyles from './index.styles'
import AddForm from "./AddForm";
import PermisionItem from "./PermisionItem";
import AddIcon from '@material-ui/icons/Add'

export default function Index() {
  const classes = useStyles()
  const [data, setData] = useState([])
  const [modelOpen, setModalOpen] = useState(false)
  const [selectedItemForEdit, setSelectedItemForEdit] = useState({})
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
        setData(responseJson.data)
      }
    })
  }
  return (
    <>
      <AddForm setModalOpen={setModalOpen} isModal={false} selectedItemForEdit={selectedItemForEdit} getPermisions={getPermisions} setSelectedItemForEdit={setSelectedItemForEdit} />
      <TableContainer component={Paper} >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>title</TableCell>
              <TableCell>methods</TableCell>
              <TableCell>actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => {
              return (
                <PermisionItem setModalOpen={setModalOpen} index={index} item={item} setSelectedItemForEdit={setSelectedItemForEdit} selectedItemForEdit={selectedItemForEdit} getPermisions={getPermisions} />
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal className={classes.modalOpen} open={modelOpen} onClose={() => setModalOpen(false)} >
        <AddForm setModalOpen={setModalOpen} isModal={true} selectedItemForEdit={selectedItemForEdit} getPermisions={getPermisions} setSelectedItemForEdit={setSelectedItemForEdit} />
      </Modal>
      <IconButton onClick={() => setModalOpen(true)} className={classes.addIconButton0} color="secondary" size="medium" >
        <AddIcon />
      </IconButton>
    </>
  );
}
