import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

type Page = "home" | "rides" | "wallet" | "profile";

export default function BottomNav({
  active,
}: {
  active: Page;
}) {
  const goTo = (page: Page) => {
    router.replace(`/${page}` as any);
  };

  return (
    <View style={styles.container}>
      <NavItem
        icon="home"
        label="Home"
        active={active === "home"}
        onPress={() => goTo("home")}
      />

      <NavItem
        icon="time"
        label="Rides"
        active={active === "rides"}
        onPress={() => goTo("rides")}
      />

      <NavItem
        icon="wallet"
        label="Wallet"
        active={active === "wallet"}
        onPress={() => goTo("wallet")}
      />

      <NavItem
        icon="person"
        label="Profile"
        active={active === "profile"}
        onPress={() => goTo("profile")}
      />
    </View>
  );
}

function NavItem({
  icon,
  label,
  active,
  onPress,
}: any) {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={onPress}
    >
      <Ionicons
        name={active ? icon : `${icon}-outline`}
        size={23}
        color={active ? "#D6A51D" : "#A88C46"}
      />

      <Text
        style={[
          styles.label,
          active && styles.activeLabel,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#24103D",
    borderTopWidth: 1,
    borderTopColor: "#4B236B",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 11,
  },

  item: {
    alignItems: "center",
    minWidth: 65,
  },

  label: {
    color: "#A88C46",
    fontSize: 11,
    fontWeight: "700",
    marginTop: 4,
  },

  activeLabel: {
    color: "#D6A51D",
  },
});
