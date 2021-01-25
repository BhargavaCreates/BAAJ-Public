import React from 'react'
import { View, Text } from 'react-native'
import { Title, List, Button, Card } from 'react-native-paper'
import firebase from 'firebase'

import firestore from '@react-native-firebase/firestore'
import { ScrollView } from 'react-native-gesture-handler'
import openMap from 'react-native-open-maps'

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

  const handleOpenInMap = (coords) => {
    console.log({ ...coords, provider: 'google' })
    openMap({ ...coords, provider: 'google' })
  }

  const RenderPolice = () => {
    return (
      <List.Accordion
        title={<Title>Police({policeReports.length})</Title>}
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
                  Google Map
                </Button>
                <Button mode="contained">Evidences</Button>
              </Card.Actions>
            </Card>
          )
        })}
      </List.Accordion>
    )
  }

  React.useEffect(() => {
    getAllReports()
  }, [])

  const RenderWomen = () => {
    return (
      <List.Accordion
        title={<Title>Women({womenReports.length})</Title>}
        left={(props) => <List.Icon {...props} icon="plus" />}
      >
        {womenReports.map((report) => {
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
                  Google Map
                </Button>
                <Button mode="contained">Evidences</Button>
              </Card.Actions>
            </Card>
          )
        })}
      </List.Accordion>
    )
  }

  const RenderFire = () => {
    return (
      <List.Accordion
        title={<Title>Fire({fireReports.length})</Title>}
        left={(props) => <List.Icon {...props} icon="plus" />}
      >
        {fireReports.map((report) => {
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
                  Google Map
                </Button>
                <Button mode="contained">Evidences</Button>
              </Card.Actions>
            </Card>
          )
        })}
      </List.Accordion>
    )
  }
  const RenderAmbulance = () => {
    return (
      <List.Accordion
        title={<Title>Ambulance({ambulanceReports.length})</Title>}
        left={(props) => <List.Icon {...props} icon="plus" />}
      >
        {ambulanceReports.map((report) => {
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
                  Google Map
                </Button>
                <Button mode="contained">Evidences</Button>
              </Card.Actions>
            </Card>
          )
        })}
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
