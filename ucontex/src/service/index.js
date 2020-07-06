import { ToastAndroid } from "react-native";

export const Toast = {
  showToast: message => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  }
};
