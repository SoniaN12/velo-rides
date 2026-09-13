import React, { useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";

export default function Index() {
  useEffect(() => {
    router.replace("/login");
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color="#D6A51D"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#140821",
    alignItems: "center",
    justifyContent: "center",
  },
});
