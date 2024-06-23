import { Firestore } from "utils/firebase/firebase";

type AddCatMapInfos = {
    title: string;
    describe: string;
    image: File | undefined;
    lat: string;
    lng: string;
  };

const addCatMapInfo = async (addCatMapInfo:AddCatMapInfos) => {
    const firestore = new Firestore();
    firestore.init();

    if (!addCatMapInfo.image) return;
    firestore.addCatImage(addCatMapInfo.image).then(data => {
        firestore.storeData(data).then(imagePath => {
            firestore.addCatMapData({
                title: addCatMapInfo.title,
                describe: addCatMapInfo.describe,
                image: imagePath[0],
                center: {
                    lat: Number(addCatMapInfo.lat),
                    lng: Number(addCatMapInfo.lng)
                },
            });
        });
    });
}

export default addCatMapInfo;