import React from 'react';
import { View,StyleSheet } from 'react-native';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import Realm from 'realm';
let realm;

export default class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    realm = new Realm({
      path: 'MoviesDatabase.realm',
      schema: [
        {
          name: 'movies_details',
          properties: {
            movies_id: { type: 'int', default: 0 },
            movies_name: 'string',
            genre: 'string',
            description: 'string',
            url:'string',
          },
        },
      ],
    });
  }

  render() {
    return (
      <View
        style={styles.container}>
        <Mytext text="Welcome To DashBoard" />
        <Mybutton
          title="Register Movies"
          customClick={() => this.props.navigation.navigate('Register')}
        />
        <Mybutton
          title="View Movies List"
          customClick={() => this.props.navigation.navigate('ViewAll')}
        />
        <Mybutton
          title="Update Movies"
          customClick={() => this.props.navigation.navigate('Update')}
        />
        <Mybutton
          title="Delete Movies"
          customClick={() => this.props.navigation.navigate('Delete')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container:{
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
});