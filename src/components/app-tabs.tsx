import { POS_COLORS as C } from "@/constants/pos-theme";
import { NativeTabs } from "expo-router/native-tabs";

export default function AppTabs() {
  return (
    <NativeTabs
      backgroundColor={C.surface}
      indicatorColor={C.primarySoft}
      labelStyle={{
        selected: { color: C.primary },
      }}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Inicio</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require("@/assets/images/tabIcons/home.png")}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="productos">
        <NativeTabs.Trigger.Label>Productos</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require("@/assets/images/tabIcons/productos.png")}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="ventas">
        <NativeTabs.Trigger.Label>Ventas</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require("@/assets/images/tabIcons/ventas.png")}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="configuracion">
        <NativeTabs.Trigger.Label>Configuración</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require("@/assets/images/tabIcons/configuracion.png")}
          renderingMode="template"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
