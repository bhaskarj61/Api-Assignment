import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from 'react-native';

export default App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://randomuser.me/api/?seed=1&page=1&results=10')
      .then((response) => response.json())
      .then((json) => setData(json.results))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.contentContainer}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList padding={30}
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text style={{height:100}}>Name: {item.name.first} {item.name.last}  
            ,  gender: {item.gender},  email:{item.email}</Text>
          )}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
    
  contentContainer: {
      backgroundColor: 'pink',
      padding: 10,
  },
});