import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/SignIn';

import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';

import DefaultLayout from './layout/DefaultLayout';
import AddAcademies from './pages/AddAcademies';
import AddUser from './pages/AddUser';


function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="eCommerce Dashboard | Blockverse" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/addacademies"
          element={
            <>
              <PageTitle title="Academies | Blockverse" />
              <AddAcademies />
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
   
    
        {/* <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | Blockverse" />
              <SignIn />
            </>
          }
        /> */}
        {/* <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | Blockverse" />
              <SignUp />
            </>
          }
        /> */}
      </Routes>
    </DefaultLayout>
  );
}

export default App;
