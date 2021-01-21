import React from 'react'
import { View, Text } from 'react-native'
import Backgroud from '../components/Background'
import Paragraph from '../components/Paragraph'
import { useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import GetLocation from 'react-native-get-location'
import { ScrollView } from 'react-native-gesture-handler'
import { TextInput } from '../components/TextInput'
import { Button } from 'react-native-paper'
import { logoutUser } from '../api/auth-api'

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

  const handleReportClick = (data) => {
    const dataObj = {
      coordinates: markerCoords,
      messgae: message,
    }
    console.log(dataObj)
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
      <View>
        <Button mode="contained" style={{ margin: 10 }} color="red">
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
