import React from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import Realm from 'realm';
let realm;

export default class UpdateUser extends React.Component {
  constructor(props) {
    super(props);
    realm = new Realm({ path: 'MoviesDatabase.realm' });
    this.state = {
      input_movies_id: '',
      movies_name: '',
      genre: '',
      description: '',
      url:'',
    };
  }
  searchMovies = () => {
    const { input_movies_id } = this.state;
    console.log(this.state.input_movies_id);
    var movies_details = realm
      .objects('movies_details')
      .filtered('movies_id =' + input_movies_id);
    console.log(movies_details);
    if (movies_details.length > 0) {
      this.setState({
        movies_name: movies_details[0].movies_name,
      });
      this.setState({
        genre: movies_details[0].genre,
      });
      this.setState({
        description: movies_details[0].description,
      });
      this.setState({
        url: movies_details[0].url,
      });
    } else {
      alert('No movies found');
      this.setState({
        movies_name: '',
      });
      this.setState({
        genre: '',
      });
      this.setState({
        description: '',
      });
      this.setState({
        url: '',
      });
    }
  };
  updateMovies = () => {
    var that = this;
    const { input_movies_id } = this.state;
    const { movies_name } = this.state;
    const { genre } = this.state;
    const { description } = this.state;
    const { url } = this.state;
    if (input_movies_id) {
      if (movies_name) {
        if (genre) {
          if (description) {
            if (url) {
            realm.write(() => {
              var ID = this.state.input_movies_id;
              console.log('ID', ID);
              var obj = realm
                .objects('movies_details')
                .filtered('movies_id =' + this.state.input_movies_id);
              console.log('obj', obj);
              if (obj.length > 0) {
                obj[0].movies_name = this.state.movies_name;
                obj[0].genre = this.state.genre;
                obj[0].description = this.state.description;
                obj[0].url = this.state.url;
                Alert.alert(
                  'Success',
                  'Movies updated successfully',
                  [
                    {
                      text: 'Ok',
                      onPress: () =>
                        that.props.navigation.navigate('HomeScreen'),
                    },
                  ],
                  { cancelable: false }
                );
              } else {
                alert('Movies Updation Failed');
              }
            });
          } else {
            alert('Please fill url');
          }
        } else {
          alert('Please fill Description');
        }
      } else {
        alert('Please fill genre');
      }
    } else {
      alert('Please fill Movies Name');
    }
  }else {
    alert('Please fill User Id');
  }
};

  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'space-between' }}>
            <Mytextinput
              placeholder="Enter Movies Id"
              onChangeText={input_movies_id => this.setState({ input_movies_id })}
            />
            <Mybutton
              title="Search Movies"
              customClick={this.searchMovies.bind(this)}
            />
            <Mytextinput
              placeholder="Enter Movies"
              value={this.state.movies_name}
              onChangeText={movies_name => this.setState({ movies_name })}
            />
            <Mytextinput
              placeholder="Enter Genre"
              value={'' + this.state.genre}
              onChangeText={genre => this.setState({ genre })}
              maxLength={10}
            />
            <Mytextinput
              value={this.state.description}
              placeholder="Description"
              onChangeText={description => this.setState({ description })}
              maxLength={225}
              numberOfLines={8}
              multiline={true}
              style={{ textAlignVertical: 'top' }}
            />
             <Mytextinput
              placeholder="Enter Url"
              value={'' + this.state.url}
              onChangeText={url => this.setState({ url })}
              />
            <Mybutton
              title="Update Movies"
              customClick={this.updateMovies.bind(this)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}