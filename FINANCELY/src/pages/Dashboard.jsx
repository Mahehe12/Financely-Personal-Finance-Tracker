import React, { useEffect, useState } from 'react';
import Header from '../Components/Header/Index';
import Cards from '../Components/Cards/Index';
import AddExpenseModal from '../Components/Modals/AddExpense';
import AddIncomeModal from '../Components/Modals/AddIncome';
import { auth, db } from '../FireBase';
import { addDoc, collection, query, getDocs } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TransactionTable from '../Components/TransactionTable/Index';
import ChartComponent from '../Components/CharComponent/Index';
import NoTransactions from '../Components/NoTransaction/Index';
import Loader from '../Components/Loader/Index';

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

  let [income, setIncome] = useState(0);
  let [expense, setExpense] = useState(0);
  let [totalBalance, setTotalBalance] = useState(0);

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: values.date.format('YYYY-MM-DD'),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    addTransaction(newTransaction);
  };

  async function addTransaction(transaction, many) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      if (!many) toast.success('Transaction Added!');

      //Append new changes as well
      let newArr = [...transactions, transaction];
      setTransactions(newArr);
      calculateBalance();

      setIsExpenseModalVisible(false);
      setIsIncomeModalVisible(false);
    } catch (e) {
      console.error('Error adding document: ', e);
      if (!many) toast.error('Error adding transaction');
    }
  }

  useEffect(() => {
    fetchTransactions();

  }, [user])

  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        transactionsArray.push(doc.data());
        console.log('Fetched Transactions: ', transactionsArray);
      });
      setTransactions(transactionsArray);
      toast.success("Transactions Fetched!");
    }
    setLoading(false);
  }

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  const calculateBalance = () => {
    let incomeTotal = 0;
    let expenseTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === 'income') {
        incomeTotal += transaction.amount;
      } else {
        expenseTotal += transaction.amount;
      }
    });

    setIncome(incomeTotal);
    setExpense(expenseTotal);
    setTotalBalance(incomeTotal - expenseTotal);
  }

  let sortedTransactions = transactions.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  })

  return (
    <div className='dashboard-container'>
      <Header />
      {loading ? (<Loader />) :
        <>
          <Cards income={income} expense={expense} totalBalance={totalBalance}
            showExpenseModal={showExpenseModal} showIncomeModal={showIncomeModal} />

          {transactions && transactions.length != 0 ? <ChartComponent sortedTransactions={sortedTransactions} /> : <NoTransactions />}

          <AddExpenseModal
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
          />
          <AddIncomeModal
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
          />
          <TransactionTable transactions={transactions} addTransaction={addTransaction} fetchTransactions={fetchTransactions} />
        </>
      }
      <ToastContainer />
    </div>
  );
}

export default Dashboard;
