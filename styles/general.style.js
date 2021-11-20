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
  centerFlex: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  splashImage: { width: 128, height: 128, marginBottom: 24 },
  menuLogo: { width: 192, height: 192, marginBottom: 24 },
});
