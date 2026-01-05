import { CameraView, useCameraPermissions } from "expo-camera";
import { View, Text, Button, StyleSheet, Linking } from "react-native";
import { useRef } from "react";
import AppBar from "../components/AppBar";

export default function CameraScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  if (!permission) return <Text>Chargement...</Text>;

  // Permission refusée définitivement
  if (!permission.granted && !permission.canAskAgain) {
    return (
      <View style={styles.container}>
        <AppBar title="Caméra" back />
        <View style={styles.center}>
          <Text>Accès caméra refusé</Text>
          <Button
            title="Ouvrir les paramètres"
            onPress={() => Linking.openSettings()}
          />
        </View>
      </View>
    );
  }

  // Permission non accordée
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <AppBar title="Caméra" back />
        <View style={styles.center}>
          <Text>Accès caméra requis</Text>
          <Button title="Autoriser" onPress={requestPermission} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppBar title="Caméra" />
      <CameraView ref={cameraRef} style={styles.camera}>
        <View style={styles.controls}>
          <Button title="Retour" onPress={() => navigation.goBack()} />
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  controls: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
  },
});

