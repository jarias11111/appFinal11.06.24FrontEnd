import React, { useState, useEffect } from 'react';
import { Image, ScrollView, View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const AgregarScreen = () => {
  const [reciclables, setReciclables] = useState([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [id, setId] = useState(null);

  useEffect(() => {
    fetchReciclables();
  }, []);

  const fetchReciclables = async () => {
    try {
      const response = await axios.get('http://localhost:3000/reciclables');
      setReciclables(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addReciclable = async () => {
    try {
      const response = await axios.post('http://localhost:3000/reciclables', {
        name,
        quantity: parseInt(quantity),
        price: parseFloat(price),
      });
      setReciclables([...reciclables, response.data]);
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const updateReciclable = async () => {
    try {
      const response = await axios.patch(`http://localhost:3000/reciclables/${id}`, {
        name,
        quantity: parseInt(quantity),
        price: parseFloat(price),
      });
      const updatedReciclables = reciclables.map((reciclable) =>
        reciclable._id === id ? response.data : reciclable
      );
      setReciclables(updatedReciclables);
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteReciclable = async (reciclableId) => {
    try {
      await axios.delete(`http://localhost:3000/reciclables/${reciclableId}`);
      const filteredReciclables = reciclables.filter((reciclable) => reciclable._id !== reciclableId);
      setReciclables(filteredReciclables);
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setName('');
    setQuantity('');
    setPrice('');
    setId(null);
  };

  const handleSubmit = () => {
    if (id) {
      updateReciclable();
    } else {
      addReciclable();
    }
  };

  const handleEdit = (reciclable) => {
    setName(reciclable.name);
    setQuantity(reciclable.quantity.toString());
    setPrice(reciclable.price.toString());
    setId(reciclable._id);
  };

  return (
    <ScrollView>
      <Text>Some text</Text>
      <View>
        <Text>Some more text</Text>
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
          placeholder="Name"
          value={name}
          onChangeText={setName}
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
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <Button title={id ? "Update Reciclable" : "Add Reciclable"} onPress={handleSubmit} />
        <FlatList
          data={reciclables}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>Name: {item.name}</Text>
              <Text>Quantity: {item.quantity}</Text>
              <Text>Price: {item.price}</Text>
              <Button title="Edit" onPress={() => handleEdit(item)} />
              <Button title="Delete" onPress={() => deleteReciclable(item._id)} />
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

export default AgregarScreen;
