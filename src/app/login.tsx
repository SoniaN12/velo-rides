import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { saveLogin, getToken } from "../utils/authStorage";

const API_URL = "http://192.168.0.108:5000";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    console.log("=== VELO LOGIN BUTTON PRESSED ===");
    if (!email.trim() || !password.trim()) {
      Alert.alert(
        "Missing Details",
        "Please enter your email and password."
      );
      return;
    }

    try {
      setLoading(true);

      console.log("Sending login request to backend...");

      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert(
          "Login Failed",
          data.message || "Invalid email or password."
        );
        return;
      }

      if (!data.token) {
        Alert.alert(
          "Login Error",
          "The server did not return a login token."
        );
        return;
      }

      // SAVE SESSION ON ANDROID / IOS / WEB
      console.log("Backend login successful, saving token...");
      
      await saveLogin(
        data.token,
        data.user
      );

      const savedToken = await getToken();

      console.log(
        "VELO LOGIN SAVED SUCCESSFULLY"
      );

      console.log(
        "TOKEN AVAILABLE AFTER LOGIN:",
        Boolean(savedToken)
      );

      if (!savedToken) {
        Alert.alert(
          "Session Storage Error",
          "Login succeeded but the session could not be saved on this device."
        );
        return;
      }

      console.log("LOGIN COMPLETE - GOING TO HOME");
      router.replace("/home");

    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      Alert.alert(
        "Connection Error",
        "Could not connect to the Velo server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoCircle}>
          <Ionicons
            name="navigate"
            size={42}
            color="#140821"
          />
        </View>

        <Text style={styles.logo}>
          VELO
        </Text>

        <Text style={styles.title}>
          Welcome Back
        </Text>

        <Text style={styles.subtitle}>
          Sign in to continue with Velo
        </Text>

        <Text style={styles.label}>
          Email
        </Text>

        <View style={styles.inputContainer}>
          <Ionicons
            name="mail-outline"
            size={20}
            color="#D6A51D"
          />

          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#8F793D"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <Text style={styles.label}>
          Password
        </Text>

        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#D6A51D"
          />

          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#8F793D"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />

          <TouchableOpacity
            onPress={() =>
              setShowPassword(!showPassword)
            }
          >
            <Ionicons
              name={
                showPassword
                  ? "eye-off-outline"
                  : "eye-outline"
              }
              size={21}
              color="#D6A51D"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator
              color="#140821"
            />
          ) : (
            <Text
              style={styles.loginButtonText}
            >
              Sign In
            </Text>
          )}
        </TouchableOpacity>

        <View style={styles.signupRow}>
          <Text style={styles.signupText}>
            Don't have an account?{" "}
          </Text>

          <TouchableOpacity
            onPress={() =>
              router.push("/signup")
            }
          >
            <Text style={styles.signupLink}>
              Create Account
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#140821",
  },

  content: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
  },

  logoCircle: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "#C69214",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  logo: {
    color: "#D6A51D",
    textAlign: "center",
    fontSize: 27,
    fontWeight: "900",
    letterSpacing: 5,
    marginBottom: 35,
  },

  title: {
    color: "#E5C35A",
    fontSize: 31,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    color: "#B99B49",
    fontSize: 15,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 35,
  },

  label: {
    color: "#E5C35A",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#321653",
    borderWidth: 1,
    borderColor: "#4B236B",
    borderRadius: 14,
    paddingHorizontal: 15,
    marginBottom: 20,
  },

  input: {
    flex: 1,
    color: "#E5C35A",
    paddingVertical: 15,
    paddingHorizontal: 12,
    fontSize: 16,
  },

  loginButton: {
    backgroundColor: "#C69214",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 12,
  },

  loginButtonText: {
    color: "#140821",
    fontSize: 17,
    fontWeight: "bold",
  },

  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 28,
  },

  signupText: {
    color: "#B99B49",
  },

  signupLink: {
    color: "#D6A51D",
    fontWeight: "bold",
  },
});
