import { Firestore } from "lib/firebase/Firestore";
const firestore = new Firestore();
firestore.init();

export const Logout = async () => {
    try {
        await firestore.logOut();
        await alert("ログアウトしました。")
    } catch (error) {
    }
};