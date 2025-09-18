import Header from "./components/Header";
import Container from 'react-bootstrap/Container';
import TopMenu from "./components/TopMenu";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
const Layout=()=>{
    return(
        <>

       <Container>
           <Header/>
           <TopMenu/>
           
           <Outlet />

           <Footer/>

       </Container>


        
        
        </>
    )
}

export default Layout;