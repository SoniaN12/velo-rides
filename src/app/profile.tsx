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

export default function ProfileScreen() {
  const [name, setName] =
    useState("Velo User");

  const [email, setEmail] =
    useState("user@velo.com");

  const [phone, setPhone] =
    useState("+250 78 000 0000");

  const saveProfile = () => {
    Alert.alert(
      "Profile Saved",
      "Your demo profile information has been updated."
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.page}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>
            Profile
          </Text>

          <Text style={styles.subtitle}>
            Manage your Velo account.
          </Text>

          <View style={styles.avatar}>
            <Ionicons
              name="person"
              size={50}
              color="#140821"
            />
          </View>

          <Text style={styles.label}>
            FULL NAME
          </Text>

          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>
            EMAIL
          </Text>

          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          <Text style={styles.label}>
            PHONE NUMBER
          </Text>

          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
          />

          <TouchableOpacity
            style={styles.saveButton}
            onPress={saveProfile}
          >
            <Ionicons
              name="save"
              size={20}
              color="#140821"
            />

            <Text style={styles.saveText}>
              Save Profile
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.setting}
            onPress={() =>
              Alert.alert(
                "Safety",
                "Emergency contacts and ride sharing will be added here."
              )
            }
          >
            <Ionicons
              name="shield-checkmark"
              size={22}
              color="#D6A51D"
            />

            <Text style={styles.settingText}>
              Safety Settings
            </Text>

            <Ionicons
              name="chevron-forward"
              color="#B99B49"
              size={20}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.logout}
            onPress={() =>
              router.replace("/")
            }
          >
            <Ionicons
              name="log-out-outline"
              size={21}
              color="#D6A51D"
            />

            <Text style={styles.logoutText}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </ScrollView>

        <BottomNav active="profile" />
      </View>
    </SafeAreaView>
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

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    backgroundColor: "#C69214",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    borderWidth: 3,
    borderColor: "#D6A51D",
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
    padding: 15,
    fontSize: 16,
    marginBottom: 18,
  },

  saveButton: {
    backgroundColor: "#C69214",
    borderRadius: 15,
    padding: 17,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 25,
  },

  saveText: {
    color: "#140821",
    fontWeight: "900",
    fontSize: 16,
  },

  setting: {
    backgroundColor: "#321653",
    borderWidth: 1,
    borderColor: "#4B236B",
    borderRadius: 15,
    padding: 17,
    flexDirection: "row",
    alignItems: "center",
  },

  settingText: {
    flex: 1,
    color: "#E5C35A",
    marginLeft: 12,
    fontWeight: "800",
  },

  logout: {
    borderWidth: 1,
    borderColor: "#C69214",
    padding: 16,
    borderRadius: 15,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },

  logoutText: {
    color: "#D6A51D",
    fontWeight: "900",
  },
});
