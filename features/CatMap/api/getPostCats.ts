import { Firestore } from "utils/firebase/firebase";

const getPostCats = async (userId: string) => {
    const firestore = new Firestore();
    firestore.init();
    return await firestore.myCatData(userId);
}

export default getPostCats;