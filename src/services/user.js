import {auth} from '../firebase'

export default class UserService {
  static login (email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  static logout () {
    return auth.signOut()
  }

  static register (email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  static isAuth (firebaseUser) {
    return auth.onAuthStateChanged(firebaseUser)
  }
}
