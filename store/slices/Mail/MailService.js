import instanceAPI from '../../../src/config/axiosConfig';
import { mailError, mailLoading, mailSuccess } from "./MailSlice";

export const SendMailTest = async (dispatch, data) => {
  dispatch(mailLoading())
  await instanceAPI.post(`/email/sendEmailBcc`, data)
  .then(resp => {
    dispatch(mailSuccess());
  })
  .catch(error => {
    dispatch(mailError())
  })
};
