import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

export default function RideStatusScreen() {
  const {
    destination,
    rideType,
    fare,
    payment,
  } = useLocalSearchParams<{
    destination: string;
    rideType: string;
    fare: string;
    payment: string;
  }>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.driverIcon}>
          <Ionicons
            name="search"
            size={42}
            color="#5B2EFF"
          />
        </View>

        <Text style={styles.title}>
          Finding your driver
        </Text>

        <Text style={styles.subtitle}>
          We're looking for a nearby Velo {rideType} driver.
        </Text>

        <View style={styles.card}>
          <Row title="Destination" value={destination || "-"} />

          <View style={styles.divider} />

          <Row
            title="Estimated fare"
            value={`${Number(fare || 0).toLocaleString()} RWF`}
          />

          <View style={styles.divider} />

          <Row
            title="Payment"
            value={payment || "Not selected"}
          />
        </View>

        <View style={styles.status}>
          <View style={styles.dot} />

          <Text style={styles.statusText}>
            Searching for available drivers...
          </Text>
        </View>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => router.replace("/home")}
        >
          <Text style={styles.homeText}>
            Back to Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.replace("/home")}
        >
          <Text style={styles.cancel}>
            Cancel Ride
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function Row({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <View>
      <Text style={styles.label}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F7FC",
  },

  content: {
    flex: 1,
    padding: 25,
    alignItems: "center",
  },

  driverIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FFD84D",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },

  title: {
    fontSize: 29,
    fontWeight: "900",
    color: "#211A33",
    marginTop: 24,
  },

  subtitle: {
    color: "#7C7588",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 21,
  },

  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 20,
    marginTop: 30,
  },

  label: {
    color: "#918A9D",
    fontSize: 12,
    fontWeight: "800",
  },

  value: {
    color: "#211A33",
    fontSize: 17,
    fontWeight: "800",
    marginTop: 5,
  },

  divider: {
    height: 1,
    backgroundColor: "#EAE7F1",
    marginVertical: 16,
  },

  status: {
    width: "100%",
    backgroundColor: "#F0ECFF",
    borderRadius: 15,
    padding: 17,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },

  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#5B2EFF",
    marginRight: 11,
  },

  statusText: {
    color: "#5B2EFF",
    fontWeight: "800",
  },

  homeButton: {
    backgroundColor: "#FFD84D",
    width: "100%",
    borderRadius: 16,
    padding: 17,
    alignItems: "center",
    marginTop: 25,
  },

  homeText: {
    color: "#211A33",
    fontSize: 17,
    fontWeight: "900",
  },

  cancel: {
    color: "#D24747",
    fontWeight: "800",
    marginTop: 20,
  },
});
