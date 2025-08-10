import { createContext, useState,useContext, useEffect } from "react";
import { useIsLoggedInQuery } from "../features/AuthSlice";

//Three Steps :
//1->Create Context
//2->Create the Provider
//3->Custom hook to use the context
const AuthstatusContext=createContext()

export const AuthProvider = ({ children }) => {
    const { data, error, isLoading ,refetch} = useIsLoggedInQuery(undefined,{
        refetchOnMountOrArgChange:true,//When the component using the query hook mounts, or when the arguments passed to the query hook change, the query will always refetch data from the source
        pollingInterval:2000 //This makes sure that the request runs after every two request
    })
    const [isSignedIn, setIsSignedIn] = useState(false)

    useEffect(() => {
        if (error && error?.status !== 404) {
           console.log(error)
        }
        else if(error?.status===404){
            setIsSignedIn(false)
        }
        else if (!isLoading && data?.success !== undefined) {
            console.log("This is status of data",data.success)
            setIsSignedIn(data.success)
        }
    },[data,isLoading,error])
    return (
        <AuthstatusContext.Provider value={{ isSignedIn,refetchAuth:refetch }}>
            {children}
        </AuthstatusContext.Provider>
    )
}
export const useAuthstatus=()=>useContext(AuthstatusContext)
