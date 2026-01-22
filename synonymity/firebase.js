
<script type="module">
  // Firebase App and Firestore (CDN)
  import { initializeApp } from "https://www.gstatic.com/firebasejs/14.20.0/firebase-app.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/14.20.0/firebase-firestore.js";

  // Your Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBfmMBdqB_X4Ld8qsBzh0BDbivEhqL77HU",
    authDomain: "synonimity-9f3f1.firebaseapp.com",
    projectId: "synonimity-9f3f1",
    storageBucket: "synonimity-9f3f1.firebasestorage.app",
    messagingSenderId: "394380194789",
    appId: "1:394380194789:web:5624d6079cb9aa045b350c",
    measurementId: "G-RM7WR4895F"};

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
</script>
