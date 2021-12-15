import Sidebar from './components/sidebar';
import DashboardPage from './pages/DashboardPage';
import TopBar from './components/topbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SettingsPage from './pages/SettingsPage';
import ErrorPage from './pages/ErrorPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import MultiChartPage from './pages/MultiChartPage';
import SingleChartPage from './pages/SingleChartPage';
import EMSPage from './pages/EMSPage';
import { createContext, useState } from 'react';
import useLocalStorage from './hooks/use-local-storage';

const AppContext = createContext(null)

function App() {
  const [profile, setProfile] = useLocalStorage("profile", "{}");
  const [parsedProfile, setParsedProfile] = useState(JSON.parse(profile))

  const updateProfile = profile => {
    setProfile(JSON.stringify(profile))
    setParsedProfile(profile)
  }

  return (
    <AppContext.Provider value={{ profile: parsedProfile, profileUpdateHandler: updateProfile }}>
      <Router>
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <TopBar />
              <Switch>
                <Route exact path="/dashboard">
                  <DashboardPage />
                </Route>
                <Route exact path="/profile">
                  <ProfilePage />
                </Route>
                <Route exact path="/settings">
                  <SettingsPage />
                </Route>
                <Route exact path="/single-chart">
                  <SingleChartPage />
                </Route>
                <Route exact path="/chart">
                  <MultiChartPage />
                </Route>
                <Route exact path="/ems">
                  <EMSPage />
                </Route>
                <Route exact path="/">
                  <HomePage />
                </Route>
                <Route exact path="*">
                  <ErrorPage />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export { AppContext }
export default App;
