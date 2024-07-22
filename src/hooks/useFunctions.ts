import { useEffect, useState } from "react";
import dataTypes from "../data/types/incomeTypes";
import income from "../data/income";
import expense from "../data/expense";

let amount = 0;

function useFunctions() {
    let sumIncome = 0;
    let sumExpense = 0;
  
    const savedIncomeData: dataTypes[] = JSON.parse(
      localStorage.getItem("income data") || "[]"
    );
    const savedExpenseData: dataTypes[] = JSON.parse(
      localStorage.getItem("expense data") || "[]"
    );
  
    let [incomeData, updateIncomeData] = useState(() => {
      return savedIncomeData.length > 0 ? savedIncomeData : income;
    });
    let [expenseData, updateExpenseData] = useState(() => {
      return savedExpenseData.length > 0 ? savedExpenseData : expense;
    });
  
    useEffect(() => {
      localStorage.setItem("income data", JSON.stringify(incomeData));
    }, [incomeData]);
    useEffect(() => {
      localStorage.setItem("expense data", JSON.stringify(expenseData));
    }, [expenseData]);
  
    let [initialIncomeTotal, setIncomeTotal] = useState(() => {
      let savedIncomeTotal = localStorage.getItem("income total") || "";
      for (let i = 0; i < income.length; i++) {
        sumIncome = sumIncome + income[i].amount;
      }
      if (savedIncomeData.length < 1) {
        savedIncomeTotal = "null";
      }
      return savedIncomeTotal == "null" ? sumIncome : savedIncomeTotal;
    });
    let [initialExpenseTotal, setExpenseTotal] = useState(() => {
      let savedExpenseTotal = localStorage.getItem("expense total") || "";
      for (let i = 0; i < expense.length; i++) {
        sumExpense = sumExpense + expense[i].amount;
      }
      if (savedExpenseData.length < 1) {
        savedExpenseTotal = "null";
      }
      return savedExpenseTotal == "null" ? sumExpense : savedExpenseTotal;
    });
  
    useEffect(() => {
      localStorage.setItem("income total", String(initialIncomeTotal));
    }, [initialIncomeTotal]);
    useEffect(() => {
      localStorage.setItem("expense total", String(initialExpenseTotal));
    }, [initialExpenseTotal]);
  
    function addIncome(values: {
      date: string;
      description: string;
      amount: string;
    }) {
      updateIncomeData(() => [
        ...incomeData,
        {
          id: incomeData.length,
          date: values.date,
          description: values.description,
          amount: Number(values.amount),
        },
      ]);
      amount = Number(values.amount);
      setIncomeTotal(Number(initialIncomeTotal) + Number(amount));
    }
    function addExpense(values: {
      date: string;
      description: string;
      amount: string;
    }) {
      updateExpenseData(() => [
        ...expenseData,
        {
          id: expenseData.length,
          date: values.date,
          description: values.description,
          amount:
            Number(values.amount) < 0
              ? Number(values.amount)
              : Number(values.amount) * -1,
        },
      ]);
  
      amount = Number(values.amount);
      Number(amount) < 0
        ? (amount = Number(values.amount))
        : (amount = Number(amount) * -1);
  
      setExpenseTotal(Number(initialExpenseTotal) + amount);
    }
  
    function handleIncomeDelete(id: number) {
      const newArray = incomeData.filter((item) => item.id !== id);
      updateIncomeData(newArray);
      for (let i = 0; i < newArray.length; i++) {
        newArray[i].id = i;
      }
      setIncomeTotal(Number(initialIncomeTotal) - incomeData[id].amount);
    }
    function handleExpenseDelete(id: number) {
      const newArray = expenseData.filter((item) => item.id !== id);
      updateExpenseData(newArray);
      for (let i = 0; i < newArray.length; i++) {
        newArray[i].id = i;
      }
      setExpenseTotal(Number(initialExpenseTotal) - expenseData[id].amount);
    }

    return {
        incomeData,
        expenseData,
        initialIncomeTotal,
        initialExpenseTotal,
        addIncome,
        addExpense,
        handleIncomeDelete,
        handleExpenseDelete   
    }
}

export default useFunctions