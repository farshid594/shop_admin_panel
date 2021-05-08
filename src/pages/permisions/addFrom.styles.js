import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: 25,
        padding: 30
    },
    checkboxesGrid: {
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
        [theme.breakpoints.down("sm")]: {
            marginTop: 10
        }
    },
    modalMaginToip: {
        marginTop: 15
    },
    grid: {
        [theme.breakpoints.down("sm")]: {
            marginTop: 10
        }
    }
}));
export default useStyles;
