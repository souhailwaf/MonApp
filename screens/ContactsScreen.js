import * as Contacts from "expo-contacts";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { useState } from "react";
import AppBar from "../components/AppBar";

export default function ContactsScreen({ navigation }) {
  const [contacts, setContacts] = useState([]);

  const loadContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== "granted") return;

    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.Name],
    });

    setContacts(data);
  };

  return (
    <View style={styles.container}>
      <AppBar title="Contacts" back />
      <View style={styles.content}>
        <Button title="Charger contacts" onPress={loadContacts} />
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.contactItem}>
              <Text>{item.name}</Text>
            </View>
          )}
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
  contactItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});

