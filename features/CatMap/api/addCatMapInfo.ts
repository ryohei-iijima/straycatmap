import { Firestore } from "lib/firebase/Firestore";

const addCatMapInfo = async (addCatMapInfo) => {
    const firestore = new Firestore();
    firestore.init();

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