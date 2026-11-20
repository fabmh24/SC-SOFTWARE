import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import LoginService from "./services/LoginService";

export default function LoginScreen() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");

  const iniciarSesion = async() => {
    const respuesta= await LoginService.login(usuario,contrasena);
    console.log(respuesta);
    if (respuesta.status=== 200) {
      router.replace("/tabs");
    } else {
      Alert.alert("Error", "Usuario o contraseña incorrectos");
    }
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>SC-Software</Text>

      <Text style={styles.subtitulo}>Inicia sesión para continuar</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={usuario}
        onChangeText={setUsuario}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={contrasena}
        onChangeText={setContrasena}
        secureTextEntry
      />

      <TouchableOpacity style={styles.boton} onPress={iniciarSesion}>
        <Text style={styles.textoBoton}>Iniciar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    padding: 25,
  },

  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1E3A8A",
    textAlign: "center",
  },

  subtitulo: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 35,
    marginTop: 10,
  },

  input: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 18,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },

  boton: {
    backgroundColor: "#2563EB",
    padding: 17,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  textoBoton: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },
});
