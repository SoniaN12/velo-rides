import React, {
  useCallback,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from "react-native";
import { API_URL } from "../utils/api";

import {
  router,
  useFocusEffect,
} from "expo-router";

import { Ionicons } from "@expo/vector-icons";

import BottomNav from "../components/BottomNav";

import {
  getToken,
} from "../utils/authStorage";

type Ride = {
  _id: string;
  pickup: string;
  destination: string;
  rideType: string;
  fare: number;
  paymentMethod: string;
  paymentStatus: string;
  rideStatus: string;
  createdAt: string;
};

export default function RidesScreen() {
  const [rides, setRides] =
    useState<Ride[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  // LOAD ONLY THE LOGGED-IN USER'S RIDES
  const loadRides = async (
    showLoader = true
  ) => {
    try {
      if (showLoader) {
        setLoading(true);
      }

      const token =
        await getToken();

      if (!token) {
        setRides([]);

        Alert.alert(
          "No Saved Session",
          "Your account session could not be found."
        );

        return;
      }

      const response =
        await fetch(
          `${API_URL}/api/rides/my-rides`,
          {
            method: "GET",

            headers: {
              Authorization:
                `Bearer ${token}`,

              "Content-Type":
                "application/json",
            },
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        Alert.alert(
          "Could Not Load Rides",
          data.message ||
            "Please try again."
        );

        return;
      }

      setRides(
        data.rides || []
      );
    } catch (error) {
      console.error(
        "Could not load rides:",
        error
      );

      Alert.alert(
        "Connection Error",
        "Could not connect to the Velo server."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // RELOAD RIDES EVERY TIME USER OPENS MY RIDES
  useFocusEffect(
    useCallback(() => {
      loadRides();
    }, [])
  );

  const refreshRides = () => {
    setRefreshing(true);

    loadRides(false);
  };

  const formatDate = (
    date: string
  ) => {
    return new Date(
      date
    ).toLocaleString();
  };

  const getStatusIcon = (
    status: string
  ) => {
    switch (status) {
      case "Completed":
        return "checkmark-circle";

      case "Cancelled":
        return "close-circle";

      case "In Progress":
        return "car";

      case "Driver Found":
        return "person-circle";

      default:
        return "search";
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={
          styles.content
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={
              refreshRides
            }
            tintColor="#D6A51D"
          />
        }
      >
        <View style={styles.header}>
          <View>
            <Text
              style={styles.title}
            >
              My Rides
            </Text>

            <Text
              style={styles.subtitle}
            >
              Your saved Velo rides
            </Text>
          </View>

          <TouchableOpacity
            style={
              styles.refreshButton
            }
            onPress={() =>
              loadRides()
            }
          >
            <Ionicons
              name="refresh"
              size={23}
              color="#E5C35A"
            />
          </TouchableOpacity>
        </View>

        {loading ? (
          <View
            style={
              styles.loadingContainer
            }
          >
            <ActivityIndicator
              size="large"
              color="#D6A51D"
            />

            <Text
              style={
                styles.loadingText
              }
            >
              Loading your rides...
            </Text>
          </View>
        ) : rides.length === 0 ? (
          <View
            style={styles.emptyCard}
          >
            <View
              style={styles.emptyIcon}
            >
              <Ionicons
                name="navigate-outline"
                size={38}
                color="#D6A51D"
              />
            </View>

            <Text
              style={
                styles.emptyTitle
              }
            >
              No rides yet
            </Text>

            <Text
              style={styles.emptyText}
            >
              Your booked rides will
              automatically appear here.
            </Text>

            <TouchableOpacity
              style={styles.bookButton}
              onPress={() =>
                router.push("/home")
              }
            >
              <Text
                style={
                  styles.bookButtonText
                }
              >
                Book a Ride
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text
              style={styles.rideCount}
            >
              {rides.length}{" "}
              {rides.length === 1
                ? "ride"
                : "rides"}
            </Text>

            {rides.map((ride) => (
              <View
                key={ride._id}
                style={styles.rideCard}
              >
                <View
                  style={
                    styles.cardHeader
                  }
                >
                  <View
                    style={
                      styles.rideTypeContainer
                    }
                  >
                    <Ionicons
                      name={
                        ride.rideType ===
                        "Moto"
                          ? "bicycle"
                          : "car"
                      }
                      size={22}
                      color="#140821"
                    />

                    <Text
                      style={
                        styles.rideType
                      }
                    >
                      Velo{" "}
                      {ride.rideType}
                    </Text>
                  </View>

                  <View
                    style={
                      styles.statusContainer
                    }
                  >
                    <Ionicons
                      name={
                        getStatusIcon(
                          ride.rideStatus
                        )
                      }
                      size={16}
                      color="#D6A51D"
                    />

                    <Text
                      style={
                        styles.status
                      }
                    >
                      {
                        ride.rideStatus
                      }
                    </Text>
                  </View>
                </View>

                <View
                  style={
                    styles.routeContainer
                  }
                >
                  <View
                    style={
                      styles.routeIconColumn
                    }
                  >
                    <Ionicons
                      name="radio-button-on"
                      size={17}
                      color="#D6A51D"
                    />

                    <View
                      style={
                        styles.routeLine
                      }
                    />

                    <Ionicons
                      name="location"
                      size={19}
                      color="#D6A51D"
                    />
                  </View>

                  <View
                    style={
                      styles.routeTextColumn
                    }
                  >
                    <Text
                      style={
                        styles.routeLabel
                      }
                    >
                      Pickup
                    </Text>

                    <Text
                      style={
                        styles.route
                      }
                    >
                      {ride.pickup}
                    </Text>

                    <View
                      style={
                        styles.routeSpace
                      }
                    />

                    <Text
                      style={
                        styles.routeLabel
                      }
                    >
                      Destination
                    </Text>

                    <Text
                      style={
                        styles.route
                      }
                    >
                      {
                        ride.destination
                      }
                    </Text>
                  </View>
                </View>

                <View
                  style={styles.divider}
                />

                <View
                  style={styles.infoRow}
                >
                  <View>
                    <Text
                      style={
                        styles.infoLabel
                      }
                    >
                      Fare
                    </Text>

                    <Text
                      style={styles.fare}
                    >
                      {ride.fare.toLocaleString()}{" "}
                      RWF
                    </Text>
                  </View>

                  <View
                    style={
                      styles.rightInfo
                    }
                  >
                    <Text
                      style={
                        styles.infoLabel
                      }
                    >
                      Payment
                    </Text>

                    <Text
                      style={
                        styles.payment
                      }
                    >
                      {
                        ride.paymentMethod
                      }
                    </Text>
                  </View>
                </View>

                <View
                  style={
                    styles.bottomRow
                  }
                >
                  <Text
                    style={
                      styles.paymentStatus
                    }
                  >
                    {
                      ride.paymentStatus
                    }
                  </Text>

                  <Text
                    style={styles.date}
                  >
                    {formatDate(
                      ride.createdAt
                    )}
                  </Text>
                </View>
              </View>
            ))}

            <TouchableOpacity
              style={
                styles.bookAnotherButton
              }
              onPress={() =>
                router.push("/home")
              }
            >
              <Ionicons
                name="add-circle-outline"
                size={21}
                color="#140821"
              />

              <Text
                style={
                  styles.bookButtonText
                }
              >
                Book Another Ride
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>

      <BottomNav active="rides" />
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#140821",
    },

    content: {
      padding: 20,
      paddingTop: 45,
      paddingBottom: 125,
    },

    header: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems: "center",
      marginBottom: 28,
    },

    title: {
      color: "#E5C35A",
      fontSize: 30,
      fontWeight: "bold",
    },

    subtitle: {
      color: "#B99B49",
      fontSize: 14,
      marginTop: 4,
    },

    refreshButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: "#24103D",
      borderWidth: 1,
      borderColor: "#4B236B",
      alignItems: "center",
      justifyContent: "center",
    },

    loadingContainer: {
      alignItems: "center",
      paddingVertical: 80,
    },

    loadingText: {
      color: "#B99B49",
      marginTop: 15,
    },

    emptyCard: {
      backgroundColor: "#24103D",
      borderWidth: 1,
      borderColor: "#4B236B",
      borderRadius: 20,
      padding: 28,
      alignItems: "center",
    },

    emptyIcon: {
      width: 75,
      height: 75,
      borderRadius: 38,
      backgroundColor: "#321653",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 18,
    },

    emptyTitle: {
      color: "#E5C35A",
      fontSize: 22,
      fontWeight: "bold",
    },

    emptyText: {
      color: "#B99B49",
      textAlign: "center",
      lineHeight: 21,
      marginTop: 9,
      marginBottom: 24,
    },

    rideCount: {
      color: "#B99B49",
      marginBottom: 12,
      fontWeight: "600",
    },

    rideCard: {
      backgroundColor: "#24103D",
      borderWidth: 1,
      borderColor: "#4B236B",
      borderRadius: 20,
      padding: 19,
      marginBottom: 17,
    },

    cardHeader: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      alignItems: "center",
      marginBottom: 20,
    },

    rideTypeContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#C69214",
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 12,
    },

    rideType: {
      color: "#140821",
      fontWeight: "bold",
      marginLeft: 7,
    },

    statusContainer: {
      flexDirection: "row",
      alignItems: "center",
    },

    status: {
      color: "#D6A51D",
      fontWeight: "600",
      marginLeft: 5,
      fontSize: 13,
    },

    routeContainer: {
      flexDirection: "row",
    },

    routeIconColumn: {
      width: 28,
      alignItems: "center",
      paddingTop: 2,
    },

    routeLine: {
      width: 2,
      height: 37,
      backgroundColor: "#4B236B",
      marginVertical: 3,
    },

    routeTextColumn: {
      flex: 1,
      paddingLeft: 7,
    },

    routeLabel: {
      color: "#B99B49",
      fontSize: 11,
      textTransform: "uppercase",
      marginBottom: 3,
    },

    route: {
      color: "#E5C35A",
      fontSize: 15,
      fontWeight: "600",
    },

    routeSpace: {
      height: 18,
    },

    divider: {
      height: 1,
      backgroundColor: "#4B236B",
      marginVertical: 18,
    },

    infoRow: {
      flexDirection: "row",
      justifyContent:
        "space-between",
    },

    infoLabel: {
      color: "#B99B49",
      fontSize: 11,
      marginBottom: 4,
    },

    fare: {
      color: "#E5C35A",
      fontSize: 17,
      fontWeight: "bold",
    },

    rightInfo: {
      alignItems: "flex-end",
    },

    payment: {
      color: "#E5C35A",
      fontWeight: "600",
    },

    bottomRow: {
      flexDirection: "row",
      justifyContent:
        "space-between",
      marginTop: 15,
      alignItems: "center",
    },

    paymentStatus: {
      color: "#D6A51D",
      fontSize: 12,
      fontWeight: "bold",
    },

    date: {
      color: "#B99B49",
      fontSize: 11,
    },

    bookButton: {
      backgroundColor: "#C69214",
      paddingVertical: 15,
      paddingHorizontal: 25,
      borderRadius: 14,
    },

    bookAnotherButton: {
      backgroundColor: "#C69214",
      paddingVertical: 16,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      gap: 8,
      marginTop: 5,
    },

    bookButtonText: {
      color: "#140821",
      fontWeight: "bold",
      fontSize: 15,
    },
  });
