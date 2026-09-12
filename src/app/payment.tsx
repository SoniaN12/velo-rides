import React, { useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

export default function PaymentScreen() {
  const {
    pickup,
    destination,
    rideType,
    fare,
    phone,
  } = useLocalSearchParams<{
    pickup: string;
    destination: string;
    rideType: string;
    fare: string;
    phone: string;
  }>();

  const [paid, setPaid] = useState(false);

  const makePayment = () => {
    setPaid(true);
  };

  if (paid) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.successContainer}>
          <View style={styles.successCircle}>
            <Ionicons
              name="checkmark"
              size={50}
              color="#FFFFFF"
            />
          </View>

          <Text style={styles.successTitle}>
            Payment Successful
          </Text>

          <Text style={styles.successText}>
            Your demo Mobile Money payment was successful.
          </Text>

          <Text style={styles.successFare}>
            {Number(fare || 0).toLocaleString()} RWF
          </Text>

          <TouchableOpacity
            style={styles.continueButton}
            onPress={() =>
              router.replace({
                pathname: "/ride-status",
                params: {
                  pickup,
                  destination,
                  rideType,
                  fare,
                  payment: "Mobile Money",
                },
              })
            }
          >
            <Text style={styles.continueText}>
              Find My Driver
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.logo}>
          <Ionicons
            name="phone-portrait"
            size={40}
            color="#5B2EFF"
          />
        </View>

        <Text style={styles.title}>
          Mobile Money
        </Text>

        <Text style={styles.subtitle}>
          Demo payment confirmation
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>PHONE NUMBER</Text>
          <Text style={styles.value}>{phone}</Text>

          <View style={styles.divider} />

          <Text style={styles.label}>PAYMENT FOR</Text>
          <Text style={styles.value}>
            Velo {rideType} ride
          </Text>

          <View style={styles.divider} />

          <Text style={styles.label}>AMOUNT</Text>

          <Text style={styles.amount}>
            {Number(fare || 0).toLocaleString()} RWF
          </Text>
        </View>

        <View style={styles.notice}>
          <Ionicons
            name="information-circle"
            size={22}
            color="#5B2EFF"
          />

          <Text style={styles.noticeText}>
            This is a simulated payment. No real Mobile
            Money transaction will occur.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.payButton}
          onPress={makePayment}
        >
          <Text style={styles.payText}>
            Pay {Number(fare || 0).toLocaleString()} RWF
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancel}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelText}>
            Cancel Payment
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F7FC",
  },

  content: {
    flex: 1,
    padding: 24,
  },

  back: {
    color: "#5B2EFF",
    fontWeight: "800",
    marginBottom: 40,
  },

  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FFD84D",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },

  title: {
    color: "#211A33",
    fontSize: 31,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 20,
  },

  subtitle: {
    color: "#7C7588",
    textAlign: "center",
    marginTop: 7,
    marginBottom: 30,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
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
    fontWeight: "800",
    marginTop: 5,
  },

  divider: {
    height: 1,
    backgroundColor: "#EAE7F1",
    marginVertical: 17,
  },

  amount: {
    color: "#5B2EFF",
    fontSize: 28,
    fontWeight: "900",
    marginTop: 5,
  },

  notice: {
    backgroundColor: "#F0ECFF",
    borderRadius: 15,
    padding: 16,
    marginTop: 20,
    flexDirection: "row",
  },

  noticeText: {
    color: "#655D74",
    marginLeft: 10,
    flex: 1,
    lineHeight: 19,
    fontSize: 13,
  },

  payButton: {
    backgroundColor: "#FFD84D",
    borderRadius: 16,
    padding: 18,
    alignItems: "center",
    marginTop: 25,
  },

  payText: {
    color: "#211A33",
    fontSize: 17,
    fontWeight: "900",
  },

  cancel: {
    padding: 16,
    alignItems: "center",
  },

  cancelText: {
    color: "#7C7588",
    fontWeight: "700",
  },

  successContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
  },

  successCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#5B2EFF",
    alignItems: "center",
    justifyContent: "center",
  },

  successTitle: {
    color: "#211A33",
    fontSize: 29,
    fontWeight: "900",
    marginTop: 25,
  },

  successText: {
    color: "#7C7588",
    fontSize: 15,
    textAlign: "center",
    marginTop: 8,
  },

  successFare: {
    color: "#5B2EFF",
    fontSize: 31,
    fontWeight: "900",
    marginTop: 22,
  },

  continueButton: {
    backgroundColor: "#FFD84D",
    borderRadius: 16,
    paddingVertical: 17,
    width: "100%",
    alignItems: "center",
    marginTop: 35,
  },

  continueText: {
    color: "#211A33",
    fontWeight: "900",
    fontSize: 17,
  },
});
