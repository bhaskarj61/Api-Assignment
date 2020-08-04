import React from 'react';
import { FlatList, Text, View } from 'react-native';
import Realm from 'realm';
let realm;

export default class ViewAllMovies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FlatListItems: [],
    };
    realm = new Realm({ path: 'MoviesDatabase.realm' });
    var movies_details = realm.objects('movies_details');
    this.state = {
      FlatListItems: movies_details,
    };
  }
  ListViewItemSeparator = () => {
    return (
      <View style={{ height: 4.0, width: '100%', backgroundColor: 'white' }} />
    );
  };
  render() {
    return (
      <View>
        <FlatList
          data={this.state.FlatListItems}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ backgroundColor: 'pink', padding: 20 }}>
              <Text>Id: {item.movies_id}</Text>
              <Text>Name: {item.movies_name}</Text>
              <Text>Genre: {item.genre}</Text>
              <Text>Description: {item.description}</Text>
              <Text>Url: {item.url}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}