import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function addNotification(messageKey, level, position = 'bottom-right', autoDismiss = 4) {
  const messageText = messageKey; 

  toast(messageText, {
    position,
    autoClose: autoDismiss * 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    type: level
  });
}
