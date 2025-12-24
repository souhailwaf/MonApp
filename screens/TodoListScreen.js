import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
import { useTodoStore } from "../store/useTodoStore";
import { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import { fetchTodos, clearTodosCache } from "../services/apiService";

export default function TodoListScreen({ navigation }) {
  const { todos, setTodos, setLoading, setError, loading, error } = useTodoStore();
  const [refreshing, setRefreshing] = useState(false);

  // Load todos on component mount
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedTodos = await fetchTodos();
      setTodos(fetchedTodos);
    } catch (err) {
      console.error("Error loading todos:", err);
      setError("Impossible de charger les tâches");
      // Set default todos if API fails
      setTodos([
        { id: 1, title: "Faire les courses", completed: false },
        { id: 2, title: "Sortir le chien", completed: false },
        { id: 3, title: "Coder une app RN", completed: false },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await clearTodosCache();
    await loadTodos();
    setRefreshing(false);
  };

  if (loading && !refreshing && todos.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 10 }}>Chargement des tâches...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <AppBar title="Mes tâches" />

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
            onPress={() =>
              navigation.navigate("Détails", item)
            }
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
            {item.userId && (
              <Text style={{ fontSize: 12, color: "#666", marginTop: 5 }}>
                Utilisateur: {item.userId}
              </Text>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
