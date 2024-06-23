import Header from 'components/base/Header/Header'
import Footer from 'components/base/Footer/Footer'
import { GrobalNavigation } from 'components/ui/GrobalNavigation/GrobalNavigation'
import { Login } from "components/page/Login/";

const login = () => {
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
