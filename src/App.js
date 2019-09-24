import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import styled from 'styled-components';

import { StateProvider } from "./contexts/omdbContext";

import './App.css';

// import { Header } from './components/header';
import { Preloader } from './components/preloader';
import TabBar from './containers/tabBar';

const AMDB = styled('div')`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: white;

  main{
    position: relative;
    height: calc(100% - 80px);
    overflow: auto;

    @media screen and (min-width: 1024px) {
      &::-webkit-scrollbar-track{
        box-shadow: none;
        border-radius: 10px;
        background-color: rgba(0, 0, 0, .5);
        width: 12px;
      }

      &::-webkit-scrollbar{
        width: 12px;
        background-color: transparent;
      }

      &::-webkit-scrollbar-thumb{
        border-radius: 10px;
        background-color: rgba(255, 255, 255, .2);
        width: 12px;
      } 
    }
  }
`

const Home = Loadable({
  loader: () => import("./views/Home"),
  loading() {
    return <Preloader />
  }
});

const Favorites = Loadable({
  loader: () => import("./views/Favorites"),
  loading() {
    return <Preloader />
  }
});

const Profile = Loadable({
  loader: () => import("./views/Profile"),
  loading() {
    return <Preloader />
  }
});

function App() {
  const initialState = {
    favorites: []
  };
  
  const reducer = (state, action) => {
    switch (action.type) {
      case 'addFavorite':
        return {
          ...state,
          favorites: action.newFavorite
        };
        
      default:
        return state;
    }
  };

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <AMDB>
        <BrowserRouter>
          <main id="main">
              <Switch>
                <Route path="/logar" component={Profile} />
                <Route path="/favorites" component={Favorites} />
                <Route path="/" component={Home} />
                <Route path="" component={Home} />
              </Switch>
          </main>
          <TabBar />
        </BrowserRouter>
      </AMDB>
    </StateProvider>
  );
}

export default App;
