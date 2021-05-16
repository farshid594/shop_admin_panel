import React, { createContext, useState } from 'react'

const AlertContext = createContext({
    error: false,
    success: false,
    loading: false,
    message: "",
    showELS: (type, message) => { }
})

export { AlertContext }

export default function AlertContextProvider({ children }) {
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const showELS = (type, newMessage = "") => {
        switch (type) {
            case "success":
                setSuccess(true)
                setError(false)
                setLoading(false)
                setMessage(newMessage)
                break;
            case "error":
                setSuccess(false)
                setError(true)
                setLoading(false)
                setMessage(newMessage)
                break;
            case "loading":
                setSuccess(success)
                setError(false)
                setLoading(true)
                setMessage(message)
                break;
            case "close":
                setSuccess(false)
                setError(false)
                setLoading(false)
                setMessage("")
                break;

            default:
                break;
        }
    }
    return (
        <AlertContext.Provider
            value={{
                error: error, success: success, loading: loading, message: message, showELS: showELS
            }}
        >
            {children}
        </AlertContext.Provider>
    )
}