import React from 'react'
import {useState, useEffect} from 'react'
import Header from 'components/base/Header/Header';
import Footer from 'components/base/Footer/Footer';
import { createMap } from 'components/page/Index/index';
import getCatMapInfo from "features/CatMap/api/getCatMapInfo";
import { Modal } from 'components/ui/Modal/Modal';
import { ModalAddCat } from 'components/ui/Modal/ModalAddcat';
import { GrobalNavigation } from 'components/ui/GrobalNavigation/GrobalNavigation';
type catMapInfoType = 
{
  title: string,
  describe: string,
  image: string,
  center: {
    lat: number,
    lng: number
  }
}[] | []

function Map() {
  const [catMapInfo, setCatMapInfo] = useState<catMapInfoType>([]);
  const [isModal, setIsModal] = useState(false);
  const [isAddCatMapModal, setIsAddCatMapModal] = useState(false);
  const [selectCatInfo, setSelectCatInfo] = useState({});
  const [isCurrentPosition, setIsCurrentPosition] = useState(false);
  const [center, setCenter] = useState({
    lat: 35.75090315915706,
    lng: 139.78810085682267
  });

  useEffect(() => {
    getCatMapInfo(setCatMapInfo);
  }, []);

  const modalOpen = (catMap:object) => {
    setIsModal(true);
    setSelectCatInfo(catMap)
  }

  const modalClose = () => {
    setIsModal(false);
  }

  const addCatMapModalOpen = () => {
    setIsAddCatMapModal(true);
  }

  const addCatMapModalClose = () => {
    setIsAddCatMapModal(false);
  }

  return (
    <>
      { createMap(catMapInfo, isCurrentPosition, center, modalOpen, setIsCurrentPosition) }
      <Modal selectCatInfo={selectCatInfo} isModal={isModal} modalClose={modalClose}></Modal>
      <ModalAddCat isModal={isAddCatMapModal} modalClose={addCatMapModalClose} setIsAddCatMapModal={setIsAddCatMapModal}></ModalAddCat>
      <GrobalNavigation/>
    </>
  )
}

export default Map