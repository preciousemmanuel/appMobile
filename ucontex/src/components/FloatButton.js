import React from "react";
import { TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
const FloatButton = props => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.fabStyle} {...props}>
      {props.children}
    </TouchableOpacity>
  );
};

const styles = EStyleSheet.create({
  fabStyle: {
    position: "absolute",
    right: "20rem",
    bottom: "20rem",
    backgroundColor: "#44a4f7",
    width: "45rem",
    height: "45rem",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "75rem",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4
  }
});
export default FloatButton;
