import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AppBar from "../components/AppBar";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function NativeFeaturesScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <AppBar title="Fonctionnalités natives" />
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Caméra")}
          style={[styles.button, { backgroundColor: theme.card }]}
        >
          <Text style={[styles.buttonText, { color: theme.text }]}>
            📷 Caméra
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Localisation")}
          style={[styles.button, { backgroundColor: theme.card }]}
        >
          <Text style={[styles.buttonText, { color: theme.text }]}>
            📍 Géolocalisation
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Contacts")}
          style={[styles.button, { backgroundColor: theme.card }]}
        >
          <Text style={[styles.buttonText, { color: theme.text }]}>
            👥 Contacts
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Notifications")}
          style={[styles.button, { backgroundColor: theme.card }]}
        >
          <Text style={[styles.buttonText, { color: theme.text }]}>
            🔔 Notifications
          </Text>
        </TouchableOpacity>
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
    gap: 15,
  },
  button: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
  },
});


