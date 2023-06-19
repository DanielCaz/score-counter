import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { selectCounters } from "../redux/countersSlice";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Main";
import PointsModal from "../components/PointsModal";
import { useState } from "react";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;
type NoteScreenNavigationProp = HomeScreenProps["navigation"];

const HomeScreen = () => {
  const navigation = useNavigation<NoteScreenNavigationProp>();

  const counters = useSelector(selectCounters);

  const [editIndex, setEditIndex] = useState(-1);

  return (
    <FlatList
      data={counters}
      renderItem={({ item, index }) => (
        <View style={styles.container}>
          <View style={styles.counterHeader}>
            <Text style={styles.counterName}>{item.name}</Text>
            <TouchableOpacity
              style={styles.counterEditContainer}
              onPress={() => navigation.navigate("Edit", { id: item.id })}
            >
              <Ionicons
                style={styles.counterEdit}
                name="ios-pencil"
                size={24}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.counterPointsContainer}
            onPress={() => setEditIndex(index)}
          >
            <Text style={styles.counterPoints}>{item.points}</Text>
          </TouchableOpacity>
          <PointsModal
            counter={item}
            visible={editIndex === index}
            setVisible={(visible: boolean) =>
              setEditIndex(visible ? index : -1)
            }
          />
        </View>
      )}
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#334155",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  counterName: {
    color: "#fff",
    fontSize: 20,
    paddingLeft: 15,
  },
  counterEditContainer: {
    padding: 15,
  },
  counterEdit: {
    color: "#fff",
  },
  counterPointsContainer: {
    flex: 1,
    width: "100%",
    marginTop: 20,
  },
  counterPoints: {
    color: "#fff",
    fontSize: 75,
    height: "100%",
    textAlign: "center",
    textAlignVertical: "center",
  },
  counterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
});
