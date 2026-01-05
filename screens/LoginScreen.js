import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "../services/firebase";
import { ThemeContext } from "../context/ThemeContext";

WebBrowser.maybeCompleteAuthSession();

const WEB_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;

export default function LoginScreen() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Google Auth (WEB - Expo) - only initialize if client ID exists
  const [request, response, promptAsync] = WEB_CLIENT_ID 
    ? Google.useAuthRequest({
        clientId: WEB_CLIENT_ID,
        responseType: "id_token",
        scopes: ["profile", "email"],
      })
    : [null, null, null];

  // Handle Google response
  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).catch(() =>
        setError("Erreur Google Sign-In")
      );
    }
  }, [response]);

  const login = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.log("Error logging in:", e.code, e.message);
      if (e.code === "auth/user-not-found") {
        setError("Compte non trouvé");
      } else if (e.code === "auth/wrong-password") {
        setError("Mot de passe incorrect");
      } else if (e.code === "auth/invalid-email") {
        setError("Email invalide");
      } else {
        setError("Erreur : " + e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async () => {
    setError("");
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.log("Error creating account:", e.code, e.message);
      if (e.code === "auth/email-already-in-use") {
        setError("Cet email est déjà utilisé");
      } else if (e.code === "auth/weak-password") {
        setError("Mot de passe trop faible (min 6 caractères)");
      } else if (e.code === "auth/invalid-email") {
        setError("Email invalide");
      } else {
        setError("Erreur : " + e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.background, justifyContent: "center", padding: 24 },
      ]}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: theme.text,
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Connexion
      </Text>

      {error !== "" && (
        <Text style={{ color: "red", textAlign: "center", marginBottom: 10 }}>
          {error}
        </Text>
      )}

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 12,
          marginBottom: 12,
          color: theme.text,
        }}
        placeholderTextColor="#999"
      />

      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 12,
          marginBottom: 12,
          color: theme.text,
        }}
        placeholderTextColor="#999"
      />

      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <TouchableOpacity
            onPress={login}
            style={{
              backgroundColor: theme.primary,
              padding: 14,
              borderRadius: 8,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "#fff", textAlign: "center", fontWeight: "600" }}>
              Se connecter
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={register}
            style={{
              borderWidth: 1,
              borderColor: theme.primary,
              padding: 14,
              borderRadius: 8,
              marginBottom: 20,
            }}
          >
            <Text style={{ color: theme.primary, textAlign: "center" }}>
              Créer un compte
            </Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity
        disabled={!request || !WEB_CLIENT_ID}
        onPress={() => promptAsync()}
        style={{
          backgroundColor: WEB_CLIENT_ID ? "#DB4437" : "#ccc",
          padding: 14,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>
          {WEB_CLIENT_ID ? "Continuer avec Google" : "Google Sign-In non configuré"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={toggleTheme} style={{ marginTop: 30 }}>
        <Text style={{ textAlign: "center", color: theme.primary }}>
          Changer le thème
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
