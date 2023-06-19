import { StyleSheet, Text, View, Modal, TextInput } from "react-native";
import { Counter } from "../interfaces/counter";
import { useDispatch } from "react-redux";
import { editCounter } from "../redux/countersSlice";
import { addCounter } from "../redux/historySlice";
import { HistoryItem } from "../interfaces/historyItem";

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

  const handleSave = (newPoints: number) => {
    dispatch(
      editCounter({ ...counter, points: newPoints + counter.points } as Counter)
    );
    dispatch(
      addCounter({
        name: counter.name,
        points: {
          previous: counter.points,
          current: counter.points + newPoints,
        },
        id: Date.now(),
        color: counter.color,
      } as HistoryItem)
    );

    setVisible(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>
            {counter.name} - {counter.points}
          </Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Points"
            placeholderTextColor="#ccc"
            keyboardType="number-pad"
            onSubmitEditing={(props) =>
              handleSave(parseInt(props.nativeEvent.text))
            }
          />
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
  modalHeader: {
    flexDirection: "row",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
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
