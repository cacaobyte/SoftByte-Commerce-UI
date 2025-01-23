import React from "react";
import CustomView from './../components/CustomView';
import { Platform, View, Text } from "react-native";

export default function Home() {
  return (
    <CustomView style={{ backgroundColor: "blue", padding: 16 }}>
      <Text style={{ color: "white" }}>Hello world!</Text>
      <Text style={{ color: "white" }}>ajsjas</Text>
    </CustomView>
  );
}
