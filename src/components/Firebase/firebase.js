import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import { devConfig } from "./config";

class Firebase {
  constructor() {
    app.initializeApp(devConfig);
    this.auth = app.auth();
    this.db = app.firestore();

    this.fieldValue = app.firestore.FieldValue;

    //  Social Sign In Method Provider
    this.googleProvider = new app.auth.GoogleAuthProvider();
  }

  //  Authentication API
  signInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);
  signOut = () => this.auth.signOut();

  //  Users API
  user = uid => this.db.doc(`users/${uid}`);

  //  Payments API
  payments = () => this.db.collection("payments");
  payment = uid => this.db.doc(`payments/${uid}`);

  //  Expenses API
  expenses = () => this.db.collection("expenses");
  expense = uid => this.db.doc(`expenses/${uid}`);
}

export default Firebase;
