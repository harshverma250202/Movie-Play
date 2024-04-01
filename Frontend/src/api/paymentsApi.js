import baseApi from "./baseApi";
import { open, close } from "../store/slices/snackbarSlice";
export const paymentApi = ({ userId, cardNumber, cvv, expiryDate, subscription, name }) => (navigate) => (dispatch) => {
    baseApi.post(`users/${userId}/transactions`, {
        cardNumber,
        cvv,
        expiryDate,
        subscription,
        name
    }).then((response) => {
        dispatch(open({
            type: "success",
            message: "Payment Successful"
        }));
        navigate('/profile')
        response.data;
    }).catch((error) => {
        dispatch(open({
            type: "error",
            message: "Payment Failed"
        }));
        navigate('/')
    });
}