import app from "firebase/app";
import "firebase/auth";
// import "firebase/database";
import { devConfig } from "./config";

class Firebase {
  constructor() {
    app.initializeApp(devConfig);
    this.auth = app.auth();
    // this.db = app.database()
  }
  googleProvider = new app.auth.GoogleAuthProvider();
  signInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);
  signOut = () => this.auth.signOut();
}

export default Firebase;
