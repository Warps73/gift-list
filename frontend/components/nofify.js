import {toast} from "react-toastify";

toast.configure();
const notifySuccess = (msg = 'Success !') => toast.success(msg, {
    autoClose: 1500,
});
const notifyError = (msg = 'Oup\'s, an error occurred') => toast.error(msg, {
    autoClose: 2500,
});

export {
    notifySuccess,
    notifyError
}
