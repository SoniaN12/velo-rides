import React, { useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import BottomNav from "../components/BottomNav";

export default function WalletScreen() {
  const [balance, setBalance] = useState(10000);

  const addMoney = () => {
    setBalance(balance + 5000);

    Alert.alert(
      "Demo Wallet",
      "5,000 RWF was added to your demo wallet."
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.page}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>
            Velo Wallet
          </Text>

          <Text style={styles.subtitle}>
            Manage your payment options.
          </Text>

          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>
              AVAILABLE BALANCE
            </Text>

            <Text style={styles.balance}>
              {balance.toLocaleString()} RWF
            </Text>

            <TouchableOpacity
              style={styles.addButton}
              onPress={addMoney}
            >
              <Ionicons
                name="add"
                size={20}
                color="#140821"
              />

              <Text style={styles.addText}>
                Add Demo Money
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>
            Payment Methods
          </Text>

          <PaymentMethod
            icon="phone-portrait"
            title="Mobile Money"
            text="Pay with your mobile wallet"
          />

          <PaymentMethod
            icon="cash"
            title="Cash"
            text="Pay your driver after the trip"
          />

          <PaymentMethod
            icon="card"
            title="Card"
            text="Coming soon"
          />
        </ScrollView>

        <BottomNav active="wallet" />
      </View>
    </SafeAreaView>
  );
}

function PaymentMethod({
  icon,
  title,
  text,
}: any) {
  return (
    <TouchableOpacity
      style={styles.method}
      onPress={() =>
        Alert.alert(
          title,
          `${text}\n\nThis is currently a demo payment option.`
        )
      }
    >
      <View style={styles.methodIcon}>
        <Ionicons
          name={icon}
          size={24}
          color="#D6A51D"
        />
      </View>

      <View style={styles.methodInfo}>
        <Text style={styles.methodTitle}>
          {title}
        </Text>

        <Text style={styles.methodText}>
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

  balanceCard: {
    backgroundColor: "#24103D",
    borderWidth: 1,
    borderColor: "#C69214",
    borderRadius: 20,
    padding: 22,
  },

  balanceLabel: {
    color: "#B99B49",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1,
  },

  balance: {
    color: "#D6A51D",
    fontSize: 35,
    fontWeight: "900",
    marginTop: 8,
  },

  addButton: {
    backgroundColor: "#C69214",
    padding: 14,
    borderRadius: 13,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    gap: 7,
  },

  addText: {
    color: "#140821",
    fontWeight: "900",
  },

  sectionTitle: {
    color: "#E5C35A",
    fontSize: 20,
    fontWeight: "900",
    marginTop: 30,
    marginBottom: 14,
  },

  method: {
    backgroundColor: "#321653",
    borderWidth: 1,
    borderColor: "#4B236B",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  methodIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#24103D",
    justifyContent: "center",
    alignItems: "center",
  },

  methodInfo: {
    flex: 1,
    marginLeft: 14,
  },

  methodTitle: {
    color: "#E5C35A",
    fontSize: 16,
    fontWeight: "900",
  },

  methodText: {
    color: "#B99B49",
    fontSize: 13,
    marginTop: 3,
  },
});
