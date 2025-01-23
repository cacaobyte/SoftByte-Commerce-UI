import React from "react";
import { Platform, View, Text } from "react-native";

const CustomView = ({ children, ...props }) => {
  const content =
    Platform.OS === "web"
      ? children
      : React.Children.map(children, (child) =>
          typeof child === "string" ? <Text>{child}</Text> : child
        );

  return (
    <View {...props}>
      {content}
    </View>
  );
};

export default CustomView;
