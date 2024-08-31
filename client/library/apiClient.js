const HOST = import.meta.env.VITE_SERVER;
import axios from "axios";

 export const apiClient=axios.create({
    baseURL:HOST
});


export const AUTH_ROUTES = "api";
export const LOANUSER = `${AUTH_ROUTES}/createloanUser`;
export const GETLOANUSER = `${AUTH_ROUTES}/getLoanUser`;
export const LOANUSERTRX = `${AUTH_ROUTES}/getLoanTrx`;
export const LOANTRANSCATIONPUSH = `${AUTH_ROUTES}/loanTranscation`;
export const DELETELOANUSER = `${AUTH_ROUTES}/deleteLoanUser`;


export const DEPOSITUSER = `${AUTH_ROUTES}/createdepositUser`;
export const GETDEPOSITUSER = `${AUTH_ROUTES}/getAllDepositUser`;
export const DEPOSITTRX = `${AUTH_ROUTES}/getDepositTrxUser`;
export const DEPOSITRXUPLOAD = `${AUTH_ROUTES}/uploadLoanTrx`;
export const DELETEDEPOSITUSER = `${AUTH_ROUTES}/deleteDepositUser`;


export const GETBALANCEOFBOTHUSER = `${AUTH_ROUTES}/getBalanceofBothUser`;
export const SETNOTIFICATION = `${AUTH_ROUTES}/setNotification`;
export const GETNOTIFICATION = `${AUTH_ROUTES}/getNotification`;



