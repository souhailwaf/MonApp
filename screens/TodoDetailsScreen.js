import { View, Text, Button } from "react-native";
import { useTodoStore } from "../store/useTodoStore";

export default function TodoDetailsScreen({ route, navigation }) {
  const { id, title } = route.params;
  const { removeTodo } = useTodoStore();

  const handleDelete = () => {
    removeTodo(id);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24 }}>{title}</Text>

      <Button
        title="Supprimer"
        color="red"
        onPress={handleDelete}
      />
    </View>
  );
}
