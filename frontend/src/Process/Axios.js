import { jwtDecode }  from "jwt-decode";
import dayjs from "dayjs";
import { useState } from "react";
import axios from "axios";
import {useSelector,useDispatch} from 'react-redux'
import { LogoutUser } from './action'

const baseURL = "http://127.0.0.1:8000/";

const UseAxios = () => {
  const dispatch=useDispatch()
  // const history=useNavigate()
  

  const [LoginTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("LoginTokens")
            ? JSON.parse(localStorage.getItem("LoginTokens"))
            : null
    );
 
  const axiosRequest = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${LoginTokens?.access}` }
  });


  axiosRequest.interceptors.request.use(async req => {
    const user = jwtDecode(LoginTokens.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    // console.log(LoginTokens.refresh)

    if (!isExpired) return req;
    
    
    try {
      console.log('refresh', LoginTokens.refresh)
      const response = await axios.post(`${baseURL}logApp/api/token/refresh/`, {
        refresh: LoginTokens.refresh
      });
  
      localStorage.setItem("LoginTokens", JSON.stringify(response.data));
      req.headers.Authorization = `Bearer ${response.data.access}`;
      return req;
    } catch (error) {
      console.error("Token refresh alert  failed:", error);
      dispatch(LogoutUser())
      // Handle specific error cases if needed
      // throw error; // Rethrow the error to propagate it to the caller
    }



    // const response = await axios.post(`${baseURL}logApp/api/token/refresh/`, {
    //   refresh: LoginTokens.refresh
    // });
    
    // console.log(response.data)
    // localStorage.setItem("LoginTokens", JSON.stringify(response.data));
    // req.headers.Authorization = `Bearer ${response.data.access}`;
    // return req;
  });

  return axiosRequest;
};

export default UseAxios;
    
    
