import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 15,
    },
    paper: {
        paddingBottom: 20,
        paddingTop: 20,
        width: "100%",
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"

    },
    inputGrid: {
        padding: 10
    },
    btnGrid: {
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.down("sm")]: {
            padding: 10
        }
    },
    infoGrid: {
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    alert: {
        width: "100%"
    }
}));
export default useStyles;
