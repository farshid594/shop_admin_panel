import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    // minWidth: 650,
  },
  actionIcon: {
    width: 16,
  },
  paginationDiv: {
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25
  },
  loadingDiv: {
    height: 80,
  },
  sordDiv: {
    marginBottom: 25
  },
  SearchDiv: {
    marginBottom: 25,
    padding: 15,
  },
  formControl: {
    width: 250
  },
  sortIcon: {
    marginLeft: 10
  },
  TabelHeader: {
    display: 'flex',
    cursor: 'pointer'
  },
  searchGrid: {
    margin: 5
  }
});
export default useStyles;
