import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 15,
    },
    paper: {
        height: 120,
        width: "100%",
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",

    },
    inputGrid: {
        padding: 10
    },
    btnGrid: {
        display: 'flex',
        justifyContent: "center",
        alignItems: "center"
    }
}));
export default useStyles;
