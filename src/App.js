import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import styled from 'styled-components';

import './App.css';

// import { Header } from './components/header';
import { Preloader } from './components/preloader';

const AMDB = styled('div')`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #dedede;

  main{
    position: relative;
    height: 100%;
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

function App() {
  return (
    <AMDB>
      <BrowserRouter>
        <main id="main">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="" component={Home} />
            </Switch>
        </main>
      </BrowserRouter>
    </AMDB>
  );
}

export default App;
