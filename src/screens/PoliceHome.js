import React from 'react'
import { View, Text } from 'react-native'
import { Title, List } from 'react-native-paper'
import firebase from 'firebase'

import firestore from '@react-native-firebase/firestore'

export default function PoliceHome() {
  const [expanded, setExpanded] = React.useState(true)
  const handlePress = () => setExpanded(!expanded)

  const getAllReports = () => {
    firestore()
      .collection('reports')
      .get()
      .then((querySnapshot) => {
        console.log(querySnapshot)
        // console.log('Total users: ', querySnapshot.size)

        // querySnapshot.forEach((documentSnapshot) => {
        //   console.log('User ID: ', documentSnapshot.id, documentSnapshot.data())
        // })
      })
  }

  const renderPolice = () => {}

  React.useEffect(() => {
    getAllReports()
  })

  return (
    <View>
      <List.Section title="Live Emergencies">
        <List.Accordion
          title={<Title>Police(5)</Title>}
          left={(props) => <List.Icon {...props} icon="plus" />}
        >
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
        <List.Accordion
          title={<Title>Women(2)</Title>}
          left={(props) => <List.Icon {...props} icon="alert" />}
        >
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
        <List.Accordion
          title={<Title>Fire(0)</Title>}
          left={(props) => <List.Icon {...props} icon="fire" />}
          onPress={handlePress}
        >
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
        <List.Accordion
          title={<Title>Ambulance(1)</Title>}
          left={(props) => <List.Icon {...props} icon="ambulance" />}
          onPress={handlePress}
        >
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
      </List.Section>
    </View>
  )
}
