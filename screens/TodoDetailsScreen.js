import { View, Text, Button, Switch, ScrollView } from "react-native";
import { useTodoStore } from "../store/useTodoStore";
import { useState } from "react";

export default function TodoDetailsScreen({ route, navigation }) {
  const todo = route.params;
  const { updateTodo, removeTodo } = useTodoStore();
  const [completed, setCompleted] = useState(todo?.completed || false);

  const handleToggleComplete = (value) => {
    setCompleted(value);
    updateTodo(todo.id, { completed: value });
  };

  const handleDelete = () => {
    removeTodo(todo.id);
    navigation.goBack();
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
          {todo?.title}
        </Text>

        <View style={{ backgroundColor: "#f0f0f0", padding: 15, borderRadius: 5, marginBottom: 20 }}>
          <View style={{ marginBottom: 15 }}>
            <Text style={{ fontSize: 12, color: "#666", marginBottom: 5 }}>
              ID
            </Text>
            <Text style={{ fontSize: 16 }}>{todo?.id}</Text>
          </View>

          {todo?.userId && (
            <View style={{ marginBottom: 15 }}>
              <Text style={{ fontSize: 12, color: "#666", marginBottom: 5 }}>
                Utilisateur
              </Text>
              <Text style={{ fontSize: 16 }}>{todo?.userId}</Text>
            </View>
          )}

          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text style={{ fontSize: 14 }}>Marquer comme complété</Text>
            <Switch
              value={completed}
              onValueChange={handleToggleComplete}
              trackColor={{ false: "#767577", true: "#81c784" }}
              thumbColor={completed ? "#4caf50" : "#f4f3f4"}
            />
          </View>
        </View>

        <View style={{ gap: 10 }}>
          <Button
            title="Supprimer cette tâche"
            color="red"
            onPress={handleDelete}
          />
          <Button
            title="Retour"
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </ScrollView>
  );
}
