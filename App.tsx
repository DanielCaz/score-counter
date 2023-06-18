import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Menu, MenuItem } from "react-native-material-menu";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";

export type RootStackParamList = {
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [showMenu, setShowMenu] = useState(false);

  const hideMenu = () => setShowMenu(false);

  return (
    <NavigationContainer
      theme={{
        colors: {
          primary: "#cbd5e1",
          background: "#000",
          card: "#020617",
          text: "#fff",
          border: "#fff",
          notification: "#fff",
        },
        dark: false,
      }}
    >
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "",
            headerRight: () => (
              <View style={styles.header}>
                <TouchableOpacity onPress={() => {}} style={styles.headerItem}>
                  <Ionicons name="ios-add" size={24} color="#cbd5e1" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}} style={styles.headerItem}>
                  <Ionicons name="ios-time" size={24} color="#cbd5e1" />
                </TouchableOpacity>
                <Menu
                  visible={showMenu}
                  anchor={
                    <Ionicons
                      style={styles.headerItem}
                      name="ios-menu"
                      size={24}
                      color="#cbd5e1"
                      onPress={() => setShowMenu(true)}
                    />
                  }
                  style={styles.menu}
                  onRequestClose={hideMenu}
                >
                  <MenuItem onPress={hideMenu} textStyle={styles.menuItem}>
                    Reset All
                  </MenuItem>
                  <MenuItem onPress={hideMenu} textStyle={styles.menuItem}>
                    Delete All
                  </MenuItem>
                </Menu>
              </View>
            ),
            statusBarColor: "#020617",
            statusBarStyle: "light",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    gap: 25,
  },
  headerItem: {
    padding: 5,
  },
  menu: {
    backgroundColor: "#020617",
  },
  menuItem: {
    color: "#fff",
  },
});
