import { POS_COLORS as C } from "@/constants/pos-theme";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Venta {
  id: string;
  hora: string;
  cliente: string;
  metodo: string;
  total: number;
  estado: string;
}

const ventas: Venta[] = [
  {
    id: "V-001",
    hora: "10:35 AM",
    cliente: "Cliente general",
    metodo: "Efectivo",
    total: 1250,
    estado: "Pagada",
  },
  {
    id: "V-002",
    hora: "11:20 AM",
    cliente: "Carlos Mendoza",
    metodo: "Tarjeta",
    total: 850,
    estado: "Pagada",
  },
  {
    id: "V-003",
    hora: "12:05 PM",
    cliente: "Cliente general",
    metodo: "Transferencia",
    total: 450,
    estado: "Pagada",
  },
  {
    id: "V-004",
    hora: "01:15 PM",
    cliente: "María López",
    metodo: "Efectivo",
    total: 2100,
    estado: "Pagada",
  },
  {
    id: "V-005",
    hora: "02:30 PM",
    cliente: "Cliente general",
    metodo: "Tarjeta",
    total: 3800,
    estado: "Pagada",
  },
];

const ventasSemana = [
  { dia: "Lun", cantidad: 3200 },
  { dia: "Mar", cantidad: 4500 },
  { dia: "Mié", cantidad: 2800 },
  { dia: "Jue", cantidad: 5600 },
  { dia: "Vie", cantidad: 4100 },
  { dia: "Sáb", cantidad: 7200 },
  { dia: "Dom", cantidad: 2400 },
];

const metodosPago = [
  { nombre: "Efectivo", porcentaje: 50, cantidad: 4225 },
  { nombre: "Tarjeta", porcentaje: 35, cantidad: 2957.5 },
  { nombre: "Transferencia", porcentaje: 15, cantidad: 1267.5 },
];

const formatoMoneda = (cantidad: number) =>
  cantidad.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
  });

