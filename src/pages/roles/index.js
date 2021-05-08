import { Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Item from "./Item";
import AddRole from './AddRole'

export default function Index() {
  const [data, setData] = useState([])
  const [selectedRoleForEdit, setSelectedRoleForEdit] = useState({})
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
    <Grid container>
      <AddRole selectedRoleForEdit={selectedRoleForEdit} setSelectedRoleForEdit={setSelectedRoleForEdit} getRoles={getRoles} />
      {data.map((item) => {
        return <Item setSelectedRoleForEdit={setSelectedRoleForEdit} getRoles={getRoles} item={item} />
      })}
    </Grid>
  );
}
