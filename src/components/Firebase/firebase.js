import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { devConfig } from "./config";

class Firebase {
  constructor() {
    app.initializeApp(devConfig);
    this.auth = app.auth();
    this.db = app.database();
    this.googleProvider = new app.auth.GoogleAuthProvider();
  }
  signInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);
  signOut = () => this.auth.signOut();
  user = uid => this.db.ref(`users/${uid}`);
}

export default Firebase;
