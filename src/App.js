import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Search from './components/Search';
import Picked from './components/Picked';
import ByCat from './components/ByCat';
import Upcoming from './components/Upcoming';
import News from './components/News';
import Born from './components/Born';
function App() {
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path='*' element={<div id='error'>Error 404: Not Found</div>}></Route>
        <Route path='/Rotten-Eggs-V2-ReactJs' element={<Home></Home>}></Route>
        <Route path='/search' element={<Search></Search>}></Route>
        <Route path='/Rotten-Eggs-V2-ReactJs/picked' element={<Picked></Picked>}></Route>
        <Route path='/Rotten-Eggs-V2-ReactJs/bycat' element={<ByCat></ByCat>}></Route>
        <Route path='/Rotten-Eggs-V2-ReactJs/upcoming' element={<Upcoming></Upcoming>}></Route>
        <Route path='/Rotten-Eggs-V2-ReactJs/news' element={<News></News>}></Route>
        <Route path='/Rotten-Eggs-V2-ReactJs/born' element={<Born></Born>}></Route>
        <Route path='/Rotten-Eggs-V2-ReactJs/born/picked' element={<Picked></Picked>}></Route>
        <Route path='/Rotten-Eggs-V2-ReactJs/upcoming/picked' element={<Picked></Picked>}></Route>
        <Route path='/Rotten-Eggs-V2-ReactJs/news/picked' element={<Picked></Picked>}></Route>
        <Route path='/Rotten-Eggs-V2-ReactJs/bycat/picked' element={<Picked></Picked>}></Route>
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;
