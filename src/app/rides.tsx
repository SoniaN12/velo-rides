import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import BottomNav from "../components/BottomNav";

export default function RidesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.page}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>
            My Rides
          </Text>

          <Text style={styles.subtitle}>
            View your recent Velo activity.
          </Text>

          <View style={styles.activeCard}>
            <View style={styles.icon}>
              <Ionicons
                name="navigate"
                size={25}
                color="#140821"
              />
            </View>

            <View style={styles.activeContent}>
              <Text style={styles.activeTitle}>
                No active ride
              </Text>

              <Text style={styles.activeText}>
                Your current trip will appear here.
              </Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>
            Recent Rides
          </Text>

          <Ride
            type="Velo Moto"
            route="Kimironko → Kigali City"
            price="2,400 RWF"
            date="Previous ride"
          />

          <Ride
            type="Velo Car"
            route="Airport → City Centre"
            price="6,500 RWF"
            date="Previous ride"
          />

          <TouchableOpacity
            style={styles.bookButton}
            onPress={() =>
              router.replace("/home")
            }
          >
            <Ionicons
              name="add-circle"
              size={21}
              color="#140821"
            />

            <Text style={styles.bookText}>
              Book New Ride
            </Text>
          </TouchableOpacity>
        </ScrollView>

        <BottomNav active="rides" />
      </View>
    </SafeAreaView>
  );
}

function Ride({
  type,
  route,
  price,
  date,
}: any) {
  return (
    <TouchableOpacity style={styles.rideCard}>
      <View style={styles.rideIcon}>
        <Ionicons
          name={
            type.includes("Moto")
              ? "bicycle"
              : "car"
          }
          size={24}
          color="#D6A51D"
        />
      </View>

      <View style={styles.rideInfo}>
        <Text style={styles.rideType}>
          {type}
        </Text>

        <Text style={styles.route}>
          {route}
        </Text>

        <Text style={styles.date}>
          {date}
        </Text>
      </View>

      <Text style={styles.price}>
        {price}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#140821",
  },

  page: {
    flex: 1,
  },

  content: {
    padding: 22,
  },

  title: {
    color: "#E5C35A",
    fontSize: 30,
    fontWeight: "900",
  },

  subtitle: {
    color: "#B99B49",
    marginTop: 5,
    marginBottom: 25,
  },

  activeCard: {
    backgroundColor: "#24103D",
    borderWidth: 1,
    borderColor: "#C69214",
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#C69214",
    justifyContent: "center",
    alignItems: "center",
  },

  activeContent: {
    marginLeft: 14,
  },

  activeTitle: {
    color: "#E5C35A",
    fontWeight: "900",
    fontSize: 16,
  },

  activeText: {
    color: "#B99B49",
    marginTop: 4,
  },

  sectionTitle: {
    color: "#E5C35A",
    fontSize: 20,
    fontWeight: "900",
    marginTop: 30,
    marginBottom: 14,
  },

  rideCard: {
    backgroundColor: "#321653",
    borderWidth: 1,
    borderColor: "#4B236B",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  rideIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#24103D",
    justifyContent: "center",
    alignItems: "center",
  },

  rideInfo: {
    flex: 1,
    marginLeft: 13,
  },

  rideType: {
    color: "#E5C35A",
    fontWeight: "900",
  },

  route: {
    color: "#B99B49",
    marginTop: 3,
    fontSize: 13,
  },

  date: {
    color: "#8E773D",
    marginTop: 3,
    fontSize: 11,
  },

  price: {
    color: "#D6A51D",
    fontWeight: "900",
  },

  bookButton: {
    backgroundColor: "#C69214",
    borderRadius: 16,
    padding: 17,
    marginTop: 22,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  bookText: {
    color: "#140821",
    fontWeight: "900",
    fontSize: 16,
  },
});
