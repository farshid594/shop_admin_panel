import { LinearProgress, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React, { useContext } from 'react'
import { AlertContext } from './AlertContext'


export default function Index() {
    let { error, loading, success, message, showELS } = useContext(AlertContext)
    return (
        <>
            {loading ? <LinearProgress color="secondary" style={{ width: "100%", top: 65, position: 'absolute' }} /> : null}
            <Snackbar
                autoHideDuration={1000}
                onClose={() => showELS("close")}
                open={error}
            >
                <Alert severity="error"
                    onClose={() => showELS("close")}
                >
                    {message}
                </Alert>
            </Snackbar>
            <Snackbar
                autoHideDuration={1000}
                onClose={() => showELS("close")}
                open={success}
            >
                <Alert severity="success"
                    onClose={() => showELS("close")}
                >
                    {message}
                </Alert>
            </Snackbar>
        </>
    )
}
