import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TextInput } from 'react-native';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState('');

  useEffect(() => {
    axios.get('http://YOUR_IP_ADDRESS:3000/api/data')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleAddData = () => {
    axios.post('http://YOUR_IP_ADDRESS:3000/api/data', { name: input })
      .then(response => {
        setData([...data, { id: response.data.id, name: input }]);
        setInput('');
      })
      .catch(error => {
        console.error(error);
      });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {data.map(item => (
        <View key={item.id} style={styles.item}>
          <Text style={styles.itemText}>{item.name}</Text>
        </View>
      ))}
      <TextInput 
        style={styles.input} 
        placeholder="Enter new data" 
        value={input}
        onChangeText={setInput}
      />
      <Button title="Add Data" onPress={handleAddData} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  item: {
    padding: 10,
    marginVertical: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5
  },
  itemText: {
    fontSize: 18
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10
  }
});

export default App;
