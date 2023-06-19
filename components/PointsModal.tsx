import { StyleSheet, Text, View, Modal, TextInput, Button } from "react-native";
import { Counter } from "../interfaces/counter";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { editCounter } from "../redux/countersSlice";
import { addCounter } from "../redux/historySlice";

const PointsModal = ({
  counter,
  visible,
  setVisible,
}: {
  counter: Counter;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}) => {
  const dispatch = useDispatch();

  const [newPoints, setNewPoints] = useState(0);

  const handleSave = () => {
    dispatch(editCounter({ ...counter, points: newPoints + counter.points }));
    dispatch(addCounter({ ...counter, points: newPoints, id: Date.now() }));

    setVisible(false);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>
            {counter.name} - {counter.points}
          </Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Points"
            placeholderTextColor="#ccc"
            onChangeText={(text) => text.length && setNewPoints(parseInt(text))}
            keyboardType="number-pad"
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Button title="Cancel" onPress={() => setVisible(false)} />
            <Button title="Save" onPress={handleSave} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PointsModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#1e293b",
    padding: 20,
    borderRadius: 10,
    width: "75%",
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
    alignItems: "center",
    gap: 30,
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
