import { useState } from 'react'
import Home from './components/Home'
import { Route, Router, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import MovieDetail from './components/MovieDetail'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SingupPge'
import { UserContextProvider } from './context/UserContext'
import WatchlistPage from './components/WatchlistPage'
import MovieDetailforWatchlist from './components/MovieDetailforWatchlist'




function App() {




  return (
    <div>

      <UserContextProvider>

        <Routes>

          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/moviedetail/:id' element={<MovieDetail />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/watchlist' element={<WatchlistPage />} />
            <Route path='/moviedetailofwatchlist/:id' element={ <MovieDetailforWatchlist/> } />
          </Route>

        </Routes>

      </UserContextProvider>

    </div>

  )
}

export default App
