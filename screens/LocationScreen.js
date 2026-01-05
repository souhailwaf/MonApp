import * as Location from "expo-location";
import { View, Text, Button, StyleSheet } from "react-native";
import { useState } from "react";
import AppBar from "../components/AppBar";

export default function LocationScreen({ navigation }) {
  const [location, setLocation] = useState(null);

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return;

    const loc = await Location.getCurrentPositionAsync({});
    setLocation(loc.coords);
  };

  return (
    <View style={styles.container}>
      <AppBar title="Localisation" back />
      <View style={styles.content}>
        <Button title="Obtenir position" onPress={getLocation} />
        {location && (
          <View style={styles.locationInfo}>
            <Text>Lat: {location.latitude}</Text>
            <Text>Lng: {location.longitude}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  locationInfo: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
});

