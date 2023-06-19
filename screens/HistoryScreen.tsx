import { StyleSheet, Text, View, FlatList } from "react-native";
import { selectHistory } from "../redux/historySlice";
import { useSelector } from "react-redux";

const HistoryScreen = () => {
  const counters = useSelector(selectHistory);

  return (
    <FlatList
      data={counters}
      renderItem={({ item }) => (
        <View style={styles.container}>
          <Text style={styles.text}>
            {item.name} - {item.points}
          </Text>
        </View>
      )}
    />
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    padding: 10,
    marginVertical: 5,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  text: {
    color: "#cbd5e1",
    fontSize: 16,
  },
});
