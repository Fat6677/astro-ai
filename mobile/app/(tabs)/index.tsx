import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>

      {/* ================= HEADER ================= */}
      <View style={styles.header}>
        {/* LOGO HEADER */}
        <Image
          source={require("../../assets/images/mylogo.png")}
          style={styles.headerLogo}
        />

        {/* BUTTON LOGIN */}
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* ================= CONTENT ================= */}
      <Text style={styles.title}>Selamat Datang Di Astro AI</Text>

      <View style={styles.row}>
        {/* LOGO BESAR */}
        <Image
         source={require("../../assets/images/mylogo.png")}
          style={styles.mainLogo}
        />

        {/* PENJELASAN */}
        <Text style={styles.description}>
          Astro AI adalah sebuah kecerdasan buatan yang dirancang sebagai pendamping cerdas dalam kehidupan sehari-hari. Dengan kemampuan memahami konteks percakapan, menganalisis kebutuhan pengguna, serta memberikan rekomendasi yang tepat, Astro AI hadir sebagai “AI Permal Kehidupan” — sebuah asisten digital yang selalu siap membantu berbagai aktivitas harian.

          Astro AI mampu menjawab pertanyaan, memberikan solusi praktis, membantu pengambilan keputusan, serta mendampingi pengguna dalam belajar, bekerja, maupun berkreasi. Dengan antarmuka yang ramah dan respons cepat, Astro AI memberikan pengalaman interaksi yang intuitif dan personal, seperti berbicara dengan seorang asisten nyata.

          Dibangun dengan teknologi modern dan kecerdasan adaptif, Astro AI terus berkembang mengikuti kebiasaan dan kebutuhan penggunanya. Mulai dari mencari informasi, merencanakan kegiatan, membuat konten, hingga membantu pekerjaan teknis, Astro AI menjadi partner cerdas yang setia di setiap momen penting dalam kehidupan.
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  /* ---------- HEADER ---------- */
  header: {
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  headerLogo: {
    width: 40,
    height: 40,
  },

  loginButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },

  loginText: {
    color: "#fff",
    fontWeight: "bold",
  },

  /* ---------- CONTENT ---------- */
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  mainLogo: {
    width: 60,
    height: 60,
    marginRight: 15,
  },

  description: {
    flex: 1,
    fontSize: 16,
    textAlign: "justify",
    color: "#333",
  },
});
