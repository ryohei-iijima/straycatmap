import React from 'react';
import styles from 'components/ui/Modal/Modal.module.css';
import addCatMapInfo from "features/CatMap/api/addCatMapInfo";

export const ModalAddCat = (props:any) => {

  const addCatMap = () => {
    const addCatMapInfos = {
      title: document.getElementById('title')?.value,
      describe: document.getElementById('describe')?.value,
      image: document.getElementById('image')?.files[0],
      lat: document.getElementById('lat')?.value,
      lng: document.getElementById('lng')?.value,
    }
    try {
      addCatMapInfo(addCatMapInfos);
    } catch (error) {
      console.error(error)
      alert("登録時にエラーが発生しました。時間をおいてもう一度お試しください。")
    } finally {
      props.setIsAddCatMapModal(false)
    }
  }

  const modalClass = props.isModal ? `${styles["open"]} ${styles['modal']}` : styles['modal'];
  return (
      <div className={modalClass}>
      <div className={styles['modal-overlay']} onClick={props.modalClose}></div>
      <div className={styles['modal-content']}>
        <form>
        <label>
            <p>タイトル</p>
            <input id='title' type="text" />
          </label>
          <label>
            <p>説明文</p>
            <textarea id='describe' name=""></textarea>
          </label>
          <label>
            <p>画像</p>
            <input id='image' type="file" name="" />
          </label>
          <label>
            <p>座標</p>
            <p>lat:<input id="lat" type="number" name="" /></p>
            <p>lng:<input id="lng" type="number" name="" /></p>
          </label>
          <button type='button' className={styles['modal-close']} onClick={addCatMap}>追加</button>
        </form>
      </div>
    </div>  
  );
}