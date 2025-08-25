import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const IP = Constants.expoConfig.extra.BASE_IP;

export default function AddExpenseScreen() {
  // const IP = process.env.BASE_IP;
  const navigation = useNavigation();
  const route = useRoute();
  const { cropName, cropId } = route.params || { cropName: "Selected Crop" };

  const [totals, setTotals] = useState({ income: 0, expense: 0, profit: 0 });
  const [transactions, setTransactions] = useState([]);

  const [activeTab, setActiveTab] = useState(null);
  const [expenseTypes, setExpenseTypes] = useState([]);
  const [expenseData, setExpenseData] = useState({
    date: new Date(),
    amount: "",
    expenseType: "",
  });
  const [incomeData, setIncomeData] = useState({
    name: "",
    date: new Date(),
    amount: "",
  });
  const [showOptions, setShowOptions] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // helper: format date into YYYY-MM-DD
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // fetch expense categories
  useEffect(() => {
    const fetchExpenseTypes = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return;

        const res = await fetch(`http://${IP}:3000/api/expense/expense-types`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (data.types) {
          setExpenseTypes(
            data.types.map((t) => ({ label: t.category_name, value: t.category_id }))
          );
        }
      } catch (err) {
        console.error("Error fetching expense types:", err);
      }
    };

    fetchExpenseTypes();
  }, []);

  // fetch transactions + totals
  const fetchTransactions = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      const [incomeRes, expenseRes, totalsRes] = await Promise.all([
        fetch(`http://${IP}:3000/api/expense/${cropId}/income`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`http://${IP}:3000/api/expense/${cropId}/expenses`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`http://${IP}:3000/api/crops/${cropId}/cropProfit`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const incomeData = await incomeRes.json();
      const expenseData = await expenseRes.json();
      const totalsData = await totalsRes.json();

      // map income + expense
      const incomes = incomeData.income?.map((i) => ({
        id: i.income_id,
        name: i.income_name,
        date: new Date(i.income_date),
        amount: i.income_amount,
        type: "income",
      })) || [];

      const expenses = expenseData.expenses?.map((e) => ({
        id: e.expense_id,
        name: e.category_name,
        date: new Date(e.expense_date),
        amount: e.expense_amount,
        type: "expense",
      })) || [];

      const allTransactions = [...incomes, ...expenses].sort(
        (a, b) => b.date - a.date
      );

      setTransactions(allTransactions);
      setTotals({
        income: totalsData.totalIncome || 0,
        expense: totalsData.totalExpense || 0,
        profit: totalsData.profit || 0,
      });
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [cropId]);

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      if (activeTab === "expense") {
        if (!expenseData.amount || !expenseData.expenseType) {
          Alert.alert("Error", "Please fill all expense fields");
          return;
        }

        const res = await fetch(`http://${IP}:3000/api/expense/expenses`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            crop_id: cropId,
            expense_category_id: expenseData.expenseType,
            expense_date: formatDate(expenseData.date),
            expense_amount: expenseData.amount,
          }),
        });

        if (res.ok) {
          setExpenseData({ date: new Date(), amount: "", expenseType: "" });
          fetchTransactions();
        } else {
          const data = await res.json();
          Alert.alert("Error", data.message || "Failed to add expense");
        }
      } else if (activeTab === "income") {
        if (!incomeData.name || !incomeData.amount) {
          Alert.alert("Error", "Please fill all income fields");
          return;
        }

        const res = await fetch(`http://${IP}:3000/api/expense/income`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            crop_id: cropId,
            income_name: incomeData.name,
            income_date: formatDate(incomeData.date),
            income_amount: incomeData.amount,
          }),
        });

        if (res.ok) {
          setIncomeData({ name: "", date: new Date(), amount: "" });
          fetchTransactions();
        } else {
          const data = await res.json();
          Alert.alert("Error", data.message || "Failed to add income");
        }
      }

      setActiveTab(null);
      setShowOptions(false);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* top bar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.cropName}>{cropName}</Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => Alert.alert("Delete", "Do you want to delete this crop data?", [
              { text: "Cancel", style: "cancel" },
              { text: "Delete", style: "destructive", onPress: () => console.log("Delete action here") },
            ])}
  >
    <Ionicons name="trash-outline" size={24} color="red" />
  </TouchableOpacity>
        </View>

        {/* summary */}
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>Total Income: ₹{totals.income}</Text>
          <Text style={styles.summaryText}>Total Expense: ₹{totals.expense}</Text>
          <Text
            style={[
              styles.summaryText,
              { color: totals.profit >= 0 ? "green" : "red", fontWeight: "bold" },
            ]}
          >
            Profit: ₹{totals.profit}
          </Text>
        </View>

        {/* add transaction btn */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowOptions(!showOptions)}
        >
          <Text style={styles.addButtonText}>Add Transaction</Text>
        </TouchableOpacity>

        {/* income/expense options */}
        {showOptions && (
          <View style={styles.optionContainer}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => setActiveTab("income")}
            >
              <Text style={styles.optionText}>Income</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => setActiveTab("expense")}
            >
              <Text style={styles.optionText}>Expense</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* form */}
        {activeTab && (
          <View style={styles.formContainer}>
            <Text style={styles.formTitle}>
              {activeTab === "income" ? "Add Income" : "Add Expense"}
            </Text>

            {activeTab === "income" && (
              <TextInput
                placeholder="Income Name"
                style={styles.input}
                value={incomeData.name}
                onChangeText={(text) => setIncomeData({ ...incomeData, name: text })}
              />
            )}

            {/* date picker */}
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowDatePicker(true)}
            >
              <Text>
                {(activeTab === "income" ? incomeData.date : expenseData.date).toDateString()}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={activeTab === "income" ? incomeData.date : expenseData.date}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    activeTab === "income"
                      ? setIncomeData({ ...incomeData, date: selectedDate })
                      : setExpenseData({ ...expenseData, date: selectedDate });
                  }
                }}
              />
            )}

            {/* expense type dropdown */}
            {activeTab === "expense" && (
              <View style={styles.input}>
                <RNPickerSelect
                  onValueChange={(value) =>
                    setExpenseData({ ...expenseData, expenseType: value })
                  }
                  items={expenseTypes}
                  placeholder={{ label: "Select Expense Type", value: "" }}
                  value={expenseData.expenseType}
                  style={{
                    inputIOS: { fontSize: 16, paddingVertical: 10, color: "#333" },
                    inputAndroid: { fontSize: 16, paddingVertical: 10, color: "#333" },
                    placeholder: { color: "#999" },
                  }}
                  useNativeAndroidPickerStyle={false}
                />
              </View>
            )}

            {/* amount input */}
            <TextInput
              placeholder="Amount"
              keyboardType="numeric"
              style={styles.input}
              value={activeTab === "income" ? incomeData.amount : expenseData.amount}
              onChangeText={(text) =>
                activeTab === "income"
                  ? setIncomeData({ ...incomeData, amount: text })
                  : setExpenseData({ ...expenseData, amount: text })
              }
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitText}>Save</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* transaction list */}
        <ScrollView style={styles.transactionList}>
          {transactions.length === 0 ? (
            <Text style={{ textAlign: "center", color: "#888" }}>No transactions yet</Text>
          ) : (
            transactions.map((t) => (
              <View
                key={t.id}
                style={[
                  styles.transactionItem,
                  t.type === "expense"
                    ? { borderLeftColor: "red" }
                    : { borderLeftColor: "green" },
                ]}
              >
                <View>
                  <Text style={styles.transactionTitle}>{t.name}</Text>
                  <Text style={styles.transactionDetails}>
                    Date: {t.date.toDateString()}
                  </Text>
                </View>
                <Text style={styles.transactionAmount}>
                  {t.type === "expense" ? "-" : "+"}₹{t.amount}
                </Text>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    marginLeft: "auto", 
    padding: 5,
  },
  
  safeArea: { flex: 1, backgroundColor: "#fff" },
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
  summaryContainer: {
    padding: 16,
    backgroundColor: "#f0f8f5",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  summaryText: { fontSize: 16, marginBottom: 4, color: "#333" },
  transactionList: { flex: 1, padding: 16 },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#fafafa",
    borderRadius: 6,
    marginBottom: 10,
    borderLeftWidth: 4,
  },
  transactionTitle: { fontSize: 16, fontWeight: "bold", color: "#333" },
  transactionDetails: { fontSize: 12, color: "#555" },
  transactionAmount: { fontSize: 16, fontWeight: "bold" },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 14,
    margin: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 16,
    marginBottom: 10,
  },
  optionButton: {
    flex: 1,
    backgroundColor: "#eee",
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 6,
    alignItems: "center",
  },
  optionText: { fontSize: 16, color: "#333" },
  formContainer: {
    backgroundColor: "#fafafa",
    padding: 16,
    margin: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  formTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  submitText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
