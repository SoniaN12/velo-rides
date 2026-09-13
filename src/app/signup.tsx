import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { API_URL } from "../utils/api";
import { router } from "expo-router";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    console.log("SIGNUP BUTTON PRESSED");

    if (
      !name.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      console.log("SIGNUP STOPPED: missing fields");

      if (typeof window !== "undefined") {
        window.alert("Please complete all fields.");
      } else {
        Alert.alert(
          "Missing Information",
          "Please complete all fields."
        );
      }

      return;
    }

    if (password.length < 6) {
      console.log("SIGNUP STOPPED: password too short");

      if (typeof window !== "undefined") {
        window.alert(
          "Password must contain at least 6 characters."
        );
      } else {
        Alert.alert(
          "Weak Password",
          "Password must contain at least 6 characters."
        );
      }

      return;
    }

    if (password !== confirmPassword) {
      console.log("SIGNUP STOPPED: passwords do not match");

      if (typeof window !== "undefined") {
        window.alert("Passwords do not match.");
      } else {
        Alert.alert(
          "Password Error",
          "Passwords do not match."
        );
      }

      return;
    }

    try {
      setLoading(true);

      console.log("SIGNUP REQUEST STARTING");
      console.log("API URL:", API_URL);
      console.log(
        "REGISTER URL:",
        `${API_URL}/api/auth/register`
      );

      const response = await fetch(
        `${API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password,
          }),
        }
      );

      console.log(
        "SIGNUP HTTP STATUS:",
        response.status
      );

      const data = await response.json();

      console.log(
        "SIGNUP RESPONSE DATA:",
        data
      );

      if (!response.ok) {
        const message =
          data.message ||
          "Unable to create account.";

        console.log(
          "SIGNUP FAILED:",
          message
        );

        if (typeof window !== "undefined") {
          window.alert(message);
        } else {
          Alert.alert(
            "Registration Failed",
            message
          );
        }

        return;
      }

      console.log(
        "SIGNUP SUCCESSFUL"
      );

      if (typeof window !== "undefined") {
        window.alert(
          "Account created successfully. Please sign in."
        );

        router.replace("/login");
      } else {
        Alert.alert(
          "Account Created",
          "Your Velo account was created successfully. Please sign in.",
          [
            {
              text: "Continue",
              onPress: () =>
                router.replace("/login"),
            },
          ]
        );
      }
    } catch (error) {
      console.error(
        "SIGNUP FETCH ERROR:",
        error
      );

      if (typeof window !== "undefined") {
        window.alert(
          "Could not connect to the Velo server."
        );
      } else {
        Alert.alert(
          "Connection Error",
          "Could not connect to the Velo server."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.logoCircle}>
        <Text style={styles.logo}>V</Text>
      </View>

      <Text style={styles.title}>
        Create Account
      </Text>

      <Text style={styles.subtitle}>
        Join Velo and start booking your rides.
      </Text>

      <Text style={styles.label}>
        Full Name
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your full name"
        placeholderTextColor="#B99B49"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />

      <Text style={styles.label}>
        Email
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#B99B49"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Text style={styles.label}>
        Password
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Create a password"
        placeholderTextColor="#B99B49"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Text style={styles.label}>
        Confirm Password
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Confirm your password"
        placeholderTextColor="#B99B49"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={[
          styles.button,
          loading && styles.disabledButton,
        ]}
        onPress={handleSignup}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator
            color="#140821"
          />
        ) : (
          <Text style={styles.buttonText}>
            Create Account
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          router.replace("/login")
        }
      >
        <Text style={styles.loginText}>
          Already have an account?{" "}
          <Text style={styles.loginHighlight}>
            Sign In
          </Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#140821",
  },

  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },

  logoCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#D6A51D",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 22,
  },

  logo: {
    color: "#140821",
    fontSize: 34,
    fontWeight: "900",
  },

  title: {
    color: "#E5C35A",
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 8,
  },

  subtitle: {
    color: "#B99B49",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 30,
  },

  label: {
    color: "#E5C35A",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 7,
  },

  input: {
    backgroundColor: "#321653",
    borderWidth: 1,
    borderColor: "#4B236B",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    color: "#E5C35A",
    fontSize: 16,
    marginBottom: 17,
  },

  button: {
    backgroundColor: "#D6A51D",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },

  disabledButton: {
    opacity: 0.7,
  },

  buttonText: {
    color: "#140821",
    fontSize: 17,
    fontWeight: "800",
  },

  loginText: {
    color: "#B99B49",
    textAlign: "center",
    marginTop: 24,
    fontSize: 15,
  },

  loginHighlight: {
    color: "#E5C35A",
    fontWeight: "700",
  },
});
