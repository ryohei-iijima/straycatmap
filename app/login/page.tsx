import Header from 'components/base/Header/Header'
import Footer from 'components/base/Footer/Footer'
import { GrobalNavigation } from 'components/ui/GrobalNavigation/GrobalNavigation'
import { Login } from "components/page/Login/";
import { Suspense } from 'react'

const login = () => {
  return (
    <>
      <Header></Header>
      <Suspense>
        <Login></Login>
      </Suspense>
      <GrobalNavigation/>
      <Footer></Footer>
    </>
  );
};

export default login;
