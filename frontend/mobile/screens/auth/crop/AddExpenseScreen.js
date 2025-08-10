// AddExpenseScreen.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function AddExpenseScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { cropName } = route.params || { cropName: "Selected Crop" };

  const [activeTab, setActiveTab] = useState("expense");
  const [expenseData, setExpenseData] = useState({ title: "", amount: "" });
  const [incomeData, setIncomeData] = useState({ title: "", amount: "" });

  const handleSubmit = () => {
    if (activeTab === "expense") {
      console.log("Expense Added:", expenseData);
    } else {
      console.log("Income Added:", incomeData);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.cropName}>{cropName}</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "expense" && styles.activeTab]}
          onPress={() => setActiveTab("expense")}
        >
          <Text style={[styles.tabText, activeTab === "expense" && styles.activeTabText]}>Add Expense</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "income" && styles.activeTab]}
          onPress={() => setActiveTab("income")}
        >
          <Text style={[styles.tabText, activeTab === "income" && styles.activeTabText]}>Add Income</Text>
        </TouchableOpacity>
      </View>

      {/* Form */}
      <ScrollView style={styles.form}>
        {activeTab === "expense" ? (
          <>
            <Text style={styles.label}>Expense Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter expense title"
              value={expenseData.title}
              onChangeText={(text) => setExpenseData({ ...expenseData, title: text })}
            />

            <Text style={styles.label}>Amount</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter amount"
              keyboardType="numeric"
              value={expenseData.amount}
              onChangeText={(text) => setExpenseData({ ...expenseData, amount: text })}
            />
          </>
        ) : (
          <>
            <Text style={styles.label}>Income Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter income title"
              value={incomeData.title}
              onChangeText={(text) => setIncomeData({ ...incomeData, title: text })}
            />

            <Text style={styles.label}>Amount</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter amount"
              keyboardType="numeric"
              value={incomeData.amount}
              onChangeText={(text) => setIncomeData({ ...incomeData, amount: text })}
            />
          </>
        )}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backButton: { marginRight: 10 },
  cropName: { fontSize: 18, fontWeight: "bold", color: "#333" },
  tabContainer: { flexDirection: "row", marginTop: 10 },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: { borderBottomColor: "#4CAF50" },
  tabText: { fontSize: 16, color: "#555" },
  activeTabText: { color: "#4CAF50", fontWeight: "bold" },
  form: { padding: 16 },
  label: { fontSize: 14, color: "#555", marginBottom: 6, marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  submitButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
