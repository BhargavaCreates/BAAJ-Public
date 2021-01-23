import React from 'react'
import { View, Text } from 'react-native'
import Backgroud from '../components/Background'
import Paragraph from '../components/Paragraph'
import { useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import GetLocation from 'react-native-get-location'
import { Button } from 'react-native-paper'
import { logoutUser } from '../api/auth-api'
import firebase from 'firebase'

import firestore from '@react-native-firebase/firestore'

import { Picker } from '@react-native-picker/picker'

export default function Home() {
  const [region, setRegion] = useState({
    latitude: 28.613,
    longitude: 77.209,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  })

  const [markerCoords, setMarkerCoords] = useState({
    latitude: 28.613,
    longitude: 77.209,
  })

  const [message, setMessage] = useState('')

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState()
  const [emergencyCategory, setEmergencyCategory] = useState('police')

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user)
    console.log(user)
    if (initializing) setInitializing(false)
  }

  const sendEmergencyReport = (data) => {
    firestore()
      .collection('reports')
      .add(data)
      .then(() => {
        alert(
          `Your Report has been sent! ${emergencyCategory.toLocaleUpperCase()} helplines will soon revert back to you.`
        )
      })
  }

  const handleReportClick = async (data) => {
    const dataObj = {
      userId: user.providerData[0].uid,
      coordinates: markerCoords,
      emergencyCategory: emergencyCategory,
      isLive: true, // would only retrieve reports with isLive: true
      createdAt: Date.now(), // and are reported within an hour for Police Dashboard
    }

    sendEmergencyReport(dataObj)
  }

  React.useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        console.log('my location =>>>react', location)
        setRegion({
          ...region,
          longitude: location.longitude,
          latitude: location.latitude,
        })
        setMarkerCoords({
          longitude: location.longitude,
          latitude: location.latitude,
        })
      })
      .catch((error) => {
        const { code, message } = error
        console.warn(code, message)
      })
    const user = firebase.auth().currentUser
    setUser(user)
  }, [])
  return (
    // <Backgroud>
    <>
      <View
        style={{
          alignSelf: 'center',
          //   position: 'absolute',
          top: 10,

          width: 350,
          height: 400,
          margin: 20,
        }}
      >
        <MapView
          style={{ flex: 1 }}
          region={region}
          showsUserLocation={true}
          onRegionChangeComplete={(region) => {
            console.log(region)
            setRegion(region)
          }}
          onPress={(e) => {
            console.log(e.nativeEvent.coordinate.latitude)
            setMarkerCoords(e.nativeEvent.coordinate)
          }}
        >
          <Marker coordinate={markerCoords} draggable />
        </MapView>
      </View>
      <View style={{ marginHorizontal: 10 }}>
        <Picker
          selectedValue={emergencyCategory}
          style={{ height: 50, width: 400 }}
          onValueChange={(itemValue, itemIndex) =>
            setEmergencyCategory(itemValue)
          }
        >
          <Picker.Item label="Police" value="police" />
          <Picker.Item label="Fire" value="fire" />
          <Picker.Item label="Women Helpline" value="women" />
        </Picker>
      </View>
      <View>
        <Button
          mode="contained"
          style={{ margin: 10 }}
          color="red"
          onPress={handleReportClick}
        >
          Report
        </Button>
        <Button
          mode="outlined"
          style={{ marginHorizontal: 10 }}
          onPress={logoutUser}
        >
          Logout
        </Button>
      </View>
    </>
    // </Backgroud>
  )
}
