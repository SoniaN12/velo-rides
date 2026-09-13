import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "veloToken";
const USER_KEY = "veloUser";

export async function saveLogin(
  token: string,
  user: any
) {
  try {
    if (!token) {
      console.log("ERROR: No token received by saveLogin");
      return false;
    }

    if (Platform.OS === "web") {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(
        USER_KEY,
        JSON.stringify(user)
      );

      console.log("VELO WEB LOGIN SAVED");
      return true;
    }

    await AsyncStorage.setItem(
      TOKEN_KEY,
      token
    );

    await AsyncStorage.setItem(
      USER_KEY,
      JSON.stringify(user)
    );

    const testToken =
      await AsyncStorage.getItem(
        TOKEN_KEY
      );

    console.log(
      "VELO ANDROID LOGIN SAVED:",
      Boolean(testToken)
    );

    return Boolean(testToken);
  } catch (error) {
    console.error(
      "Could not save login:",
      error
    );

    return false;
  }
}

export async function getToken() {
  try {
    if (Platform.OS === "web") {
      const token =
        localStorage.getItem(TOKEN_KEY);

      console.log(
        "WEB TOKEN FOUND:",
        Boolean(token)
      );

      return token;
    }

    const token =
      await AsyncStorage.getItem(
        TOKEN_KEY
      );

    console.log(
      "ANDROID TOKEN FOUND:",
      Boolean(token)
    );

    return token;
  } catch (error) {
    console.error(
      "Could not recover token:",
      error
    );

    return null;
  }
}

export async function getSavedUser() {
  try {
    let storedUser: string | null;

    if (Platform.OS === "web") {
      storedUser =
        localStorage.getItem(USER_KEY);
    } else {
      storedUser =
        await AsyncStorage.getItem(
          USER_KEY
        );
    }

    if (!storedUser) {
      return null;
    }

    return JSON.parse(storedUser);
  } catch (error) {
    console.error(
      "Could not recover user:",
      error
    );

    return null;
  }
}

export async function clearLogin() {
  try {
    if (Platform.OS === "web") {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      return;
    }

    await AsyncStorage.multiRemove([
      TOKEN_KEY,
      USER_KEY,
    ]);

    console.log("VELO LOGIN CLEARED");
  } catch (error) {
    console.error(
      "Could not clear login:",
      error
    );
  }
}
