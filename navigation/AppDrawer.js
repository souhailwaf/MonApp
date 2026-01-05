import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AppStack from "./AppStack";
import ProfileScreen from "../screens/ProfileScreen";
import NativeFeaturesScreen from "../screens/NativeFeaturesScreen";

const Tab = createBottomTabNavigator();

export default function AppDrawer() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="TachesTab" 
        component={AppStack} 
        options={{ title: "Tâches" }}
      />
      <Tab.Screen 
        name="FonctionnalitésTab" 
        component={NativeFeaturesScreen}
        options={{ title: "Fonctionnalités" }}
      />
      <Tab.Screen 
        name="ProfilTab" 
        component={ProfileScreen}
        options={{ title: "Profil" }}
      />
    </Tab.Navigator>
  );
}
