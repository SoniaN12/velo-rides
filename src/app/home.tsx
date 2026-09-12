import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import BottomNav from "../components/BottomNav";

type RideType = "Moto" | "Car";

export default function HomeScreen() {
  const [pickup, setPickup] =
    useState("Current location");

  const [destination, setDestination] =
    useState("");

  const [selectedRide, setSelectedRide] =
    useState<RideType>("Moto");

  const estimatedFare =
    selectedRide === "Moto" ? 1500 : 3500;

  const findRide = () => {
    if (!pickup.trim()) {
      Alert.alert(
        "Pickup required",
        "Please enter your pickup location."
      );
      return;
    }

    if (!destination.trim()) {
      Alert.alert(
        "Destination required",
        "Please enter your destination."
      );
      return;
    }

    router.push({
      pathname: "/ride-confirmation",
      params: {
        pickup,
        destination,
        rideType: selectedRide,
        fare: estimatedFare.toString(),
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.page}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View>
              <Text style={styles.welcome}>
                Welcome to Velo 👋
              </Text>

              <Text style={styles.heading}>
                Where are you going?
              </Text>
            </View>

            <TouchableOpacity
              style={styles.profile}
              onPress={() =>
                router.push("/profile")
              }
            >
              <Ionicons
                name="person"
                size={24}
                color="#140821"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.hero}>
            <View>
              <Text style={styles.heroSmall}>
                VELO RIDES
              </Text>

              <Text style={styles.heroTitle}>
                Move around{"\n"}your city easily.
              </Text>
            </View>

            <Ionicons
              name="navigate-circle"
              size={70}
              color="#D6A51D"
            />
          </View>

          <View style={styles.locationCard}>
            <View style={styles.locationRow}>
              <View style={styles.locationIcon}>
                <Ionicons
                  name="location"
                  size={21}
                  color="#140821"
                />
              </View>

              <View style={styles.locationInput}>
                <Text style={styles.smallLabel}>
                  PICKUP
                </Text>

                <TextInput
                  style={styles.input}
                  value={pickup}
                  onChangeText={setPickup}
                  placeholder="Pickup location"
                  placeholderTextColor="#9F8545"
                />
              </View>
            </View>

            <View style={styles.line} />

            <View style={styles.locationRow}>
              <View style={styles.locationIcon}>
                <Ionicons
                  name="flag"
                  size={20}
                  color="#140821"
                />
              </View>

              <View style={styles.locationInput}>
                <Text style={styles.smallLabel}>
                  DESTINATION
                </Text>

                <TextInput
                  style={styles.input}
                  value={destination}
                  onChangeText={setDestination}
                  placeholder="Where do you want to go?"
                  placeholderTextColor="#9F8545"
                />
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>
            Choose your ride
          </Text>

          <View style={styles.rideRow}>
            <RideCard
              icon="bicycle"
              title="Velo Moto"
              subtitle="Fast & affordable"
              price="1,500 RWF"
              selected={selectedRide === "Moto"}
              onPress={() =>
                setSelectedRide("Moto")
              }
            />

            <RideCard
              icon="car-sport"
              title="Velo Car"
              subtitle="More comfort"
              price="3,500 RWF"
              selected={selectedRide === "Car"}
              onPress={() =>
                setSelectedRide("Car")
              }
            />
          </View>

          <View style={styles.fareCard}>
            <View>
              <Text style={styles.fareLabel}>
                Estimated fare
              </Text>

              <Text style={styles.fare}>
                {estimatedFare.toLocaleString()} RWF
              </Text>
            </View>

            <Ionicons
              name="wallet"
              size={30}
              color="#D6A51D"
            />
          </View>

          <TouchableOpacity
            style={styles.continueButton}
            onPress={findRide}
          >
            <Text style={styles.continueText}>
              Continue
            </Text>

            <Ionicons
              name="arrow-forward"
              size={21}
              color="#140821"
            />
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>
            Why Velo?
          </Text>

          <Feature
            icon="shield-checkmark"
            title="Verified Drivers"
            text="Ride with trusted drivers."
            onPress={() =>
              Alert.alert(
                "Verified Drivers",
                "Velo drivers are verified before they can accept passenger rides."
              )
            }
          />

          <Feature
            icon="navigate"
            title="Live Tracking"
            text="Follow your active rides."
            onPress={() =>
              router.push("/rides")
            }
          />

          <Feature
            icon="phone-portrait"
            title="Mobile Money"
            text="Manage payment options."
            onPress={() =>
              router.push("/wallet")
            }
          />

          <Feature
            icon="star"
            title="Ratings"
            text="Review your ride experience."
            onPress={() =>
              Alert.alert(
                "Ratings",
                "Ratings will become available after completing a ride."
              )
            }
          />

          <TouchableOpacity
            style={styles.signOut}
            onPress={() =>
              router.replace("/")
            }
          >
            <Ionicons
              name="log-out-outline"
              size={20}
              color="#D6A51D"
            />

            <Text style={styles.signOutText}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </ScrollView>

        <BottomNav active="home" />
      </View>
    </SafeAreaView>
  );
}

function RideCard({
  icon,
  title,
  subtitle,
  price,
  selected,
  onPress,
}: any) {
  return (
    <TouchableOpacity
      style={[
        styles.rideCard,
        selected && styles.selectedRide,
      ]}
      onPress={onPress}
    >
      <View style={styles.rideIcon}>
        <Ionicons
          name={icon}
          size={34}
          color="#D6A51D"
        />
      </View>

      <Text style={styles.rideName}>
        {title}
      </Text>

      <Text style={styles.rideInfo}>
        {subtitle}
      </Text>

      <Text style={styles.price}>
        {price}
      </Text>

      {selected && (
        <Text style={styles.selectedText}>
          ✓ Selected
        </Text>
      )}
    </TouchableOpacity>
  );
}

function Feature({
  icon,
  title,
  text,
  onPress,
}: any) {
  return (
    <TouchableOpacity
      style={styles.feature}
      onPress={onPress}
    >
      <View style={styles.featureIcon}>
        <Ionicons
          name={icon}
          size={22}
          color="#D6A51D"
        />
      </View>

      <View style={styles.featureContent}>
        <Text style={styles.featureTitle}>
          {title}
        </Text>

        <Text style={styles.featureText}>
          {text}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={20}
        color="#B99B49"
      />
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
    paddingBottom: 35,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },

  welcome: {
    color: "#B99B49",
    fontSize: 14,
  },

  heading: {
    color: "#E5C35A",
    fontSize: 27,
    fontWeight: "900",
    marginTop: 4,
  },

  profile: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#C69214",
    justifyContent: "center",
    alignItems: "center",
  },

  hero: {
    backgroundColor: "#24103D",
    borderWidth: 1,
    borderColor: "#C69214",
    borderRadius: 22,
    padding: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  heroSmall: {
    color: "#D6A51D",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 2,
  },

  heroTitle: {
    color: "#E5C35A",
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "900",
    marginTop: 7,
  },

  locationCard: {
    backgroundColor: "#321653",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#4B236B",
    padding: 20,
    marginBottom: 28,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  locationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#C69214",
    justifyContent: "center",
    alignItems: "center",
  },

  locationInput: {
    flex: 1,
    marginLeft: 14,
  },

  smallLabel: {
    color: "#C69214",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1,
  },

  input: {
    color: "#E5C35A",
    fontSize: 16,
    paddingVertical: 8,
  },

  line: {
    width: 1,
    height: 25,
    backgroundColor: "#4B236B",
    marginLeft: 19,
    marginVertical: 5,
  },

  sectionTitle: {
    color: "#E5C35A",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 14,
  },

  rideRow: {
    flexDirection: "row",
    gap: 12,
  },

  rideCard: {
    flex: 1,
    backgroundColor: "#321653",
    borderRadius: 18,
    padding: 18,
    borderWidth: 2,
    borderColor: "#4B236B",
  },

  selectedRide: {
    borderColor: "#D6A51D",
    backgroundColor: "#24103D",
  },

  rideIcon: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: "#24103D",
    justifyContent: "center",
    alignItems: "center",
  },

  rideName: {
    color: "#E5C35A",
    fontSize: 17,
    fontWeight: "900",
    marginTop: 12,
  },

  rideInfo: {
    color: "#B99B49",
    fontSize: 13,
    marginTop: 4,
  },

  price: {
    color: "#D6A51D",
    fontWeight: "900",
    marginTop: 10,
  },

  selectedText: {
    color: "#D6A51D",
    fontWeight: "800",
    fontSize: 12,
    marginTop: 10,
  },

  fareCard: {
    backgroundColor: "#24103D",
    borderWidth: 1,
    borderColor: "#C69214",
    borderRadius: 18,
    padding: 20,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  fareLabel: {
    color: "#B99B49",
    fontSize: 13,
  },

  fare: {
    color: "#D6A51D",
    fontSize: 25,
    fontWeight: "900",
    marginTop: 4,
  },

  continueButton: {
    backgroundColor: "#C69214",
    borderRadius: 16,
    padding: 18,
    marginVertical: 28,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  continueText: {
    color: "#140821",
    fontSize: 17,
    fontWeight: "900",
  },

  feature: {
    backgroundColor: "#321653",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#4B236B",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 11,
  },

  featureIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#24103D",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 13,
  },

  featureContent: {
    flex: 1,
  },

  featureTitle: {
    color: "#E5C35A",
    fontWeight: "900",
    fontSize: 16,
  },

  featureText: {
    color: "#B99B49",
    fontSize: 13,
    marginTop: 3,
  },

  signOut: {
    borderWidth: 1,
    borderColor: "#C69214",
    borderRadius: 14,
    padding: 15,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },

  signOutText: {
    color: "#D6A51D",
    fontWeight: "900",
  },
});
