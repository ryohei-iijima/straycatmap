import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword, updateProfile, updatePassword, verifyBeforeUpdateEmail, User } from "firebase/auth";

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
    private auth: any;

    constructor () {
        this.app;
        this.store;
        this.db;
        this.auth;
    }
    init () {
        this.app = initializeApp(firebaseConfig);
        this.store = getStorage(this.app);
        this.db = getFirestore(this.app);
        this.auth = getAuth(this.app);
    }
    async postCatInfo (user: User, file: File, comment: string, title: string, lat: number | string, lng: number | string) {
        try {
            // のらねこ画像の登録処理
            const mountainsRef = await ref(this.store, `cat_images/${user.uid}/${file.name}`);
            await uploadBytes(mountainsRef, file);
            const registCatImagePath =  await getDownloadURL(mountainsRef).then((url) => {
                console.log('url', url);
                return url;
            });

            // 猫の情報をFirestore Detabaseに保存
            console.log('registCatImagePath', registCatImagePath);
            await addDoc(collection(this.db, 'catmapinfo'), {
                catMapPath: registCatImagePath,
                title: title,
                comment: comment,
                lat: lat,
                lng: lng,
                users_id: user.uid,
                created_at: serverTimestamp(),
                updated_at: serverTimestamp(),
            });
        } catch (error) {
            console.error('Error posting cat info:', error);
            if (error instanceof Error) {
                // エラーがErrorインスタンスの場合、messageプロパティにアクセスできます
                throw new Error(`Failed to post cat info: ${error.message}`);
            } else {
                // それ以外の場合、一般的なエラーメッセージをスローします
                throw new Error('Failed to post cat info');
            }
        }
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
        const mountainsRef = ref(this.store, `cat_images/${file?.name}`);
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
    get Auth () {
        this.app = initializeApp(firebaseConfig);
        this.auth = getAuth(this.app);
        return this.auth;
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
    async createUser (email: string, password: string, displayName: string, profileImage:File | string) {
        if (!displayName) displayName = "ゲスト";
        try {
            const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
            const user = userCredential.user;
            let profileImagePath;
            if (profileImage && profileImage instanceof File) {
                await this.addProfileImage(profileImage, user);
            }
            await this.updateProfile(user, displayName, profileImagePath);
        } catch (error) {
            throw new Error();
        }
    }
    async addProfileImage (file:File, user: User) {
        try {
            const mountainsRef = await ref(this.store, `profile_images/${user.uid}.${file?.name.split('.').pop()}`);
            await uploadBytes(mountainsRef, file);
            return await getDownloadURL(mountainsRef).then((url) => {
                return url;
            })
        } catch (error) {
            throw new Error();
        }
    }
    async updateProfile (user: User, displayName: string, profileImagePath = null) {
        try {
            await updateProfile(user, {
                displayName: displayName,
                photoURL: profileImagePath
            })
        } catch (error) {
            throw new Error();
        }
    }
    async updateDisplayName (user: User, newDisplayName: string) {
        try {
            await updateProfile(user, {
                displayName: newDisplayName,
            })
        } catch (error) {
            console.error('ニックネームの更新に失敗しました:', error);
        }
    }
    async updateProfileImage (user: User, newProfileImage:File) {
        try {
            const mountainsRef = await ref(this.store, `profile_images/${user.uid}.${newProfileImage?.name.split('.').pop()}`);
            await uploadBytes(mountainsRef, newProfileImage);
            await getDownloadURL(mountainsRef).then((url) => {
                updateProfile(user, {
                    photoURL: url,
                })    
            })
        } catch (error) {
            console.error('プロフィール画像の更新に失敗しました:', error);
        }
    }
    async updateEmail (user: User, newEmail: string) {
        try {
            await verifyBeforeUpdateEmail(user, newEmail);
        } catch (error) {
            console.error('メールアドレスの更新に失敗しました:', error);
            throw error
        }
    }
    async updatePassword (user: User, newPassword: string) {
        try {
            await updatePassword(user, newPassword)
        } catch (error) {
            console.error('パスワードの更新に失敗しました:', error);
        }
    }
    getProfileImage (filePath = "sample.jpeg") {
        const pathReference = ref(this.store, `gs://straycatmap-368512.appspot.com/${filePath}`);
        const hogehoge = async () => {
            try {
                const downloadUrl = await getDownloadURL(pathReference);
                console.log(downloadUrl);
                return downloadUrl;
            } catch (error) {
                throw new Error();
            }
        }
        return hogehoge();
    }
    checkStatus () {
        onAuthStateChanged(this.auth, (user) => {
            if (user) {
                // ユーザーがログインしている場合
                console.log("ユーザーがログイン中です。UID:", user.uid);
                return true;
            } else {
                // ユーザーがログアウトしている場合
                console.log("ユーザーはログアウトしています。");
                return false;
            }
        });
    }
    logOut () {
        signOut(this.auth).then(() => {
            // ログアウト成功時の処理
            console.log("ユーザーがログアウトしました。");
          }).catch((error) => {
            // エラー発生時の処理
            console.error("ログアウト中にエラーが発生しました:", error);
          });
    }
    logIn (email: string, password: string) {
        return signInWithEmailAndPassword(this.auth, email, password);
    }
}
