import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, Button, FlatList, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const TransactionManager = () => {
  const [transactions, setTransactions] = useState([]);
  const [item_id, setItemId] = useState('');
  const [user_id, setUserId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [total_price, setTotalPrice] = useState('');
  const [id, setId] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:3000/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addTransaction = async () => {
    try {
      const response = await axios.post('http://localhost:3000/transactions', {
        item_id,
        user_id,
        quantity: parseInt(quantity),
        total_price: parseFloat(total_price),
      });
      setTransactions([...transactions, response.data]);
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const updateTransaction = async () => {
    try {
      const response = await axios.patch(`http://localhost:3000/transactions/${id}`, {
        item_id,
        user_id,
        quantity: parseInt(quantity),
        total_price: parseFloat(total_price),
      });
      const updatedTransactions = transactions.map((transaction) =>
        transaction._id === id ? response.data : transaction
      );
      setTransactions(updatedTransactions);
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTransaction = async (transactionId) => {
    try {
      await axios.delete(`http://localhost:3000/transactions/${transactionId}`);
      const filteredTransactions = transactions.filter((transaction) => transaction._id !== transactionId);
      setTransactions(filteredTransactions);
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setItemId('');
    setUserId('');
    setQuantity('');
    setTotalPrice('');
    setId(null);
  };

  const handleSubmit = () => {
    if (id) {
      updateTransaction();
    } else {
      addTransaction();
    }
  };

  const handleEdit = (transaction) => {
    setItemId(transaction.item_id);
    setUserId(transaction.user_id);
    setQuantity(transaction.quantity.toString());
    setTotalPrice(transaction.total_price.toString());
    setId(transaction._id);
  };

  return (
    <ScrollView>
      <Text>Manage Transactions</Text>
      <View>
        <Text>Transaction Management</Text>
        <Image
          source={{
            uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
          }}
          style={{ width: 200, height: 200 }}
        />
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Item ID"
          value={item_id}
          onChangeText={setItemId}
        />
        <TextInput
          style={styles.input}
          placeholder="User ID"
          value={user_id}
          onChangeText={setUserId}
        />
        <TextInput
          style={styles.input}
          placeholder="Quantity"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Total Price"
          value={total_price}
          onChangeText={setTotalPrice}
          keyboardType="numeric"
        />
        <Button title={id ? "Update Transaction" : "Add Transaction"} onPress={handleSubmit} />
        <FlatList
          data={transactions}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>Item ID: {item.item_id}</Text>
              <Text>User ID: {item.user_id}</Text>
              <Text>Quantity: {item.quantity}</Text>
              <Text>Total Price: {item.total_price}</Text>
              <Button title="Edit" onPress={() => handleEdit(item)} />
              <Button title="Delete" onPress={() => deleteTransaction(item._id)} />
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  item: {
    padding: 10,
    marginVertical: 8,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default TransactionManager;
