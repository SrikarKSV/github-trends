import React, { Component } from 'react';
import Nav from './components/Nav';
import './styles/main.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from './contexts/theme';
import Loading from './components/Loading';

const Home = React.lazy(() => import('./components/Home'));
const UserSearch = React.lazy(() => import('./components/UserSearch'));
const NotFound = React.lazy(() => import('./components/NotFound'));
const About = React.lazy(() => import('./components/About'));

export default class App extends Component {
  state = {
    theme: 'dark',
    toggleTheme: () => {
      this.setState(({ theme }) => ({
        theme: theme === 'dark' ? 'light' : 'dark',
      }));
    },
  };

  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={`bg-${this.state.theme}`}>
            <div className='container'>
              <Nav />
              <main>
                <React.Suspense fallback={<Loading />}>
                  <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/user-search' component={UserSearch} />
                    <Route path='/about' component={About} />
                    <Route component={NotFound} />
                  </Switch>
                </React.Suspense>
              </main>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}
