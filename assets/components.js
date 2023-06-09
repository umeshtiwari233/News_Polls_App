import {View,TextInput,styles,Text} from 'react-native'
import React, { Component } from 'react';


export default class Umesh extends Component {
  
  render() {
    const {textdata}=this.props
    return (
      <View>
        <Text> ** {textdata}</Text>
        {/* <TextInput
        placeholder="useless placeholder"
        keyboardType="numeric"
      /> */}
      </View>
    )
  }
}

