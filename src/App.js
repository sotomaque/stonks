import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Navbar from 'components/Navbar';
import Sidebar from 'components/Sidebar';
import MobileNavbar from 'components/MobileNavbar';
import Container from 'styles/Container';

import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import RegisterPage from 'pages/Register';
import LoginPage from 'pages/Login';

import { useLocationChange } from 'hooks/use-location-change';
import Trending from 'pages/Trending';
import Snapshot from 'pages/Snapshot';

function App() {
  const [isSidebarOpen, setSidebarOpen] = React.useState(
    false,
  );
  const toggleSidebar = () =>
    setSidebarOpen((prev) => !prev);

  // on location change -> close sidebar
  const handleCloseSidebar = () => setSidebarOpen(false);
  useLocationChange(handleCloseSidebar);

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <MobileNavbar />
      <Container>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={LoginPage} />
          <Route
            path="/register"
            component={RegisterPage}
          />
          <Route
            path="/feed/trending"
            component={Trending}
          />
          <Route
            path="/feed/snapshot"
            component={Snapshot}
          />

          <Route path="*" component={NotFound} />
        </Switch>
      </Container>
    </>
  );
}

export default App;
