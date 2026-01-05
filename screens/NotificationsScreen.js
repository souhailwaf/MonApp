import { View, Text, Button, StyleSheet, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import AppBar from "../components/AppBar";

// Le handler est obligatoire (sinon Android n'affiche rien)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function NotificationsScreen({ navigation }) {
  const requestPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    Alert.alert(
      status === "granted" ? "Permission accordée" : "Permission refusée"
    );
  };

  const sendTestNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Notification locale",
        body: "Ceci est une notification locale de test",
      },
      trigger: null, // immédiat
    });
  };

  return (
    <View style={styles.container}>
      <AppBar title="Notifications" back />
      <View style={styles.content}>
        <Text style={styles.title}>Gestion des notifications</Text>
        <View style={styles.spacer} />
        <Button
          title="Demander permission"
          onPress={requestPermission}
        />
        <View style={styles.spacer} />
        <Button
          title="Envoyer notification immédiate"
          onPress={sendTestNotification}
        />
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
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  spacer: {
    height: 15,
  },
});

