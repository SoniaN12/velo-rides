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
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email.trim()) {
      Alert.alert(
        "Email required",
        "Please enter your email address."
      );
      return;
    }

    if (!password.trim()) {
      Alert.alert(
        "Password required",
        "Please enter your password."
      );
      return;
    }

    // Demo login
    router.replace("/home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.content}>

          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons
              name="arrow-back"
              size={21}
              color="#D6A51D"
            />

            <Text style={styles.backText}>
              Back
            </Text>
          </TouchableOpacity>

          {/* Logo */}
          <View style={styles.logoSection}>
            <View style={styles.logoCircle}>
              <Ionicons
                name="bicycle"
                size={42}
                color="#140821"
              />
            </View>

            <Text style={styles.logo}>
              VELO
            </Text>

            <Text style={styles.logoSub}>
              RIDES
            </Text>
          </View>

          {/* Login Header */}
          <Text style={styles.title}>
            Welcome back
          </Text>

          <Text style={styles.subtitle}>
            Sign in to continue your journey with Velo.
          </Text>

          {/* Login Form */}
          <View style={styles.formCard}>

            <Text style={styles.label}>
              EMAIL ADDRESS
            </Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={21}
                color="#D6A51D"
              />

              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                placeholderTextColor="#8F7940"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <Text style={styles.label}>
              PASSWORD
            </Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={21}
                color="#D6A51D"
              />

              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor="#8F7940"
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
                  size={22}
                  color="#C69214"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.forgotButton}>
              <Text style={styles.forgotText}>
                Forgot password?
              </Text>
            </TouchableOpacity>

            {/* Sign In */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
            >
              <Text style={styles.loginText}>
                Sign In
              </Text>

              <Ionicons
                name="arrow-forward"
                size={21}
                color="#140821"
              />
            </TouchableOpacity>

          </View>

          {/* Demo Notice */}
          <View style={styles.demoBox}>
            <Ionicons
              name="information-circle-outline"
              size={21}
              color="#D6A51D"
            />

            <Text style={styles.demoText}>
              Demo mode: enter any email and password to sign in.
            </Text>
          </View>

          {/* Sign Up */}
          <View style={styles.signupRow}>
            <Text style={styles.signupText}>
              Don't have an account?
            </Text>

            <TouchableOpacity>
              <Text style={styles.signupLink}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#140821",
  },

  keyboardView: {
    flex: 1,
  },

  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 10,
    paddingBottom: 25,
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 7,
    marginBottom: 18,
  },

  backText: {
    color: "#D6A51D",
    fontSize: 15,
    fontWeight: "800",
  },

  logoSection: {
    alignItems: "center",
    marginBottom: 20,
  },

  logoCircle: {
    width: 78,
    height: 78,
    borderRadius: 39,

    backgroundColor: "#C69214",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 3,
    borderColor: "#D6A51D",

    marginBottom: 12,
  },

  logo: {
    color: "#E5C35A",

    fontSize: 28,
    fontWeight: "900",

    letterSpacing: 6,
  },

  logoSub: {
    color: "#C69214",

    fontSize: 11,
    fontWeight: "900",

    letterSpacing: 6,

    marginTop: 2,
  },

  title: {
    color: "#E5C35A",

    fontSize: 31,
    fontWeight: "900",

    textAlign: "center",
  },

  subtitle: {
    color: "#B99B49",

    fontSize: 14,
    lineHeight: 21,

    textAlign: "center",

    marginTop: 7,
    marginBottom: 22,
  },

  formCard: {
    backgroundColor: "#24103D",

    borderRadius: 20,

    padding: 20,

    borderWidth: 1,
    borderColor: "#4B236B",
  },

  label: {
    color: "#C69214",

    fontSize: 11,
    fontWeight: "900",

    letterSpacing: 1,

    marginBottom: 8,
  },

  inputContainer: {
    backgroundColor: "#321653",

    borderRadius: 14,

    borderWidth: 1,
    borderColor: "#4B236B",

    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 15,

    marginBottom: 18,
  },

  input: {
    flex: 1,

    color: "#E5C35A",

    fontSize: 16,

    paddingVertical: 15,
    paddingHorizontal: 12,
  },

  forgotButton: {
    alignSelf: "flex-end",
    marginTop: -5,
    marginBottom: 20,
  },

  forgotText: {
    color: "#D6A51D",
    fontSize: 13,
    fontWeight: "800",
  },

  loginButton: {
    backgroundColor: "#C69214",

    borderRadius: 15,

    paddingVertical: 17,

    flexDirection: "row",

    justifyContent: "center",
    alignItems: "center",

    gap: 9,

    borderWidth: 2,
    borderColor: "#D6A51D",
  },

  loginText: {
    color: "#140821",

    fontSize: 17,
    fontWeight: "900",
  },

  demoBox: {
    backgroundColor: "#24103D",

    borderRadius: 14,

    borderWidth: 1,
    borderColor: "#C69214",

    padding: 13,

    flexDirection: "row",
    alignItems: "center",

    marginTop: 17,
  },

  demoText: {
    color: "#B99B49",

    fontSize: 12,
    lineHeight: 18,

    flex: 1,

    marginLeft: 9,
  },

  signupRow: {
    flexDirection: "row",

    justifyContent: "center",
    alignItems: "center",

    marginTop: 18,

    gap: 5,
  },

  signupText: {
    color: "#B99B49",
    fontSize: 14,
  },

  signupLink: {
    color: "#D6A51D",
    fontSize: 14,
    fontWeight: "900",
  },

});
