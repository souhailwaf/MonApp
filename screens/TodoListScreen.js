import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl, TextInput, Button } from "react-native";
import { useTodoStore } from "../store/useTodoStore";
import { useEffect, useState, useContext } from "react";
import AppBar from "../components/AppBar";
import { AuthContext } from "../context/AuthContext";

export default function TodoListScreen({ navigation }) {
  const { todos, loading, error, loadTodos, addTodo, removeTodo, updateTodo } = useTodoStore();
  const { user } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState("");

  // Load todos on component mount
  useEffect(() => {
    if (user?.uid) {
      loadTodos(user.uid);
    }
  }, [user]);

  const onRefresh = async () => {
    setRefreshing(true);
    if (user?.uid) {
      await loadTodos(user.uid);
    }
    setRefreshing(false);
  };

  const handleAddTodo = async () => {
    if (!newTodoTitle.trim() || !user?.uid) return;
    
    await addTodo(user.uid, { title: newTodoTitle.trim() });
    setNewTodoTitle("");
  };

  const handleToggleComplete = async (todo) => {
    if (!user?.uid) return;
    await updateTodo(user.uid, todo.id, { completed: !todo.completed });
  };

  if (loading && !refreshing && todos.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 10 }}>Chargement des tâches...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Veuillez vous connecter</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <AppBar title="Mes tâches" />

      <View style={{ padding: 20 }}>
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <TextInput
            placeholder="Nouvelle tâche"
            value={newTodoTitle}
            onChangeText={setNewTodoTitle}
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: "#ccc",
              padding: 10,
              borderRadius: 5,
              marginRight: 10,
            }}
          />
          <Button title="Ajouter" onPress={handleAddTodo} />
        </View>

        {error && (
          <View style={{ backgroundColor: "#ffcccc", padding: 10, marginBottom: 10, borderRadius: 5 }}>
            <Text style={{ color: "red" }}>{error}</Text>
          </View>
        )}

        <FlatList
          data={todos}
          keyExtractor={(i) => i.id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#007AFF"]}
            />
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleToggleComplete(item)}
              onLongPress={() => {
                if (user?.uid) {
                  removeTodo(user.uid, item.id);
                }
              }}
              style={{
                padding: 10,
                marginVertical: 5,
                backgroundColor: "#f0f0f0",
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  textDecorationLine: item.completed ? "line-through" : "none",
                  opacity: item.completed ? 0.5 : 1,
                }}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
