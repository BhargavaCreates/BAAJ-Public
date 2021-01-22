const users = await firestore()
  .collection('reports')
  .get()
  .then((querySnapshot) => {
    console.log('Total users: ', querySnapshot.size)

    querySnapshot.forEach((documentSnapshot) => {
      console.log('User ID: ', documentSnapshot.id, documentSnapshot.data())
    })
  })
