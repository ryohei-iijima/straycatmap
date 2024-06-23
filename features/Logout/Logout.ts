import { Firestore } from "utils/firebase/firebase";
const firestore = new Firestore();
firestore.init();

export const Logout = async () => {
    try {
        await firestore.logOut();
        await alert("ログアウトしました。")
    } catch (error) {
    }
};