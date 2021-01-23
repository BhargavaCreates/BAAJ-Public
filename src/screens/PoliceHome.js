import React from 'react'
import { View, Text } from 'react-native'
import { Title, List } from 'react-native-paper'
import Backgroud from '../components/Background'

export default function PoliceHome() {
  const [expanded, setExpanded] = React.useState(true)
  const handlePress = () => setExpanded(!expanded)

  return (
    <View>
      <List.Section title="Live Emergencies">
        <List.Accordion
          title={<Title>Police</Title>}
          left={(props) => <List.Icon {...props} icon="plus" />}
        >
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
        <List.Accordion
          title={<Title>Women </Title>}
          left={(props) => <List.Icon {...props} icon="alert" />}
        >
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
        <List.Accordion
          title={<Title>Fire</Title>}
          left={(props) => <List.Icon {...props} icon="fire" />}
          onPress={handlePress}
        >
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
        <List.Accordion
          title={<Title>Ambulance</Title>}
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
