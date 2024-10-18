// @ts-check

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import DashBoard from './pages/Main/Dashboard';
import React from 'react';
import Home from './pages/Main/Home';
import Favourite from './pages/Main/Favourite';
import PurchaseHistory from './pages/Main/PurchaseHistory';
import MyProfile from './pages/Main/MyProfile';
import Restaurant from './pages/Restaurant/Restaurant';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Dashboard components */}
                <Route
                    path="/"
                    element={
                        <DashBoard header={true}>
                            <Home />
                        </DashBoard>
                    }
                />
                <Route
                    path="/favourites"
                    element={
                        <DashBoard header={false}>
                            <Favourite />
                        </DashBoard>
                    }
                />
                <Route
                    path="purchase_history"
                    element={
                        <DashBoard header={false}>
                            <PurchaseHistory />
                        </DashBoard>
                    }
                />
                <Route
                    path="myprofile"
                    element={
                        <DashBoard header={false}>
                            <MyProfile />
                        </DashBoard>
                    }
                />

                <Route
                    path="restaurants/:restaurantID"
                    element={<Restaurant />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
