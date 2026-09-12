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

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = () => {
    if (
      !name.trim() ||
      !phone.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      Alert.alert(
        "Missing information",
        "Please complete all fields."
      );

      return;
    }

    Alert.alert(
      "Account Created",
      "Your demo Velo account was created successfully.",
      [
        {
          text: "Continue",
          onPress: () =>
            router.replace("/home"),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity
          style={styles.back}
          onPress={() =>
            router.back()
          }
        >
          <Ionicons
            name="arrow-back"
            size={20}
            color="#D6A51D"
          />

          <Text style={styles.backText}>
            Back
          </Text>
        </TouchableOpacity>

        <Text style={styles.title}>
          Create Account
        </Text>

        <Text style={styles.subtitle}>
          Join Velo and start your journey.
        </Text>

        <Field
          label="FULL NAME"
          value={name}
          setValue={setName}
          placeholder="Your name"
        />

        <Field
          label="PHONE NUMBER"
          value={phone}
          setValue={setPhone}
          placeholder="+250..."
        />

        <Field
          label="EMAIL"
          value={email}
          setValue={setEmail}
          placeholder="you@example.com"
        />

        <Text style={styles.label}>
          PASSWORD
        </Text>

        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Create password"
          placeholderTextColor="#9F8545"
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.button}
          onPress={signup}
        >
          <Text style={styles.buttonText}>
            Create Account
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function Field({
  label,
  value,
  setValue,
  placeholder,
}: any) {
  return (
    <>
      <Text style={styles.label}>
        {label}
      </Text>

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        placeholderTextColor="#9F8545"
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#140821",
  },

  content: {
    padding: 25,
    paddingBottom: 50,
  },

  back: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginBottom: 30,
  },

  backText: {
    color: "#D6A51D",
    fontWeight: "800",
  },

  title: {
    color: "#E5C35A",
    fontSize: 32,
    fontWeight: "900",
  },

  subtitle: {
    color: "#B99B49",
    marginTop: 7,
    marginBottom: 30,
  },

  label: {
    color: "#C69214",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1,
    marginBottom: 7,
  },

  input: {
    backgroundColor: "#321653",
    color: "#E5C35A",
    borderWidth: 1,
    borderColor: "#4B236B",
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#C69214",
    borderRadius: 15,
    padding: 18,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#140821",
    fontSize: 17,
    fontWeight: "900",
  },
});
