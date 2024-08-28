import { serverURL } from "./serverURL";
import { commonAPI } from "./commonAPI";

// register api call
export const registerAPI =async(user)=>{
    return await commonAPI("post",`${serverURL}/register`,user,"")}
// login api call

export const loginAPI =async(user)=>{
    return await commonAPI("post",`${serverURL}/login`,user,"")
}
// Admin login API call
// export const adminLoginAPI = async (userData) => {
//     return await commonAPI("post", `${serverURL}/login/admin`, userData, "");
// };

// userDetails
export const userDetailsAPI = async(reqHeader)=>{
    return await commonAPI("get", `${serverURL}/user/details`, "", reqHeader);
};

// Deposit API call
export const depositAPI = async (data, reqHeader) => {
    return await commonAPI("post", `${serverURL}/user/deposit`, data, reqHeader);
  }
  
  // Withdraw API call
  export const withdrawAPI = async (data, reqHeader) => {
    return await commonAPI("post", `${serverURL}/user/withdraw`, data, reqHeader);
  }

  // transactions for a user
export const getUserTransactionsAPI = async (reqHeader) => {
    return await commonAPI("get", `${serverURL}/user/transactions`, "", reqHeader);
};

export const adminAllUserAPI=async(searchKey,reqHeader)=>{
     return await commonAPI("get",`${serverURL}/admin/users?search=${searchKey}`,"",reqHeader)
}

export const adminAlltransAPI=async(searchKey,reqHeader)=>{
    return await commonAPI("get",`${serverURL}/admin/users/transaction?search=${searchKey}`,"",reqHeader)
}