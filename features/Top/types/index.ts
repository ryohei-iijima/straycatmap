 export type catMapInfos = [
    catMapInfo
] | [];

export type catMapInfo = {
    title: string,
    describe: string,
    image: string,
    center: {
      lat: number,
      lng: number
    }
}