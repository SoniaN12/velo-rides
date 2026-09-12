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
import { router, useLocalSearchParams } from "expo-router";

type PaymentMethod = "Mobile Money" | "Cash";

export default function RideConfirmationScreen() {
  const {
    pickup,
    destination,
    rideType,
    fare,
  } = useLocalSearchParams<{
    pickup: string;
    destination: string;
    rideType: string;
    fare: string;
  }>();

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("Mobile Money");

  const [phone, setPhone] = useState("");

  const confirmBooking = () => {
    if (
      paymentMethod === "Mobile Money" &&
      phone.trim().length < 9
    ) {
      Alert.alert(
        "Phone number required",
        "Please enter a valid Mobile Money phone number."
      );
      return;
    }

    if (paymentMethod === "Mobile Money") {
      router.push({
        pathname: "/payment",
        params: {
          pickup,
          destination,
          rideType,
          fare,
          phone,
        },
      });

      return;
    }

    router.push({
      pathname: "/ride-status",
      params: {
        pickup,
        destination,
        rideType,
        fare,
        payment: "Cash",
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Confirm your ride</Text>

        <Text style={styles.subtitle}>
          Review your trip and choose how you want to pay.
        </Text>

        <View style={styles.tripCard}>
          <View style={styles.row}>
            <Ionicons name="bicycle" size={24} color="#5B2EFF" />

            <View style={styles.rowText}>
              <Text style={styles.label}>RIDE</Text>
              <Text style={styles.value}>Velo {rideType}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Ionicons name="location" size={23} color="#5B2EFF" />

            <View style={styles.rowText}>
              <Text style={styles.label}>PICKUP</Text>
              <Text style={styles.value}>{pickup}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Ionicons name="flag" size={22} color="#5B2EFF" />

            <View style={styles.rowText}>
              <Text style={styles.label}>DESTINATION</Text>
              <Text style={styles.value}>{destination}</Text>
            </View>
          </View>

          <View style={styles.fareSection}>
            <Text style={styles.fareLabel}>Estimated fare</Text>

            <Text style={styles.fare}>
              {Number(fare || 0).toLocaleString()} RWF
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Payment method</Text>

        <TouchableOpacity
          style={[
            styles.paymentCard,
            paymentMethod === "Mobile Money" &&
              styles.selectedPayment,
          ]}
          onPress={() => setPaymentMethod("Mobile Money")}
        >
          <View style={styles.paymentIcon}>
            <Ionicons
              name="phone-portrait"
              size={25}
              color="#5B2EFF"
            />
          </View>

          <View style={styles.paymentText}>
            <Text style={styles.paymentTitle}>
              Mobile Money
            </Text>

            <Text style={styles.paymentDescription}>
              Pay from your mobile wallet
            </Text>
          </View>

          <Ionicons
            name={
              paymentMethod === "Mobile Money"
                ? "radio-button-on"
                : "radio-button-off"
            }
            size={24}
            color="#5B2EFF"
          />
        </TouchableOpacity>

        {paymentMethod === "Mobile Money" && (
          <View style={styles.phoneBox}>
            <Text style={styles.phoneLabel}>
              Mobile Money number
            </Text>

            <TextInput
              style={styles.phoneInput}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholder="e.g. 0781234567"
              placeholderTextColor="#9B96A8"
            />

            <Text style={styles.dummyNotice}>
              Demo payment only — no real money will be charged.
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.paymentCard,
            paymentMethod === "Cash" &&
              styles.selectedPayment,
          ]}
          onPress={() => setPaymentMethod("Cash")}
        >
          <View style={styles.paymentIcon}>
            <Ionicons name="cash" size={25} color="#5B2EFF" />
          </View>

          <View style={styles.paymentText}>
            <Text style={styles.paymentTitle}>
              Cash
            </Text>

            <Text style={styles.paymentDescription}>
              Pay the driver after your ride
            </Text>
          </View>

          <Ionicons
            name={
              paymentMethod === "Cash"
                ? "radio-button-on"
                : "radio-button-off"
            }
            size={24}
            color="#5B2EFF"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={confirmBooking}
        >
          <Text style={styles.confirmText}>
            Confirm & Continue
          </Text>

          <Ionicons
            name="arrow-forward"
            size={21}
            color="#211A33"
          />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F7FC",
  },

  content: {
    padding: 24,
    paddingBottom: 50,
  },

  back: {
    color: "#5B2EFF",
    fontWeight: "800",
    marginBottom: 25,
  },

  title: {
    color: "#211A33",
    fontSize: 30,
    fontWeight: "900",
  },

  subtitle: {
    color: "#7C7588",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 7,
    marginBottom: 25,
  },

  tripCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  rowText: {
    flex: 1,
    marginLeft: 14,
  },

  label: {
    color: "#918A9D",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1,
  },

  value: {
    color: "#211A33",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 4,
  },

  divider: {
    height: 1,
    backgroundColor: "#EAE7F1",
    marginVertical: 17,
  },

  fareSection: {
    backgroundColor: "#5B2EFF",
    borderRadius: 14,
    padding: 17,
    marginTop: 20,
  },

  fareLabel: {
    color: "#DDD4FF",
    fontSize: 13,
  },

  fare: {
    color: "#FFD84D",
    fontSize: 25,
    fontWeight: "900",
    marginTop: 4,
  },

  sectionTitle: {
    color: "#211A33",
    fontSize: 20,
    fontWeight: "900",
    marginTop: 28,
    marginBottom: 13,
  },

  paymentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
    marginBottom: 12,
  },

  selectedPayment: {
    borderColor: "#5B2EFF",
    backgroundColor: "#F6F3FF",
  },

  paymentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EEE9FF",
    alignItems: "center",
    justifyContent: "center",
  },

  paymentText: {
    flex: 1,
    marginLeft: 13,
  },

  paymentTitle: {
    color: "#211A33",
    fontSize: 16,
    fontWeight: "900",
  },

  paymentDescription: {
    color: "#81798D",
    fontSize: 13,
    marginTop: 3,
  },

  phoneBox: {
    backgroundColor: "#FFF8D9",
    borderRadius: 16,
    padding: 17,
    marginBottom: 12,
  },

  phoneLabel: {
    color: "#211A33",
    fontWeight: "800",
    marginBottom: 8,
  },

  phoneInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: "#211A33",
  },

  dummyNotice: {
    color: "#756A39",
    fontSize: 12,
    marginTop: 10,
  },

  confirmButton: {
    backgroundColor: "#FFD84D",
    borderRadius: 16,
    padding: 18,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  confirmText: {
    color: "#211A33",
    fontSize: 17,
    fontWeight: "900",
  },
});
