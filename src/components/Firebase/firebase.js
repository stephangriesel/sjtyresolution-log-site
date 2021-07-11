import firebaseConfig from "./config";
import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

app.initializeApp(firebaseConfig);

class Firebase {
    constructor() {
        if (!firebaseInstance) {
            this.auth = app.auth();
            this.db = app.firestore();
            this.functions = app.functions();
            this.storage = app.storage();
        }
    }

    async getUserProfile({userId}){
        return this.db.collection('publicProfiles').where('userId', '==', userId).get();
    }

    async register({email,password, username}) {
        const newUser = await this.auth.createUserWithEmailAndPassword(email,password);
        return this.db.collection('publicProfiles').doc(username).set({
            userId: newUser.user.uid
        })
    }

    async postComment({text,truckId}){
        const postCommentCallable = this.functions.httpsCallable('postComment'); // this postComment refers to postComment in function, not the method postComment one line up
        return postCommentCallable({
            text,
            truckId
        })
    }

    subscribeToTruckDetailsAndComments({truckId, onSnapshot}){
        const truckRef = this.db.collection('trucks').doc(truckId);
        return this.db.collection('detailsAndComments')
        .where('truck', '==', truckRef)
        .orderBy('dateCreated', 'desc')
        .onSnapshot(onSnapshot)
    }

    async login({ email, password }) {
        return await this.auth.signInWithEmailAndPassword(email, password);
    }

    async logout() {
        await this.auth.signOut();
    }
}

let firebaseInstance;

function getFirebaseInstance() {
    if (!firebaseInstance) {
        firebaseInstance = new Firebase();
        return firebaseInstance;
    } else if (firebaseInstance) {
        return firebaseInstance;
    } else {
        return null;
    }
}

export default getFirebaseInstance;
