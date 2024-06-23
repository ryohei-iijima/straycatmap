import { Firestore } from "utils/firebase/firebase";

type catMapInfoType = 
{
  title: string,
  describe: string,
  image: string,
  center: {
    lat: number,
    lng: number
  }
}[]

const getCatMapInfo = async (setCatMapInfo: React.Dispatch<React.SetStateAction<catMapInfoType>>) => {
    const firestore = new Firestore();
    firestore.init();
    await firestore.Data.then(datas => {
        setCatMapInfo(datas)
    });
}

export default getCatMapInfo;