import React from 'react'
import { View, Text } from 'react-native'
import { Title, List, Button, Card } from 'react-native-paper'
import firebase from 'firebase'

import firestore from '@react-native-firebase/firestore'
import { ScrollView } from 'react-native-gesture-handler'

export default function PoliceHome() {
  const [expanded, setExpanded] = React.useState(true)
  const [policeReports, setPoliceReports] = React.useState([])
  const [womenReports, setWomenReports] = React.useState([])
  const [fireReports, setFireReports] = React.useState([])
  const [ambulanceReports, setAmbulanceReports] = React.useState([])
  const handlePress = () => setExpanded(!expanded)

  const getAllReports = async () => {
    firestore()
      .collection('reports')
      .where('emergencyCategory', '==', 'police')
      .get()
      .then((querySnapshot) => {
        let tempReports = []
        querySnapshot.forEach((documentSnapshot) => {
          console.log(documentSnapshot.data())
          tempReports.push(documentSnapshot.data())
        })
        setPoliceReports(tempReports)
      })
    firestore()
      .collection('reports')
      .where('emergencyCategory', '==', 'women')
      .get()
      .then((querySnapshot) => {
        let tempReports = []
        querySnapshot.forEach((documentSnapshot) => {
          console.log(documentSnapshot.data())
          tempReports.push(documentSnapshot.data())
        })
        setWomenReports(tempReports)
      })
    firestore()
      .collection('reports')
      .where('emergencyCategory', '==', 'fire')
      .get()
      .then((querySnapshot) => {
        let tempReports = []
        querySnapshot.forEach((documentSnapshot) => {
          console.log(documentSnapshot.data())
          tempReports.push(documentSnapshot.data())
        })
        setFireReports(tempReports)
      })
    firestore()
      .collection('reports')
      .where('emergencyCategory', '==', 'ambulance')
      .get()
      .then((querySnapshot) => {
        let tempReports = []
        querySnapshot.forEach((documentSnapshot) => {
          console.log(documentSnapshot.data())
          tempReports.push(documentSnapshot.data())
        })
        setAmbulanceReports(tempReports)
      })
  }

  const handleOpenInMap = (report) => {
    console.log(report)
  }

  const RenderPolice = () => {
    return (
      <List.Accordion
        title={<Title>Police(5)</Title>}
        left={(props) => <List.Icon {...props} icon="plus" />}
      >
        {policeReports.map((report) => {
          return (
            <Card>
              <Card.Title title={report.userId} />
              <Card.Actions>
                <Button
                  mode="contained"
                  onPress={() => {
                    handleOpenInMap(report['coordinates'])
                  }}
                >
                  Open in Google Map
                </Button>
              </Card.Actions>
            </Card>
          )
        })}
        {/* <List.Item title="Second item" /> */}
      </List.Accordion>
    )
  }

  React.useEffect(() => {
    getAllReports()
  }, [])

  const RenderWomen = () => {
    return (
      <List.Accordion
        title={<Title>Women(2)</Title>}
        left={(props) => <List.Icon {...props} icon="alert" />}
      >
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>
    )
  }

  const RenderFire = () => {
    return (
      <List.Accordion
        title={<Title>Fire(0)</Title>}
        left={(props) => <List.Icon {...props} icon="fire" />}
      >
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>
    )
  }
  const RenderAmbulance = () => {
    return (
      <List.Accordion
        title={<Title>Ambulance(1)</Title>}
        left={(props) => <List.Icon {...props} icon="ambulance" />}
      >
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>
    )
  }

  return (
    <ScrollView>
      <View>
        <Button onPress={() => console.log(totalReports)}>reports</Button>
        <List.Section title="Live Emergencies">
          <RenderPolice />
          <RenderWomen />
          <RenderFire />
          <RenderAmbulance />
        </List.Section>
      </View>
    </ScrollView>
  )
}
