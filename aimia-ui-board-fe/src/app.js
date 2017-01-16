import React, { Component } from 'react';
import aimiaDarkTheme from 'material-ui/styles/baseThemes/aimiaDarkTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import Header from './features/header/header';
import Content from './features/content/content';
import Footer from './features/footer/footer';

class App extends Component {
    render() {
        return (
          <MuiThemeProvider muiTheme={getMuiTheme(aimiaDarkTheme)}>
              <div className="grid-container">
                  <div className="grid">
                      <Header />
                      <Content />
                      <Footer />
                  </div>
              </div>
          </MuiThemeProvider>
        );
    }
}

export default App;
