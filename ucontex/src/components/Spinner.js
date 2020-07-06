import React from "react";
import { View, ActivityIndicator } from "react-native";

const Spinner = ({ size }) => {
  return (
    <View style={styles.spinnerStyles}>
      <ActivityIndicator style={{ color: "#44a4f7" }} size={size || "large"} />
    </View>
  );
};

const styles = {
  spinnerStyles: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
};

export default Spinner;
