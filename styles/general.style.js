import { Dimensions, StyleSheet } from "react-native";

export const general = StyleSheet.create({
  labelText: {
    fontWeight: "bold",
    paddingRight: 8,
  },
  normalFlex: {
    flexDirection: "row",
  },
  centerHFlex: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 8,
  },
  container: {
    padding: 8,
    flex: 1,
    flexGrow: 1,
  },
  card: {
    marginVertical: 4,
  },
  scrollView: {
    height: Dimensions.get("window").height - 125,
  },
});
