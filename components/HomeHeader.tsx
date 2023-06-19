import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Menu, MenuItem } from "react-native-material-menu";
import {
  createNew,
  deleteAll,
  resetAll,
} from "../redux/counters/countersSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

const HomeHeader = () => {
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);

  const handleResetAll = () => {
    dispatch(resetAll());
    setShowMenu(false);
  };

  const handleDeleteAll = () => {
    dispatch(deleteAll());
    setShowMenu(false);
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => dispatch(createNew())}
        style={styles.headerItem}
      >
        <Ionicons name="ios-add" size={24} color="#cbd5e1" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => console.log("`Time` button pressed!")}
        style={styles.headerItem}
      >
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
        onRequestClose={() => setShowMenu(false)}
      >
        <MenuItem onPress={handleResetAll} textStyle={styles.menuItem}>
          Reset All
        </MenuItem>
        <MenuItem onPress={handleDeleteAll} textStyle={styles.menuItem}>
          Delete All
        </MenuItem>
      </Menu>
    </View>
  );
};

export default HomeHeader;

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
