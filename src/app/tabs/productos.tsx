import { POS_COLORS as C } from "@/constants/pos-theme";
import { useMemo, useState } from "react";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Producto {
  id: string;
  nombre: string;
  categoria: string;
  codigo: string;
  precio: number;
  stock: number;
}

const productosIniciales: Producto[] = [
  {
    id: "1",
    nombre: "Laptop Lenovo",
    categoria: "Electrónica",
    codigo: "PROD-001",
    precio: 12500,
    stock: 15,
  },
  {
    id: "2",
    nombre: "Mouse inalámbrico",
    categoria: "Accesorios",
    codigo: "PROD-002",
    precio: 250,
    stock: 32,
  },
  {
    id: "3",
    nombre: "Teclado mecánico",
    categoria: "Accesorios",
    codigo: "PROD-003",
    precio: 850,
    stock: 8,
  },
  {
    id: "4",
    nombre: "Monitor Samsung",
    categoria: "Electrónica",
    codigo: "PROD-004",
    precio: 3200,
    stock: 12,
  },
  {
    id: "5",
    nombre: "Audífonos Bluetooth",
    categoria: "Audio",
    codigo: "PROD-005",
    precio: 650,
    stock: 20,
  },
  {
    id: "6",
    nombre: "Memoria USB 64GB",
    categoria: "Almacenamiento",
    codigo: "PROD-006",
    precio: 180,
    stock: 0,
  },
];

const formatoMoneda = (cantidad: number) =>
  cantidad.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
  });

export default function ProductosScreen() {
  const [busqueda, setBusqueda] = useState("");

  const productosFiltrados = useMemo(() => {
    const texto = busqueda.toLowerCase().trim();

    return productosIniciales.filter(
      (producto) =>
        producto.nombre.toLowerCase().includes(texto) ||
        producto.categoria.toLowerCase().includes(texto) ||
        producto.codigo.toLowerCase().includes(texto),
    );
  }, [busqueda]);

  const totalStock = productosIniciales.reduce(
    (total, producto) => total + producto.stock,
    0,
  );

  const renderProducto = ({ item }: { item: Producto }) => {
    const agotado = item.stock === 0;
    const stockBajo = item.stock > 0 && item.stock <= 8;

    return (
      <View style={styles.productItem}>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.nombre}</Text>
          <Text style={styles.productMeta}>
            {item.categoria} · {item.codigo}
          </Text>

          <Text style={styles.productPrice}>{formatoMoneda(item.precio)}</Text>
        </View>

        <View style={styles.productRight}>
          <Text style={styles.stockLabel}>Existencias</Text>
          <Text style={styles.stockValue}>{item.stock}</Text>

          <View
            style={[
              styles.stockBadge,
              agotado
                ? styles.stockEmpty
                : stockBajo
                  ? styles.stockLow
                  : styles.stockAvailable,
            ]}
          >
            <Text
              style={[
                styles.stockBadgeText,
                agotado
                  ? styles.stockEmptyText
                  : stockBajo
                    ? styles.stockLowText
                    : styles.stockAvailableText,
              ]}
            >
              {agotado ? "Agotado" : stockBajo ? "Stock bajo" : "Disponible"}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Productos</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>⌕</Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nombre o código"
          placeholderTextColor={C.muted}
          value={busqueda}
          onChangeText={setBusqueda}
          autoCapitalize="none"
          returnKeyType="search"
        />

        {busqueda.length > 0 && (
          <TouchableOpacity
            onPress={() => setBusqueda("")}
            style={styles.clearButton}
          >
            <Text style={styles.clearText}>Borrar</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.summary}>
        <View>
          <Text style={styles.summaryLabel}>Productos registrados</Text>
          <Text style={styles.summaryValue}>{productosIniciales.length}</Text>
        </View>

        <View style={styles.summaryDivider} />

        <View>
          <Text style={styles.summaryLabel}>Unidades en inventario</Text>
          <Text style={styles.summaryValue}>{totalStock}</Text>
        </View>
      </View>

      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Catálogo</Text>
        <Text style={styles.resultCount}>
          {productosFiltrados.length} resultados
        </Text>
      </View>

      <FlatList
        data={productosFiltrados}
        renderItem={renderProducto}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No se encontraron productos</Text>
            <Text style={styles.emptyDescription}>
              Prueba con otro nombre o código.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchIcon: {
    fontSize: 23,
    color: C.muted,
    marginRight: 9,
  },
  container: {
    flex: 1,
    backgroundColor: C.background,
    paddingHorizontal: 20,
  },
  header: {
    paddingTop: 18,
    marginBottom: 22,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.2,
    color: C.muted,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: C.text,
    marginTop: 5,
  },
  subtitle: {
    color: C.textSecondary,
    fontSize: 13,
    marginTop: 4,
  },
  searchContainer: {
    minHeight: 48,
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 13,
    color: C.text,
  },
  clearButton: {
    paddingLeft: 10,
    paddingVertical: 8,
  },
  clearText: {
    fontSize: 12,
    color: C.primary,
    fontWeight: "600",
  },
  summary: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    marginBottom: 25,
  },
  summaryLabel: {
    color: C.textSecondary,
    fontSize: 11,
  },
  summaryValue: {
    color: C.text,
    fontSize: 21,
    fontWeight: "700",
    marginTop: 5,
  },
  summaryDivider: {
    width: 1,
    height: 35,
    backgroundColor: C.border,
    marginHorizontal: 25,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: C.text,
  },
  resultCount: {
    color: C.textSecondary,
    fontSize: 11,
  },
  listContent: {
    paddingBottom: 85,
  },
  productItem: {
    backgroundColor: C.surface,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  productInfo: {
    flex: 1,
    paddingRight: 8,
  },
  productName: {
    color: C.text,
    fontSize: 14,
    fontWeight: "600",
  },
  productMeta: {
    color: C.textSecondary,
    fontSize: 11,
    marginTop: 5,
  },
  productPrice: {
    color: C.text,
    fontSize: 14,
    fontWeight: "700",
    marginTop: 10,
  },
  productRight: {
    alignItems: "flex-end",
    minWidth: 82,
  },
  stockLabel: {
    color: C.muted,
    fontSize: 10,
  },
  stockValue: {
    color: C.text,
    fontSize: 17,
    fontWeight: "700",
    marginTop: 3,
  },
  stockBadge: {
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 5,
    marginTop: 5,
  },
  stockAvailable: {
    backgroundColor: C.successSoft,
  },
  stockLow: {
    backgroundColor: "#FFF7ED",
  },
  stockEmpty: {
    backgroundColor: C.dangerSoft,
  },
  stockBadgeText: {
    fontSize: 9,
    fontWeight: "600",
  },
  stockAvailableText: {
    color: C.success,
  },
  stockLowText: {
    color: "#C2410C",
  },
  stockEmptyText: {
    color: C.danger,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 45,
  },
  emptyTitle: {
    color: C.text,
    fontSize: 15,
    fontWeight: "600",
  },
  emptyDescription: {
    color: C.textSecondary,
    fontSize: 12,
    marginTop: 6,
  },
});
