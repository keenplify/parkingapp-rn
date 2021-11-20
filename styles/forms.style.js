import { StyleSheet } from "react-native";

export const forms = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    flexGrow: 1,
  },
  containerTwoColumn: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  rowBottom: {
    alignItems: "flex-end",
    flex: 1,
    flexDirection: "row",
    marginVertical: 8,
  },
  actionButton: {
    marginLeft: "auto",
  },
  form: {
    width: "80%",
    padding: "2%",
    borderRadius: 4,
  },
  divider: {
    marginVertical: 12,
  },
  control: {
    marginTop: 8,
    flexGrow: 1,
  },
  status: {
    textAlign: "center",
  },
  card: {
    width: "46%",
    margin: "2%",
  },
});
