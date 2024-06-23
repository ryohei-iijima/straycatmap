import { catMapInfos } from "features/Top/types";
import { Firestore } from "utils/firebase/firebase";

const getCatMapInfo = async (): Promise<catMapInfos> => {
    const firestore = new Firestore();
    firestore.init();
    return await firestore.Data.then(datas => {
      return datas as catMapInfos;
    });
}

export default getCatMapInfo;