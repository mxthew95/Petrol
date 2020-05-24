import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import { bin } from './jsonBin.js';
import Petrol from './Petrol.js';

export default class Petrols extends React.Component {
  _isMounted = false;

  //define constructor
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      items: null
    }
  }

//fetch data from jsonbin API
//set the states accordingly
getData(){
  fetch(bin.url+bin.version, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'secret-key': bin.key
      },
    })
    .then((response) => response.json())
    .then((data) => {
      if(this._isMounted){
          this.setState({
            items: data.db,
            isLoading: false
          });
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

componentDidMount(){
  this._isMounted = true;
  this.getData();
}

compnentWillUnmount(){
  this._isMounted = false;
}

  render(){
    if(this.state.isLoading){
      return (
        <View>
          <ActivityIndicator/>
        </View>
      );
    }
    else{
        return (
          <View style={styles.list}>
            <FlatList
              data={this.state.items}
              renderItem={({item}) =>(
                <Petrol item={item} />
              )}
            />
          </View>
        );
    }
  }
}

const styles = StyleSheet.create({
  list: {

  }
})
