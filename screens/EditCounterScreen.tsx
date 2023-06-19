import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Main";
import { useDispatch, useSelector } from "react-redux";
import { editCounter, selectCounters } from "../redux/counters/countersSlice";
import { useMemo, useState } from "react";

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
  const [counterPoints, setCounterPoints] = useState(counter?.points);

  const updateCounter = () => {
    if (!counterName || (!counterPoints && counterPoints !== 0)) {
      return;
    }

    dispatch(
      editCounter({
        id: router.params.id,
        name: counterName.trim(),
        points: counterPoints,
      })
    );

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
      <Text style={styles.inputLabel}>Points</Text>
      <TextInput
        style={styles.inputBox}
        onChangeText={(text) => setCounterPoints(parseInt(text))}
        value={counterPoints?.toString()}
        keyboardType="numeric"
      />
      <Button title="Save" onPress={updateCounter} />
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
  },
  inputBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    color: "#fff",
    marginBottom: 20,
  },
});
