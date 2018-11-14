import React from "react";
import { TextInput, StyleSheet } from "react-native";

const input = props => (
  <TextInput
    underlineColorAndroid="transparent"
    {...props}
    style={[
      styles.input,
      props.style,
      !props.valid && props.touched ? styles.invalid : null
    ]}
  />
);

const styles = StyleSheet.create({
  input: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#1DA1F2",
    borderRadius: 10,
    padding: 5,
    margin: 8
  },
  invalid: {
    backgroundColor: "#f9c0c0",
    borderColor: "red"
  }
});
export default input;
