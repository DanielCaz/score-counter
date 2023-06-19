import { useNavigation, useRoute } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Main";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCounter,
  editCounter,
  selectCounters,
} from "../redux/countersSlice";
import { useMemo, useState } from "react";
import { playerColors } from "../playerColors";
import { Ionicons } from "@expo/vector-icons";

type EditCounterScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Edit"
>;
type EditCounterScreenRouteProp = EditCounterScreenProps["route"];
type EditCounterScreenNavigationProp = EditCounterScreenProps["navigation"];

const EditCounterScreen = () => {
  const router = useRoute<EditCounterScreenRouteProp>();
  const navigation = useNavigation<EditCounterScreenNavigationProp>();

  const counters = useSelector(selectCounters);
  const counter = useMemo(
    () => counters.find((counter) => counter.id === router.params.id),
    []
  );
  const dispatch = useDispatch();

  const [counterName, setCounterName] = useState(counter?.name);
  const [counterColor, setCounterColor] = useState(counter?.color);

  const handleUpdate = () => {
    if (!counterName) {
      return;
    }

    dispatch(
      editCounter({
        ...counter,
        name: counterName.trim(),
        color: counterColor,
      })
    );

    navigation.goBack();
  };

  const handleDelete = () => {
    dispatch(deleteCounter(counter?.id));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.inputLabel}>Name</Text>
      <TextInput
        style={styles.inputBox}
        onChangeText={setCounterName}
        value={counterName}
      />
      <Text style={styles.inputLabel}>Color</Text>
      <View style={styles.colorBar}>
        {playerColors.map((color) => (
          <TouchableOpacity
            key={color}
            onPress={() => setCounterColor(color)}
            style={{ ...styles.colorItem, backgroundColor: color }}
          >
            {counterColor === color && (
              <Ionicons name="ios-checkmark" size={24} color="#fff" />
            )}
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.buttons}>
        <Button title="Delete" onPress={handleDelete} color="#f43f5e" />
        <Button title="Save" onPress={handleUpdate} color="#0891b2" />
      </View>
    </View>
  );
};

export default EditCounterScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  inputLabel: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 5,
  },
  colorBar: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  colorItem: {
    width: 50,
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  inputBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    color: "#fff",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});
