import Header from 'components/base/Header/Header'
import Footer from 'components/base/Footer/Footer'
import { GrobalNavigation } from 'components/ui/GrobalNavigation/GrobalNavigation'
import React from 'react';
import { Signup } from "components/page/Signup"

const signup = () => {
  return (
    <>
      <Header></Header>
      <Signup></Signup>
      <GrobalNavigation/>
      <Footer></Footer>
    </>
  );
};

export default signup;
