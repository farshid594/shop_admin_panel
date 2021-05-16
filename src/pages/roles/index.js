import { Button, Grid, LinearProgress, Snackbar } from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import Item from "./Item";
import AddRole from './AddRole'
import { AlertContext } from '../../components/Alert/AlertContext'

export default function Index() {
  let { showELS } = useContext(AlertContext)
  const [data, setData] = useState([])
  const [selectedRoleForEdit, setSelectedRoleForEdit] = useState({})
  useEffect(() => {
    getRoles()
  }, [])
  const getRoles = () => {
    showELS("loading")
    setTimeout(() => {
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
          showELS("success", responseJson.message)
          setData(responseJson.data)
        } else {
          showELS("error", responseJson.message)
        }
      })
    }, 3000)
  }
  return (
    <Grid container>
      <AddRole selectedRoleForEdit={selectedRoleForEdit} setSelectedRoleForEdit={setSelectedRoleForEdit} getRoles={getRoles} />
      {data.map((item) => {
        return <Item setSelectedRoleForEdit={setSelectedRoleForEdit} getRoles={getRoles} item={item} />
      })}
    </Grid>
  );
}
