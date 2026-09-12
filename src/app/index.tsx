import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        {/* Velo Logo */}
        <View style={styles.logoCircle}>
          <Ionicons
            name="bicycle"
            size={55}
            color="#140821"
          />
        </View>

        <Text style={styles.logo}>
          VELO
        </Text>

        <Text style={styles.rides}>
          RIDES
        </Text>

        {/* Welcome text */}
        <Text style={styles.title}>
          Your ride, your way.
        </Text>

        <Text style={styles.subtitle}>
          Safe, fast and affordable rides whenever you need them.
        </Text>

        {/* Features */}
        <View style={styles.features}>

          <View style={styles.feature}>
            <View style={styles.featureIcon}>
              <Ionicons
                name="shield-checkmark"
                size={22}
                color="#D6A51D"
              />
            </View>

            <Text style={styles.featureText}>
              Safe & verified drivers
            </Text>
          </View>

          <View style={styles.feature}>
            <View style={styles.featureIcon}>
              <Ionicons
                name="location"
                size={22}
                color="#D6A51D"
              />
            </View>

            <Text style={styles.featureText}>
              Easy ride booking
            </Text>
          </View>

          <View style={styles.feature}>
            <View style={styles.featureIcon}>
              <Ionicons
                name="phone-portrait"
                size={22}
                color="#D6A51D"
              />
            </View>

            <Text style={styles.featureText}>
              Mobile Money payments
            </Text>
          </View>

        </View>

        {/* Get Started */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.buttonText}>
            Get Started
          </Text>

          <Ionicons
            name="arrow-forward"
            size={21}
            color="#140821"
          />
        </TouchableOpacity>

        <Text style={styles.footer}>
          Move smarter with Velo.
        </Text>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#140821",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 28,
    paddingVertical: 30,
  },

  logoCircle: {
    width: 105,
    height: 105,
    borderRadius: 53,

    backgroundColor: "#C69214",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 3,
    borderColor: "#D6A51D",

    marginBottom: 20,
  },

  logo: {
    color: "#E5C35A",

    fontSize: 46,
    fontWeight: "900",

    letterSpacing: 7,
  },

  rides: {
    color: "#C69214",

    fontSize: 15,
    fontWeight: "900",

    letterSpacing: 9,

    marginTop: 2,
  },

  title: {
    color: "#E5C35A",

    fontSize: 29,
    fontWeight: "900",

    textAlign: "center",

    marginTop: 35,
  },

  subtitle: {
    color: "#B99B49",

    fontSize: 15,

    textAlign: "center",

    lineHeight: 23,

    maxWidth: 380,

    marginTop: 12,
  },

  features: {
    width: "100%",

    maxWidth: 380,

    backgroundColor: "#24103D",

    borderRadius: 20,

    padding: 18,

    marginTop: 30,

    borderWidth: 1,
    borderColor: "#4B236B",
  },

  feature: {
    flexDirection: "row",
    alignItems: "center",

    marginVertical: 7,
  },

  featureIcon: {
    width: 42,
    height: 42,

    borderRadius: 21,

    backgroundColor: "#321653",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 13,

    borderWidth: 1,
    borderColor: "#C69214",
  },

  featureText: {
    color: "#E5C35A",

    fontSize: 15,
    fontWeight: "700",
  },

  button: {
    width: "100%",
    maxWidth: 380,

    backgroundColor: "#C69214",

    paddingVertical: 18,

    borderRadius: 16,

    marginTop: 30,

    flexDirection: "row",

    justifyContent: "center",
    alignItems: "center",

    gap: 10,

    borderWidth: 2,
    borderColor: "#D6A51D",
  },

  buttonText: {
    color: "#140821",

    fontSize: 18,
    fontWeight: "900",
  },

  footer: {
    color: "#B99B49",

    fontSize: 12,

    marginTop: 20,
  },

});
