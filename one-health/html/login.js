// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCNMpdiFyhajV8LOncj1O6lDKxLiM49EB0",
  authDomain: "contactform-758db.firebaseapp.com",
  databaseURL: "https://contactform-758db-default-rtdb.firebaseio.com",
  projectId: "contactform-758db",
  storageBucket: "contactform-758db.appspot.com",
  messagingSenderId: "228973039931",
  appId: "1:228973039931:web:44d373cae20557fd76671e",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.firestore()

// Set up our register function


function login () {
  // Get all our input fields
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  
 

  // Validate input fields
  

  auth
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      // Signed in
      // ...
      //console.log(auth.currentUser.email);
      if (auth.currentUser.email ) {
        window.location.href = 'index.html';
      } 
      signout();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
});
auth.onAuthStateChanged(function (user) {
  if (user) {
    console.log("logged in status");
    // document.getElementById("loginbutton").style.display = 'none';
  } else {
    // No user is signed in.
    console.log("not logged in", user);
  }
});

function signout() {
  // console.log(auth.currentUser);
  auth.signOut().then(() => {
    console.log("user logged out");
  });
}}


 
  // Move on with Auth
  /*auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      email : email,
      username : username,
      
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data)

    // DOne
    alert('User Created!!')
   
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })*/

   


// Set up our login function
function register () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is wrong!!')
    return
    // Don't continue running the code
  }


  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).update(user_data)

    // DOne
    if(user){
      window.location = 'index.html';
      alert('User Logged In!!')
      
    }
    

  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })

  
}

auth.onAuthStateChanged(user => {
  console.log(user)
})




// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}s