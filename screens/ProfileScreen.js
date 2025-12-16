import { useContext } from "react";
import { View, Text, Button } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function ProfileScreen() {
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>👤 Profil</Text>
      <Text>Utilisateur: {user?.username}</Text>
      <Button title="Se déconnecter" onPress={logout} />
    </View>
  );
}
