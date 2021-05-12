import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import useStyles from "./index.styles";
import { Checkbox, CircularProgress, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Modal, Select, TextField, Tooltip, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import roleIcon from "../../assets/images/role.svg";
import adminIcon from "../../assets/images/admin.svg";
import userIcon from "../../assets/images/user.svg";
import { Pagination, Skeleton } from "@material-ui/lab";
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import moment from 'moment'
import RoleModal from "./RoleModal";

export default function Users() {

  // // console.log("MOMENT");
  // var date = "2021-04-15T15:11:20.173+00:00"
  // // var fd = moment(date).format("MMMM Do YYYY")
  // // console.log(fd);
  // // var ft = moment(date, "YYYY-MM-DDTHH:mm:ss.140Z").format("HH:mm:ss a")
  // // console.log(ft);
  // // console.log(moment().format('hh:mm:ss a'));
  // // console.log(moment().format('hh:mm:ss a'));
  // // console.log(moment().diff(moment(date, "YYYY-MM-DDTHH:mm:ss.140Z"), "days"));
  // console.log(moment().add(3, "days").format("MMMM Do YYYY"));

  const classes = useStyles();
  const [data, setData] = useState([]);
  const [pagesCount, setPagesCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [sortField, setSortFiled] = useState("createdAt")
  const [sortType, setSortType] = useState(1)
  const [page, setPage] = useState(1)
  const [roleModalOpen, setRoleModalOpen] = useState(false)
  const [selectedUserForRole, setSelectedUserForRole] = useState({})
  const [name, setName] = useState("")
  const [family, setFamily] = useState("")
  const [email, setEmail] = useState("")

  const [isAdmin, setIsAdmin] = useState("")


  useEffect(() => {
    getUsers()
  }, [sortField, sortType, page, name, family, email, isAdmin])

  const getUsers = () => {
    setLoading(true)
    setData([])
    var status;
    fetch("http://localhost:8000/admin/users?page=" + page + "&sortField=" + sortField + "&sortType=" + sortType
      + "&name=" + name + "&family=" + family + "&email=" + email + "&isAdmin=" + isAdmin
      , {
        method: "GET",
        headers: {
          Authorization: localStorage.token,
        },
      })
      .then((response) => {
        status = response.status;
        return response.json();
      })
      .then((responseJson) => {
        if (status === 200) {
          setData(responseJson.data);
          setPagesCount(responseJson.pagesCount)
        }
        setLoading(false)
      });
  };

  const DeleteUser = (_id) => {
    var status;
    fetch("http://localhost:8000/admin/users?_id=" + _id, {
      method: "Delete",
      headers: {
        Authorization: localStorage.token,
      },
    })
      .then((response) => {
        status = response.status;
        return response.json();
      })
      .then((responseJson) => {
        if (status === 200) {
          getUsers(1);
        }
      });
  };

  const ToggleAdmin = (_id) => {
    var status;
    fetch("http://localhost:8000/admin/users/toggle-admin?_id=" + _id, {
      method: "PUT",
      headers: {
        Authorization: localStorage.token,
      },
    })
      .then((response) => {
        status = response.status;
        return response.json();
      })
      .then((responseJson) => {
        console.log(status, responseJson);
        if (status === 200) {
          getUsers(1);
        }
      });
  };

  const renderValue = (value) => {
    switch (value) {
      case 0:
        return (
          <Typography variant="h6">
            Name ASC
          </Typography>
        )
      case 1:
        return (
          <Typography variant="h6">
            Name DESC
          </Typography>
        )
      case 2:
        return (
          <Typography variant="h6">
            Family ASC
          </Typography>
        )
      case 3:
        return (
          <Typography variant="h6">
            Family DESC
          </Typography>
        )
      case 4:
        return (
          <Typography variant="h6">
            Email ASC
          </Typography>
        )
      case 5:
        return (
          <Typography variant="h6">
            Email DESC
          </Typography>
        )

      default:
        break;
    }
  }

  return (
    <>
      <Paper className={classes.SearchDiv}>
        <Grid container justify="center" alignItems="center"  >
          <Grid item lg={3} xs={12} className={classes.searchGrid} >
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined" size="small" label="Search Name" fullWidth />
          </Grid>
          <Grid item lg={3} xs={12} className={classes.searchGrid} >
            <TextField
              value={family}
              onChange={(e) => setFamily(e.target.value)}
              variant="outlined" size="small" label="Search Family" fullWidth />
          </Grid>
          <Grid item lg={3} xs={12} className={classes.searchGrid} >
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined" size="small" label="Search Email" fullWidth />
          </Grid>
          <Grid item lg={2} xs={12} className={classes.searchGrid} >
            <FormControlLabel
              control={
                <Checkbox
                  checked={isAdmin}
                  onChange={(e) => {
                    setIsAdmin(e.target.checked)
                  }}
                  name="isAdmin"
                  color="primary"
                />
              }
              label="isAdmin"
            />
          </Grid>
        </Grid>
      </Paper>

      <div className={classes.sordDiv}  >
        <FormControl variant="outlined" size="small" className={classes.formControl}>
          <InputLabel htmlFor="age-native-simple">Sort By: </InputLabel>
          <Select
            renderValue={renderValue}
            onChange={(e) => {
              switch (e.target.value) {
                case 0:
                  setSortFiled("firstName")
                  setSortType(1)
                  break;
                case 1:
                  setSortFiled("firstName")
                  setSortType(-1)
                  break;
                case 2:
                  setSortFiled("lastName")
                  setSortType(1)
                  break;
                case 3:
                  setSortFiled("lastName")
                  setSortType(-1)
                  break;
                case 4:
                  setSortFiled("email")
                  setSortType(1)
                  break;
                case 5:
                  setSortFiled("email")
                  setSortType(-1)
                  break;

                default:
                  break;
              }
            }} >
            <MenuItem value={0}>
              <>
                <Typography variant="h6">
                  Name
                </Typography>
                <ArrowUpward className={classes.sortIcon} fontSize="small" />
              </>
            </MenuItem>
            <MenuItem value={1}>
              <>
                <Typography variant="h6">
                  Name
                </Typography>
                <ArrowDownward className={classes.sortIcon} fontSize="small" />
              </>
            </MenuItem>
            <MenuItem value={2}>
              <>
                <Typography variant="h6">
                  Family
                </Typography>
                <ArrowUpward className={classes.sortIcon} fontSize="small" />
              </>
            </MenuItem>
            <MenuItem value={3}>
              <>
                <Typography variant="h6">
                  Family
                </Typography>
                <ArrowDownward className={classes.sortIcon} fontSize="small" />
              </>
            </MenuItem>
            <MenuItem value={4}>
              <>
                <Typography variant="h6">
                  Email
                </Typography>
                <ArrowUpward className={classes.sortIcon} fontSize="small" />
              </>
            </MenuItem>
            <MenuItem value={5}>
              <>
                <Typography variant="h6">
                  Email
                </Typography>
                <ArrowDownward className={classes.sortIcon} fontSize="small" />
              </>
            </MenuItem>
          </Select>
        </FormControl>
      </div>

      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>
                <div className={classes.TabelHeader} onClick={() => {
                  setSortFiled("firstName")
                  setSortType(sortType === 1 ? -1 : 1)
                }} >
                  <Typography variant="h6">Name</Typography>
                  {sortType === 1 ? (
                    <ArrowUpward color={sortField === "firstName" ? "primary" : "disabled"} fontSize="small" className={classes.sortIcon} />
                  ) : (
                    <ArrowDownward color={sortField === "firstName" ? "primary" : "disabled"} fontSize="small" className={classes.sortIcon} />
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className={classes.TabelHeader} onClick={() => {
                  setSortFiled("lastName")
                  setSortType(sortType === 1 ? -1 : 1)
                }} >
                  <Typography variant="h6">Family</Typography>
                  {sortType === 1 ? (
                    <ArrowUpward color={sortField === "lastName" ? "primary" : "disabled"} fontSize="small" className={classes.sortIcon} />
                  ) : (
                    <ArrowDownward color={sortField === "lastName" ? "primary" : "disabled"} fontSize="small" className={classes.sortIcon} />
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className={classes.TabelHeader} onClick={() => {
                  setSortFiled("email")
                  setSortType(sortType === 1 ? -1 : 1)
                }} >
                  <Typography variant="h6">Email</Typography>
                  {sortType === 1 ? (
                    <ArrowUpward color={sortField === "email" ? "primary" : "disabled"} fontSize="small" className={classes.sortIcon} />
                  ) : (
                    <ArrowDownward color={sortField === "email" ? "primary" : "disabled"} fontSize="small" className={classes.sortIcon} />
                  )}
                </div>
              </TableCell>
              <TableCell>Register Date</TableCell>
              <TableCell>status</TableCell>
              <TableCell>role</TableCell>
              <TableCell>actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {loading ? (
              <TableRow  >
                <TableCell colSpan={6} align="center" className={classes.loadingDiv} >
                  <CircularProgress color="secondary" />
                </TableCell>
              </TableRow>
            ) : (null)}

            {data.map((user, index) => {
              return (
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell> {user.lastName} </TableCell>
                  <TableCell> {user.email} </TableCell>
                  <TableCell> {moment(user.createdAt, "YYYY-MM-DDTHH:mm:ss.140Z").format("MMMM Do YYYY")} </TableCell>
                  <TableCell> {user.isAdmin ? "admin" : "user"} </TableCell>
                  <TableCell> {user.isAdmin ? "Super Admin" : user.role ? user.role.title : "not role"} </TableCell>
                  <TableCell>
                    <Tooltip title="Delete User">
                      <IconButton onClick={() => DeleteUser(user._id)}>
                        <DeleteIcon fontSize="small" color="secondary" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="toggle user to admin">
                      <IconButton onClick={() => ToggleAdmin(user._id)}>
                        <img
                          src={user.isAdmin ? adminIcon : userIcon}
                          alt=""
                          className={classes.actionIcon}
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="add role to user">
                      <IconButton onClick={() => {
                        setSelectedUserForRole(user)
                        setRoleModalOpen(true)
                      }
                      }>
                        <img
                          src={roleIcon}
                          alt=""
                          className={classes.actionIcon}
                        />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>

        </Table>
      </TableContainer>

      <div className={classes.paginationDiv} >
        {pagesCount > 1 ? (
          <Pagination
            onChange={(e, page) => {
              setPage(page)
            }}
            color="secondary" variant="outlined" count={pagesCount} />
        ) : null}
      </div>
      <Modal open={roleModalOpen} onClose={() => setRoleModalOpen(false)} >
        <RoleModal selectedUserForRole={selectedUserForRole} setRoleModalOpen={setRoleModalOpen} getUsers={getUsers} />
      </Modal>
    </>
  );
}
