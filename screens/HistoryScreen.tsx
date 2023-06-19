import { StyleSheet, Text, View, FlatList } from "react-native";
import { selectHistory } from "../redux/historySlice";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

const HistoryScreen = () => {
  const counters = useSelector(selectHistory);

  return (
    <FlatList
      data={counters}
      renderItem={({ item }) => (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.playerName}>{item.name}</Text>
            <Text style={styles.text}>
              {new Date(item.id).toLocaleTimeString()}
            </Text>
          </View>
          <Text style={styles.text}>
            {item.points.current} ({item.points.previous + " "}
            <Ionicons name="arrow-forward" size={12} color="white" />
            {" " + item.points.current})
          </Text>
        </View>
      )}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
    />
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e293b",
    padding: 10,
    gap: 7,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  playerName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  text: {
    fontSize: 16,
    color: "white",
  },
});
