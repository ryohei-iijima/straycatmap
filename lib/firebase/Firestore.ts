import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STRAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_ADD_ID
};

type dataTypes = {
    title: string,
    describe: string,
    image: File | undefined,
    center: {
        lat: number,
        lng: number
    },
}

export class Firestore {
    private app: any;
    private store: any;
    private db: any;

    constructor () {
        this.app;
        this.store;
        this.db;
    }
    init () {
        this.app = initializeApp(firebaseConfig);
        this.store = getStorage(this.app);
        this.db = getFirestore(this.app)
    }
    addCatMapData (data:dataTypes) {
        addDoc(collection(this.db, "catmapinfo"), {
            title: data.title,
            describe: data.describe,
            image: data.image,
            center: {
              lat: data.center.lat,
              lng: data.center.lng
            }
        });
    }
    addCatImage (file:File) {
        const mountainsRef = ref(this.store, file?.name);
        return uploadBytes(mountainsRef, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            return mountainsRef.fullPath;
        });
    }
    get Data () {
        const getData = async () => {
            const result:Array<any> = [];
            const querySnapshot = await getDocs(collection(this.db, 'catmapinfo'));
            querySnapshot.forEach((doc) => {
                result.push(doc.data());
            })
            return result;
        }
        return getData();
    }
    storeData (filePath = "sample.jpeg") {
        const pathReference = ref(this.store, `gs://straycatmap-368512.appspot.com/${filePath}`);
        const hogehoge = async () => {
            const result:any[] = [];
            await getDownloadURL(pathReference)
            .then((url) => {
                result.push(url);
              })
            .catch((err) => console.log(err));
            return await result;
        };
        return hogehoge();
    }
}