export default function VentasScreen() {
  const totalVentas = 8450;
  const numeroVentas = 24;
  const ticketPromedio = totalVentas / numeroVentas;
  const maxVenta = Math.max(...ventasSemana.map((venta) => venta.cantidad));
  const totalSemana = ventasSemana.reduce(
    (total, venta) => total + venta.cantidad,
    0,
  );

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Ventas</Text>
          <Text style={styles.subtitle}>Resumen de actividad y cobros</Text>
        </View>

        <View style={styles.mainCard}>
          <Text style={styles.mainLabel}>VENTAS DE HOY</Text>
          <Text style={styles.mainAmount}>{formatoMoneda(totalVentas)}</Text>
          <Text style={styles.mainDescription}>
            Ingresos registrados durante el día
          </Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Transacciones</Text>
            <Text style={styles.statValue}>{numeroVentas}</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.stat}>
            <Text style={styles.statLabel}>Ticket promedio</Text>
            <Text style={styles.statValueSmall}>
              {formatoMoneda(ticketPromedio)}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Ventas de la semana</Text>
              <Text style={styles.sectionSubtitle}>
                Rendimiento de los últimos siete días
              </Text>
            </View>
          </View>

          <Text style={styles.chartTotal}>{formatoMoneda(totalSemana)}</Text>
          <Text style={styles.chartCaption}>Total semanal</Text>

          <View style={styles.chart}>
            {ventasSemana.map((venta) => (
              <View key={venta.dia} style={styles.chartColumn}>
                <View style={styles.barBackground}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: `${(venta.cantidad / maxVenta) * 100}%`,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.chartDay}>{venta.dia}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Métodos de pago</Text>
          <Text style={styles.sectionSubtitle}>
            Distribución de los ingresos del día
          </Text>

          {metodosPago.map((metodo) => (
            <View key={metodo.nombre} style={styles.paymentItem}>
              <View style={styles.paymentHeader}>
                <Text style={styles.paymentName}>{metodo.nombre}</Text>
                <Text style={styles.paymentAmount}>
                  {formatoMoneda(metodo.cantidad)}
                </Text>
              </View>

              <View style={styles.progressBackground}>
                <View
                  style={[
                    styles.progressBar,
                    { width: `${metodo.porcentaje}%` },
                  ]}
                />
              </View>

              <Text style={styles.paymentPercentage}>
                {metodo.porcentaje}% del total
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Últimas ventas</Text>
              <Text style={styles.sectionSubtitle}>Movimientos recientes</Text>
            </View>
            <Text style={styles.resultCount}>{ventas.length} registros</Text>
          </View>

          {ventas.map((venta, index) => (
            <View
              key={venta.id}
              style={[
                styles.saleItem,
                index !== ventas.length - 1 && styles.saleBorder,
              ]}
            >
              <View style={styles.saleInfo}>
                <Text style={styles.saleId}>{venta.id}</Text>
                <Text style={styles.saleClient}>{venta.cliente}</Text>
                <Text style={styles.saleMeta}>
                  {venta.hora} · {venta.metodo}
                </Text>
              </View>

              <View style={styles.saleRight}>
                <Text style={styles.saleAmount}>
                  {formatoMoneda(venta.total)}
                </Text>
                <Text style={styles.saleStatus}>{venta.estado}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.footer}>SC-Software</Text>
        <View style={{ height: 65 }} />
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
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 30,
  },
  header: {
    marginBottom: 24,
  },
  eyebrow: {
    color: C.muted,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.2,
  },
  title: {
    color: C.text,
    fontSize: 28,
    fontWeight: "700",
    marginTop: 5,
  },
  subtitle: {
    color: C.textSecondary,
    fontSize: 13,
    marginTop: 4,
  },
  mainCard: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 14,
    padding: 20,
  },
  mainLabel: {
    color: C.textSecondary,
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.8,
  },
  mainAmount: {
    color: C.text,
    fontSize: 30,
    fontWeight: "700",
    marginTop: 12,
  },
  mainDescription: {
    color: C.textSecondary,
    fontSize: 12,
    marginTop: 5,
  },
  statsRow: {
    flexDirection: "row",
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 14,
    padding: 17,
    marginTop: 12,
    alignItems: "center",
  },
  stat: {
    flex: 1,
  },
  statLabel: {
    color: C.textSecondary,
    fontSize: 11,
  },
  statValue: {
    color: C.text,
    fontSize: 22,
    fontWeight: "700",
    marginTop: 7,
  },
  statValueSmall: {
    color: C.text,
    fontSize: 15,
    fontWeight: "700",
    marginTop: 10,
  },
  statDivider: {
    width: 1,
    height: 38,
    backgroundColor: C.border,
    marginHorizontal: 16,
  },
  section: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 14,
    padding: 17,
    marginTop: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    color: C.text,
    fontSize: 16,
    fontWeight: "700",
  },
  sectionSubtitle: {
    color: C.textSecondary,
    fontSize: 11,
    marginTop: 5,
  },
  chartTotal: {
    color: C.text,
    fontSize: 23,
    fontWeight: "700",
    marginTop: 20,
  },
  chartCaption: {
    color: C.muted,
    fontSize: 11,
    marginTop: 3,
  },
  chart: {
    height: 125,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 8,
  },
  chartColumn: {
    flex: 1,
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  barBackground: {
    height: 95,
    width: "75%",
    backgroundColor: C.primarySoft,
    borderRadius: 5,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  bar: {
    width: "100%",
    backgroundColor: C.primary,
    borderRadius: 5,
  },
  chartDay: {
    color: C.textSecondary,
    fontSize: 10,
    marginTop: 8,
  },
  paymentItem: {
    marginTop: 20,
  },
  paymentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 9,
  },
  paymentName: {
    color: C.text,
    fontSize: 12,
    fontWeight: "600",
  },
  paymentAmount: {
    color: C.text,
    fontSize: 12,
    fontWeight: "600",
  },
  progressBackground: {
    height: 7,
    backgroundColor: C.primarySoft,
    borderRadius: 5,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: C.primary,
    borderRadius: 5,
  },
  paymentPercentage: {
    color: C.muted,
    fontSize: 10,
    marginTop: 6,
  },
  resultCount: {
    color: C.textSecondary,
    fontSize: 11,
  },
  saleItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  saleBorder: {
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  saleInfo: {
    flex: 1,
  },
  saleId: {
    color: C.text,
    fontSize: 12,
    fontWeight: "700",
  },
  saleClient: {
    color: C.textSecondary,
    fontSize: 11,
    marginTop: 4,
  },
  saleMeta: {
    color: C.muted,
    fontSize: 10,
    marginTop: 4,
  },
  saleRight: {
    alignItems: "flex-end",
  },
  saleAmount: {
    color: C.text,
    fontSize: 12,
    fontWeight: "700",
  },
  saleStatus: {
    color: C.success,
    fontSize: 10,
    marginTop: 5,
  },
  footer: {
    textAlign: "center",
    color: C.muted,
    fontSize: 10,
    marginTop: 25,
  },
});
