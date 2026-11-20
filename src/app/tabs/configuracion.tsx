import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";

export default function ConfiguracionScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.content}>
        <Text style={styles.title}>Configuración</Text>
        <Text style={styles.description}>
          Ajustes generales de la aplicación.
        </Text>

        <View style={styles.option}>
          <Text style={styles.optionTitle}>Información de la aplicación</Text>
          <Text style={styles.optionDescription}>Versión 1.0.0</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0F172A",
  },
  description: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 8,
  },
  option: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 16,
    marginTop: 28,
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0F172A",
  },
  optionDescription: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 6,
  },
});
