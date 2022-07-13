// import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import TableDisplay from './components/TableDisplay';
import {Switch,Route,Routes} from "react-router-dom";
import Details from './components/Details';
import Edit from './components/Edit';


function App() {
  return (
    <>
    <Routes>
      <Route exact path='/register' element={<Home/>}/>
      <Route exact path='/edit/:id' element={<Edit/>}/>
      <Route exact path='/' element={<TableDisplay/>}/>
      <Route exact path='/view/:id' element={<Details/>}/>
    </Routes>
  
    
    </>
  );
}

export default App;
