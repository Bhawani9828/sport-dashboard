import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Chart from './pages/Chart';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import DefaultLayout from './layout/DefaultLayout';
import AddAcademies from './pages/AddAcademies';
import AddUser from './pages/AddUser';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { ToastContainer } from 'react-toastify';
import Dashboard from './pages/Dashboard/Dashboard';
import Gallery from './pages/Gallery';
import AddEvent from './pages/AddEvent';
import PrivateRoute from './PrivateRoute';
import AddAcademyDetails from './pages/AddAcademyDetails';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const isLoginPage = pathname === '/';
  const isRegister = pathname === '/register';

  return loading ? (
    <Loader />
  ) : (
    <>
      <ToastContainer />
      {isLoginPage || isRegister ? (
        <Routes>
          <Route
            path="/"
            element={
              <>
                <PageTitle title="Login | Blockverse" />
                <Login />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <PageTitle title="Register | Blockverse" />
                <Register />
              </>
            }
          />
        </Routes>
      ) : (
        <DefaultLayout>
          <Routes>
            <Route
              path="/dashboard"
              element={
                <PrivateRoute role="superadmin">
                  <PageTitle title=" Dashboard | Blockverse" />
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/event"
              element={
                <>
                  <PageTitle title="Event | Blockverse" />
                  <AddEvent />
                </>
              }
            />
            <Route
              path="/gallery"
              element={
                <>
                  <PageTitle title="Gallery | Blockverse" />
                  <Gallery />
                </>
              }
            />
            <Route
              path="/adduser"
              element={
                <>
                  <PageTitle title="Add User | Blockverse" />
                  <AddUser />
                </>
              }
            />
               <Route
              path="/detail"
              element={
                <>
                  <PageTitle title="AddAcademyDetails | Blockverse" />
                  <AddAcademyDetails />
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <PageTitle title="Profile | Blockverse" />
                  <Profile />
                </>
              }
            />
            <Route
              path="/forms/form-elements"
              element={
                <>
                  <PageTitle title="Form Elements | Blockverse" />
                  <FormElements />
                </>
              }
            />
            <Route
              path="/forms/form-layout"
              element={
                <>
                  <PageTitle title="Form Layout | Blockverse" />
                  <FormLayout />
                </>
              }
            />
            <Route
              path="/tables"
              element={
                <>
                  <PageTitle title="Tables | Blockverse" />
                  <Tables />
                </>
              }
            />
            <Route
              path="/settings"
              element={
                <>
                  <PageTitle title="Settings | Blockverse" />
                  <Settings />
                </>
              }
            />
            <Route
              path="/chart"
              element={
                <>
                  <PageTitle title="Basic Chart | Blockverse" />
                  <Chart />
                </>
              }
            />
          </Routes>
        </DefaultLayout>
      )}
    </>
  );
}

export default App;
