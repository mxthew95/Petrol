import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, TextInput, Button } from 'react-native';
import { bin } from '../jsonBin.js';
import Petrol from './Petrol.js';

export default class Petrols extends React.Component {
  _isMounted = false;

  //define constructor
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      items: null,
      text: ''
    }
  }

//GET request data from jsonbin API
//set the states accordingly
getData = () => {
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

//PUT request data to jsonbin API
submitData = (input) => {
  if(input.trim() === ""){
    return;
  }

  let time = new Date(input.split('/').reverse().join('/')).getTime(),
      a = {
        "date": input,
        "id": Math.random().toString(36).substr(2, 9),
        "time": time
      },
      b = this.state.items.concat(a);

  this.setState({items:b});

  fetch(bin.url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'secret-key': bin.key,
      'versioning': false
    },
    body: JSON.stringify({
      "db": b
    })
  })
  .then((response) => response.json())
  .then((result) => {
    console.log('Success:', result);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

deleteData = (id) => {
    const newItems = this.state.items.filter(item=>item.id !== id);

    this.setState({items:newItems})

    fetch(bin.url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'secret-key': bin.key,
        'versioning': false
      },
      body: JSON.stringify({
        "db": newItems
      })
    })
    .then((response) => response.json())
    .then((result) => {
      console.log('Success:', result);

    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

changeHandler = (input) => {
  this.setState({ text: input })
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

      let sortedItems = this.state.items.sort((a,b)=>b.time-a.time).map((item,index)=>{
        item.status = false;

        if(index !== this.state.items.length-1){
          let days = (item.time - this.state.items[index+1].time) / (1000*60*60*24);
          item.status = days >= 15 ? true : false;
        }

        return item;
      });

        return (
          <View style={styles.list}>
            <View style={styles.date}>
              <TextInput
                style = {styles.dateInput}
                placeholder = 'dd/mm/yyyy'
                onChangeText = {this.changeHandler}
              />
              <Button onPress={() => this.submitData(this.state.text)} style={styles.addBtn} title='save'/>
            </View>
            <FlatList
              data={sortedItems}
              renderItem={({ item }) =>(
                <Petrol item={item} status={item.status} handleDelete = {this.deleteData} />
              )}
              keyExtractor={item => item.id.toString()}
            />
          </View>
        );
    }
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  },
  date:{
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 40,
    marginRight: 40,
    justifyContent: 'center'
  },
  dateInput: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  addBtn: {
    fontWeight: 'bold',
    fontSize: 24
  }

})
