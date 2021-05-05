import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    modalOpen: {
        display: 'flex', justifyContent: "center", alignItems: "center"
    },
    addIconButton0: {
        backgroundColor: theme.palette.primary.main,
        position: "absolute",
        bottom: 15,
        right: 15
    }
}));
export default useStyles;
