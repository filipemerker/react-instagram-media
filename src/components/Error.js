import React from 'react'
import { View, Text, Linking, TouchableOpacity } from 'react-native'

const Error = uri => (
  <View>
    <Text>Something went wrong.</Text>
    <Text>
      {`View this post`}
      <TouchableOpacity onPress={Linking.openURL(uri)}>an Instagram</TouchableOpacity>
      {`.`}
    </Text>
  </View>
)