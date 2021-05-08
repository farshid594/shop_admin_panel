import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 15,
    },
    paper: {
        height: 120,
        display: 'flex',
        justifyContent: "center",
        alignItems: "center", position: 'relative'

    },
    deleteIcon: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        opacity: .5,
        "&:hover": {
            opacity: 1
        }
    },
    editIcon: {
        position: 'absolute',
        right: 40,
        bottom: 10,
        opacity: .5,
        "&:hover": {
            opacity: 1
        }
    },
    popoverGrid: {
        padding: 15
    },
    popoverGridBtns: {
        marginTop: 10
    }
}));
export default useStyles;
