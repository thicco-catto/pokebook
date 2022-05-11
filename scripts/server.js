const firebaseConfig = {
    apiKey: "AIzaSyC40Oh4sPupi4gFPpYV_GR-w85ACnW4HAo",
    authDomain: "pokebook-dbc8c.firebaseapp.com",
    projectId: "pokebook-dbc8c",
    storageBucket: "pokebook-dbc8c.appspot.com",
    messagingSenderId: "94431024453",
    appId: "1:94431024453:web:7a9b42eabaafbd760e9a2c",
    measurementId: "G-1QPM7DXVDK"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

//Get data
db.collection("user").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        document.getElementById("texto").textContent = doc.data().nombre;
    });
});