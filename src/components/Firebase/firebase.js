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

    getUserProfile({userId, onSnapshot}){
        return this.db.collection('publicProfiles')
        .where('userId', '==', userId)
        .limit(1)
        .onSnapshot(onSnapshot)
    }

    async createDriver({driverName}){
        const createDriverCallable = this.functions.httpsCallable('createDriver');
        return createDriverCallable({
            driverName
        })
    }

    async getDrivers(){
        return this.db.collection('drivers').get();
    }

    async register({email,password, username}) {
        await this.auth.createUserWithEmailAndPassword(email,password);
        const createPublicCallable = this.functions.httpsCallable('createPublicProfile')
        return createPublicCallable({
            username
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
