import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { API_URL } from "../utils/api";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getToken } from "../utils/authStorage";

console.log("VELO PAYMENT VERSION SEPTEMBER 12");

export default function PaymentScreen() {
  const params = useLocalSearchParams();

  const pickup = String(params.pickup || "");
  const destination = String(params.destination || "");
  const rideType = String(params.rideType || "Moto");
  const fare = Number(params.fare || 0);

  const [selectedPayment, setSelectedPayment] =
    useState<"Cash" | "Mobile Money">("Cash");

  const [loading, setLoading] = useState(false);

  const saveRide = async (
    paymentMethod: string,
    paymentStatus: string
  ) => {
    const token = await getToken();

    if (!token) {
      Alert.alert(
        "Sign In Required",
        "Please sign in to your Velo account.",
        [
          {
            text: "Sign In",
            onPress: () =>
              router.replace("/login"),
          },
        ]
      );

      return null;
    }

    const response = await fetch(
      `${API_URL}/api/rides`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          pickup,
          destination,
          rideType,
          fare,
          paymentMethod,
          paymentStatus,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Could not save the ride."
      );
    }

    return data.ride;
  };

  const processMobileMoney = async () => {
    const response = await fetch(
      `${API_URL}/api/payments/momo/request`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          phone: "250780000000",
          amount: fare,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.message ||
          "Mobile Money payment failed."
      );
    }

    return data;
  };

  const handlePayment = async () => {
    if (
      !pickup ||
      !destination ||
      fare <= 0
    ) {
      Alert.alert(
        "Missing Ride Details",
        "Pickup, destination and fare are required."
      );
      return;
    }

    try {
      setLoading(true);

      let paymentStatus = "Pending";

      if (
        selectedPayment ===
        "Mobile Money"
      ) {
        await processMobileMoney();
        paymentStatus = "Paid";
      }

      const savedRide =
        await saveRide(
          selectedPayment,
          paymentStatus
        );

      if (!savedRide) {
        return;
      }

      Alert.alert(
        "Ride Booked",
        "Your ride has been saved to My Rides.",
        [
          {
            text: "Continue",
            onPress: () =>
              router.replace({
                pathname:
                  "/ride-status",
                params: {
                  rideId:
                    savedRide._id,
                  pickup:
                    savedRide.pickup,
                  destination:
                    savedRide.destination,
                  rideType:
                    savedRide.rideType,
                  fare: String(
                    savedRide.fare
                  ),
                  paymentMethod:
                    savedRide.paymentMethod,
                },
              }),
          },
        ]
      );
    } catch (error) {
      console.error(
        "Booking error:",
        error
      );

      Alert.alert(
        "Booking Failed",
        error instanceof Error
          ? error.message
          : "Could not complete your booking."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={
          styles.content
        }
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color="#E5C35A"
          />
        </TouchableOpacity>

        <Text style={styles.title}>
          Payment
        </Text>

        <Text style={styles.subtitle}>
          Choose how you want to pay for your ride.
        </Text>

        <View style={styles.summaryCard}>
          <Text
            style={styles.summaryTitle}
          >
            Ride Summary
          </Text>

          <Text
            style={styles.summaryLabel}
          >
            Pickup
          </Text>

          <Text
            style={styles.summaryValue}
          >
            {pickup || "Not provided"}
          </Text>

          <Text
            style={styles.summaryLabel}
          >
            Destination
          </Text>

          <Text
            style={styles.summaryValue}
          >
            {destination ||
              "Not provided"}
          </Text>

          <Text
            style={styles.summaryLabel}
          >
            Ride Type
          </Text>

          <Text
            style={styles.summaryValue}
          >
            Velo {rideType}
          </Text>

          <Text
            style={styles.summaryLabel}
          >
            Fare
          </Text>

          <Text style={styles.fare}>
            {fare.toLocaleString()} RWF
          </Text>
        </View>

        <Text
          style={styles.sectionTitle}
        >
          Payment Method
        </Text>

        <TouchableOpacity
          style={[
            styles.paymentCard,
            selectedPayment ===
              "Cash" &&
              styles.selectedCard,
          ]}
          onPress={() =>
            setSelectedPayment("Cash")
          }
        >
          <Ionicons
            name="cash-outline"
            size={26}
            color="#D6A51D"
          />

          <View style={styles.paymentText}>
            <Text
              style={styles.paymentTitle}
            >
              Cash
            </Text>

            <Text
              style={
                styles.paymentDescription
              }
            >
              Pay the driver after the ride.
            </Text>
          </View>

          <Ionicons
            name={
              selectedPayment ===
              "Cash"
                ? "radio-button-on"
                : "radio-button-off"
            }
            size={24}
            color="#D6A51D"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.paymentCard,
            selectedPayment ===
              "Mobile Money" &&
              styles.selectedCard,
          ]}
          onPress={() =>
            setSelectedPayment(
              "Mobile Money"
            )
          }
        >
          <Ionicons
            name="phone-portrait-outline"
            size={26}
            color="#D6A51D"
          />

          <View style={styles.paymentText}>
            <Text
              style={styles.paymentTitle}
            >
              Mobile Money
            </Text>

            <Text
              style={
                styles.paymentDescription
              }
            >
              Use the current Velo demo payment.
            </Text>
          </View>

          <Ionicons
            name={
              selectedPayment ===
              "Mobile Money"
                ? "radio-button-on"
                : "radio-button-off"
            }
            size={24}
            color="#D6A51D"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.payButton,
            loading &&
              styles.disabledButton,
          ]}
          onPress={handlePayment}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator
              color="#140821"
            />
          ) : (
            <Text
              style={
                styles.payButtonText
              }
            >
              {selectedPayment ===
              "Cash"
                ? "Confirm Ride"
                : `Pay ${fare.toLocaleString()} RWF`}
            </Text>
          )}
        </TouchableOpacity>

        <Text style={styles.demoText}>
          Mobile Money is currently a
          sandbox/demo payment and does not
          charge real money.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#140821",
  },

  content: {
    padding: 22,
    paddingTop: 45,
    paddingBottom: 50,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#24103D",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
  },

  title: {
    color: "#E5C35A",
    fontSize: 30,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#B99B49",
    marginTop: 7,
    marginBottom: 25,
  },

  summaryCard: {
    backgroundColor: "#24103D",
    borderColor: "#4B236B",
    borderWidth: 1,
    borderRadius: 18,
    padding: 18,
    marginBottom: 28,
  },

  summaryTitle: {
    color: "#D6A51D",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 17,
  },

  summaryLabel: {
    color: "#B99B49",
    fontSize: 12,
    marginTop: 10,
    marginBottom: 3,
  },

  summaryValue: {
    color: "#E5C35A",
    fontSize: 15,
    fontWeight: "600",
  },

  fare: {
    color: "#D6A51D",
    fontSize: 20,
    fontWeight: "bold",
  },

  sectionTitle: {
    color: "#E5C35A",
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 14,
  },

  paymentCard: {
    backgroundColor: "#24103D",
    borderWidth: 1,
    borderColor: "#4B236B",
    borderRadius: 17,
    padding: 16,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  selectedCard: {
    borderColor: "#D6A51D",
    borderWidth: 2,
  },

  paymentText: {
    flex: 1,
    marginLeft: 13,
  },

  paymentTitle: {
    color: "#E5C35A",
    fontSize: 16,
    fontWeight: "bold",
  },

  paymentDescription: {
    color: "#B99B49",
    fontSize: 12,
    marginTop: 4,
  },

  payButton: {
    backgroundColor: "#C69214",
    paddingVertical: 17,
    borderRadius: 15,
    marginTop: 20,
    alignItems: "center",
  },

  disabledButton: {
    opacity: 0.6,
  },

  payButtonText: {
    color: "#140821",
    fontWeight: "bold",
    fontSize: 16,
  },

  demoText: {
    color: "#B99B49",
    textAlign: "center",
    marginTop: 17,
    fontSize: 12,
  },
});
