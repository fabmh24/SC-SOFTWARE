import { POS_COLORS as C } from "@/constants/pos-theme";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const formatoMoneda = (cantidad: number) =>
  cantidad.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
  });

// Datos de ejemplo mientras se conecta la base de datos
const productoMasVendido = {
  nombre: "Mouse inalámbrico",
  unidades: 12,
};

const productosStockBajo = [
  { id: "1", nombre: "Memoria USB 64GB", existencias: 0 },
  { id: "2", nombre: "Teclado mecánico", existencias: 3 },
  { id: "3", nombre: "Monitor Samsung", existencias: 5 },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Inicio</Text>
            <Text style={styles.subtitle}>Resumen de tu negocio</Text>
          </View>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>A</Text>
          </View>
        </View>

        {/* Ventas de hoy */}
        <View style={styles.mainSection}>
          <Text style={styles.sectionLabel}>VENTAS DE HOY</Text>
          <Text style={styles.mainAmount}>{formatoMoneda(8450)}</Text>
          <Text style={styles.mainDescription}>
            Ingresos registrados durante el día
          </Text>
        </View>

        {/* Producto más vendido */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Producto más vendido</Text>
          <Text style={styles.sectionCaption}>
            El producto con más unidades vendidas
          </Text>
        </View>

        <View style={styles.productCard}>
          <View style={styles.productIcon}>
            <Text style={styles.productIconText}>★</Text>
          </View>

          <View style={styles.productInfo}>
            <Text style={styles.productName}>{productoMasVendido.nombre}</Text>
            <Text style={styles.productDescription}>Producto destacado</Text>
          </View>

          <View style={styles.soldInfo}>
            <Text style={styles.soldNumber}>{productoMasVendido.unidades}</Text>
            <Text style={styles.soldLabel}>vendidos</Text>
          </View>
        </View>

        {/* Productos con stock bajo */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Productos con stock bajo</Text>
          <Text style={styles.sectionCaption}>
            Productos que necesitan reposición
          </Text>
        </View>

        <View style={styles.stockList}>
          {productosStockBajo.map((producto, index) => (
            <View
              key={producto.id}
              style={[
                styles.stockItem,
                index !== productosStockBajo.length - 1 && styles.stockBorder,
              ]}
            >
              <View
                style={[
                  styles.stockIndicator,
                  producto.existencias === 0
                    ? styles.stockEmpty
                    : styles.stockWarning,
                ]}
              />

              <Text style={styles.stockName}>{producto.nombre}</Text>

              <View
                style={[
                  styles.stockBadge,
                  producto.existencias === 0
                    ? styles.stockBadgeEmpty
                    : styles.stockBadgeWarning,
                ]}
              >
                <Text
                  style={[
                    styles.stockBadgeText,
                    producto.existencias === 0
                      ? styles.stockTextEmpty
                      : styles.stockTextWarning,
                  ]}
                >
                  {producto.existencias === 0
                    ? "Sin existencias"
                    : `${producto.existencias} unidades`}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Actividad reciente */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Actividad reciente</Text>
          <Text style={styles.sectionCaption}>Últimos movimientos</Text>
        </View>

        <Text style={styles.footer}>SC-Software · Versión 1.0.0</Text>

        <View style={{ height: 45 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: C.background,
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: C.text,
    marginTop: 5,
  },
  subtitle: {
    fontSize: 14,
    color: C.textSecondary,
    marginTop: 4,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: C.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: C.primary,
    fontSize: 17,
    fontWeight: "700",
  },
  mainSection: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 14,
    padding: 20,
  },
  sectionLabel: {
    color: C.textSecondary,
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.8,
  },
  mainAmount: {
    color: C.text,
    fontSize: 32,
    fontWeight: "700",
    marginTop: 12,
  },
  mainDescription: {
    color: C.textSecondary,
    fontSize: 13,
    marginTop: 6,
  },
  sectionHeader: {
    marginTop: 25,
    marginBottom: 13,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: C.text,
  },
  sectionCaption: {
    fontSize: 12,
    color: C.textSecondary,
    marginTop: 4,
  },
  productCard: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 14,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  productIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: C.primarySoft,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  productIconText: {
    color: C.primary,
    fontSize: 20,
    fontWeight: "700",
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    color: C.text,
    fontSize: 14,
    fontWeight: "600",
  },
  productDescription: {
    color: C.textSecondary,
    fontSize: 11,
    marginTop: 4,
  },
  soldInfo: {
    alignItems: "flex-end",
  },
  soldNumber: {
    color: C.primary,
    fontSize: 21,
    fontWeight: "700",
  },
  soldLabel: {
    color: C.textSecondary,
    fontSize: 10,
    marginTop: 2,
  },
  stockList: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 14,
    paddingHorizontal: 15,
  },
  stockItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  stockBorder: {
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  stockIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  stockEmpty: {
    backgroundColor: C.danger,
  },
  stockWarning: {
    backgroundColor: "#D97706",
  },
  stockName: {
    flex: 1,
    color: C.text,
    fontSize: 12,
    fontWeight: "600",
  },
  stockBadge: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 8,
  },
  stockBadgeEmpty: {
    backgroundColor: "#FEF2F2",
  },
  stockBadgeWarning: {
    backgroundColor: "#FFFBEB",
  },
  stockBadgeText: {
    fontSize: 10,
    fontWeight: "600",
  },
  stockTextEmpty: {
    color: C.danger,
  },
  stockTextWarning: {
    color: "#B45309",
  },
  activityList: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 14,
    paddingHorizontal: 15,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  activityBorder: {
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  activityMark: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: C.primary,
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityId: {
    color: C.text,
    fontSize: 13,
    fontWeight: "600",
  },
  activityClient: {
    color: C.textSecondary,
    fontSize: 12,
    marginTop: 3,
  },
  activityTime: {
    color: C.muted,
    fontSize: 11,
    marginTop: 3,
  },
  activityAmount: {
    color: C.text,
    fontSize: 13,
    fontWeight: "600",
  },
  footer: {
    textAlign: "center",
    color: C.muted,
    fontSize: 11,
    marginTop: 28,
  },
});
