import { Firestore } from "lib/firebase/Firestore";

const getCatMapInfo = async (setCatMapInfo) => {
    const firestore = new Firestore();
    firestore.init();
    await firestore.Data.then(datas => {
        setCatMapInfo(datas)
    });
}

export default getCatMapInfo;