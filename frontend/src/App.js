import React from "react"
import {BrowserRouter, Routes ,Route} from 'react-router-dom'
import Navbar from "./components/Navbar/Navbar";
import UnfinishedOrders from "./components/Order_lists/Unfinished_order_list"
import FinishedOrders from "./components/Order_lists/Finished_order_list"
import Orders from "./components/Order_lists/All_orders";
import './App.css';



function App(props) {
    return (
        <BrowserRouter>
            <Routes>
            <Route element={<Navbar />}>
                <Route >
                    <Route path='' element={<Orders/>} />
                    <Route path='/finished' element={<FinishedOrders/>} />
                    <Route path='/unfinished' element={<UnfinishedOrders/>} />
                </Route>
            </Route>
         
            </Routes>
        </BrowserRouter>
    );
  }
  
export default App;