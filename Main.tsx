import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeHeader from "./components/HomeHeader";
import HomeScreen from "./screens/HomeScreen";
import EditCounterScreen from "./screens/EditCounterScreen";
import HistoryScreen from "./screens/HistoryScreen";

export type RootStackParamList = {
  Home: undefined;
  Edit: { id: number };
  History: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Main = () => {
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
            headerRight: () => <HomeHeader />,
            statusBarColor: "#020617",
            statusBarStyle: "light",
          }}
        />
        <Stack.Screen
          name="Edit"
          component={EditCounterScreen}
          options={{
            statusBarColor: "#020617",
            statusBarStyle: "light",
          }}
        />
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{
            statusBarColor: "#020617",
            statusBarStyle: "light",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
