import { View, Text } from 'react-native'
import React from 'react';

// keyboard avoiding view
import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard} from 'react-native';

//colors
import { Colors } from './../components/styles';
const {primary} = Colors;

const KeyboardAvoidingWrapper = ({ children }) => {
  return (
   <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#FFFFFF'}}> 
        <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {children}
            </TouchableWithoutFeedback>
        </ScrollView>
   </KeyboardAvoidingView>
  )
}

export default KeyboardAvoidingWrapper