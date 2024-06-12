import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, Button, FlatList, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addUser = async () => {
    try {
      const response = await axios.post('http://localhost:3000/users', {
        username,
        email
      });
      setUsers([...users, response.data]);
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async () => {
    try {
      const response = await axios.patch(`http://localhost:3000/users/${id}`, {
        username,
        email
      });
      const updatedUsers = users.map((user) =>
        user._id === id ? response.data : user
      );
      setUsers(updatedUsers);
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/users/${userId}`);
      const filteredUsers = users.filter((user) => user._id !== userId);
      setUsers(filteredUsers);
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setUsername('');
    setEmail('');
    setId(null);
  };

  const handleSubmit = () => {
    if (id) {
      updateUser();
    } else {
      addUser();
    }
  };

  const handleEdit = (user) => {
    setUsername(user.username);
    setEmail(user.email);
    setId(user._id);
  };

  return (
    <ScrollView>
      <Text>Manage Users</Text>
      <View>
        <Text>User Management</Text>
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
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <Button title={id ? "Update User" : "Add User"} onPress={handleSubmit} />
        <FlatList
          data={users}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>Username: {item.username}</Text>
              <Text>Email: {item.email}</Text>
              <Button title="Edit" onPress={() => handleEdit(item)} />
              <Button title="Delete" onPress={() => deleteUser(item._id)} />
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

export default UserManager;
