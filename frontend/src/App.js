import react from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router,Route} from 'react-router-dom'
import Header from "./components/Header";
import  Footer from "./components/Footer";
import Homescreen from "./screens/HomeScreen"
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import ArtistScreen from "./screens/ArtistScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen"

const App = () =>{
  return (
    
    <Router>
    <Header/>
    <main className='pys3'>
      <div className="homepage-container">
        <Container>
        <Route path='/' component={HomeScreen} exact/>
        <Route path='/product/:id' component={ProductScreen}/>
        <Route path='/artist' component={ArtistScreen}/>
        <Route path='/cart/:id?' component={CartScreen}/>
        <Route path='/login' component={LoginScreen}/>
        <Route path='/register' component={RegisterScreen}/>
        <Route path='/profile' component={ProfileScreen}/>
        <Route path='/shipping' component={ShippingScreen}/>

        </Container>
      </div>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
