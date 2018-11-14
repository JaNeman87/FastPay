import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const CustomButton = props => {
  const content = (
    <View
      style={[
        styles.button,
        { backgroundColor: props.color, width: props.width },
        props.disabled ? styles.disabled : null
      ]}
    >
      <Text
        style={[
          { color: "white" },
          props.disabled ? styles.disabledText : null
        ]}
      >
        {props.children}
      </Text>
    </View>
  );

  if (props.disabled) {
    return content;
  }

  return <TouchableOpacity onPress={props.onPress}>{content}</TouchableOpacity>;
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  disabled: {
    backgroundColor: "#cce6ff",
    borderColor: "#aaa"
  },
  disabledText: {
    color: "white"
  }
});
export default CustomButton;
