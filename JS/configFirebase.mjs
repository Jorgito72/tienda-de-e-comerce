// Importa el SDK de Firebase
import firebase from 'firebase/app';
import 'firebase/firestore';

// Configura la conexión con Firestore
const firebaseConfig = {
  apiKey: "AIzaSyDXiLwa0qJfWColwuUn5V49_M292JE5jb8",
  authDomain: "tienda-fresh-on-line.firebaseapp.com",
  projectId: "tienda-fresh-on-line",
  storageBucket: "tienda-fresh-on-line.appspot.com",
  messagingSenderId: "1086464002711",
  appId: "1:1086464002711:web:341238ebd9361080eff7d2",
  measurementId: "G-CEE4VPGEB3"
};

// Inicializa la app de Firebase
firebase.initializeApp(firebaseConfig);

// Obtiene una instancia de Firestore
const db = firebase.firestore();

// Ahora puedes utilizar db para interactuar con Firestore
// Por ejemplo, puedes realizar operaciones de lectura y escritura en las colecciones de Firestore