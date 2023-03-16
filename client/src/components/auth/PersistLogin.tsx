import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
// import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../../hooks/useAuth';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { auth, setAuthentication } = useAuth();
    const getLoggedInUser = async () => {

        try {
            // Later change this to a passport auheticated server route like get user. This will 
            //call the service with jwt if it is in cookie else if cookie not available
            //it will go to error and set logged in false

            // //decode token 
            // const userDetail = jwt_decode()
            const response = await axios.get("http://localhost:8000/api/v1/loggedInUser",
                {
                    withCredentials: true
                }

            );
            const { email, name, roles, token } = response.data.userData
            setIsLoading(false)
            const authData = {
                email,
                name,
                roles,
                token
            }
            setAuthentication(authData)


        } catch (error) {
            setAuthentication({
                email: "",
                name: "",
                roles: [],
                token: "",
            })
            console.log("Error----->", error);
        }
        finally {
            setIsLoading(false)
        }
    }


    useEffect(() => {
        getLoggedInUser()
    }, [])



    return (
        <>

            {isLoading
                ? <p>Loading...</p>
                : <Outlet />}
            {/* <Outlet /> */}
        </>
    )
}

export default PersistLogin