import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const spinner = ({ size }) => (
  <View style={styles.spinnerStyle}>
    <ActivityIndicator size={size || "large"} />
  </View>
);

const styles = StyleSheet.create({
  spinnerStyle: {
    alignItems: "center",
    justifyContent: "center"
  }
});
export default spinner;
