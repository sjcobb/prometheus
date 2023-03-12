import { FC } from 'react';
import { createTheme as createMuiTheme, ThemeProvider as MuiThemeProvider, Box, CssBaseline } from '@mui/material';
import Navigation from './Navbar';

import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { PathPrefixContext } from './contexts/PathPrefixContext';
import { ThemeContext, themeName, themeSetting } from './contexts/ThemeContext';
import { useLocalStorage } from './hooks/useLocalStorage';
import useMedia from './hooks/useMedia';
import {
  AgentPage,
  AlertsPage,
  ConfigPage,
  DashboardPage,
  FlagsPage,
  PanelListPage,
  PersesPanelListPage,
  RulesPage,
  ServiceDiscoveryPage,
  StatusPage,
  TargetsPage,
  TSDBStatusPage,
} from './pages';
import { Theme, themeLocalStorageKey } from './Theme';

interface AppProps {
  consolesLink: string | null;
  agentMode: boolean;
}

const App: FC<AppProps> = ({ consolesLink, agentMode }) => {
  // This dynamically/generically determines the pathPrefix by stripping the first known
  // endpoint suffix from the window location path. It works out of the box for both direct
  // hosting and reverse proxy deployments with no additional configurations required.
  let basePath = window.location.pathname;
  const paths = [
    '/agent',
    '/graph',
    '/alerts',
    '/status',
    '/tsdb-status',
    '/flags',
    '/config',
    '/rules',
    '/targets',
    '/service-discovery',
    '/perses-graph',
    '/perses-dashboard',
  ];
  if (basePath.endsWith('/')) {
    basePath = basePath.slice(0, -1);
  }
  if (basePath.length > 1) {
    for (let i = 0; i < paths.length; i++) {
      if (basePath.endsWith(paths[i])) {
        basePath = basePath.slice(0, basePath.length - paths[i].length);
        break;
      }
    }
  }

  const [userTheme, setUserTheme] = useLocalStorage<themeSetting>(themeLocalStorageKey, 'auto');
  const browserHasThemes = useMedia('(prefers-color-scheme)');
  const browserWantsDarkTheme = useMedia('(prefers-color-scheme: dark)');

  let theme: themeName;
  if (userTheme !== 'auto') {
    theme = userTheme;
  } else {
    theme = browserHasThemes ? (browserWantsDarkTheme ? 'dark' : 'light') : 'light';
  }

  const muiTheme = createMuiTheme({
    palette: {
      mode: theme,
    },
  });

  return (
    <ThemeContext.Provider
      value={{ theme: theme, userPreference: userTheme, setTheme: (t: themeSetting) => setUserTheme(t) }}
    >
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Theme />
        <PathPrefixContext.Provider value={basePath}>
          <Router basename={basePath}>
            <Navigation consolesLink={consolesLink} agentMode={agentMode} />
            <Box
              sx={(theme) => ({
                padding: theme.spacing('70px', 2),
                backgroundColor:
                  theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.background.paper,
              })}
            >
              <Switch>
                <Redirect exact from="/" to={agentMode ? '/agent' : '/graph'} />
                {/*
                  NOTE: Any route added here needs to also be added to the list of
                  React-handled router paths ("reactRouterPaths") in /web/web.go.
                */}
                <Route path="/agent">
                  <AgentPage />
                </Route>
                <Route path="/graph">
                  <PanelListPage />
                </Route>
                <Route path="/alerts">
                  <AlertsPage />
                </Route>
                <Route path="/config">
                  <ConfigPage />
                </Route>
                <Route path="/flags">
                  <FlagsPage />
                </Route>
                <Route path="/rules">
                  <RulesPage />
                </Route>
                <Route path="/service-discovery">
                  <ServiceDiscoveryPage />
                </Route>
                <Route path="/status">
                  <StatusPage agentMode={agentMode} />
                </Route>
                <Route path="/tsdb-status">
                  <TSDBStatusPage />
                </Route>
                <Route path="/targets">
                  <TargetsPage />
                </Route>
                <Route path="/perses-graph">
                  <PersesPanelListPage />
                </Route>
                <Route path="/perses-dashboard">
                  <DashboardPage />
                </Route>
              </Switch>
            </Box>
          </Router>
        </PathPrefixContext.Provider>
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default App;
