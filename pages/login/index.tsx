import Header from 'components/base/Header/Header'
import Footer from 'components/base/Footer/Footer'
import { GrobalNavigation } from 'components/ui/GrobalNavigation/GrobalNavigation'
import React, { useState } from 'react';
import { Firestore } from "lib/firebase/Firestore";
import { Login } from "components/page/Login/";

const login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const firestore = new Firestore();
  firestore.init();

  return (
    <>
      <Header></Header>
      <Login></Login>
      <GrobalNavigation/>
      <Footer></Footer>
    </>
  );
};

export default login;
