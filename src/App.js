import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import Index from './pages';
import Desboard from './pages/desboard';
import Patient from './pages/Patients';
import Profile from './pages/Profile';
import { useNavigate } from 'react-router-dom'
import Screen4TestForm from './pages/FSForm';
import Screen4Details from './pages/clientDetails';
import Analytics from './pages/newdashboard';
import JobRequestForm from './pages/jobRequestForm';
import JobRequests from './pages/jobRequest';
import JobRequestDetails from './pages/jobRequestUpdate';
import AddClientForm from './pages/addClientForm';
import AllClients from './pages/allClients';
import AllCollectors from './pages/AllCollectors'
import AddCollectorForm from './pages/addCollectorForm';
import BarcodeImageScanner from './components/test';

function ScrollToTop() {
  const { pathname } = useLocation();
  const loginemail = Cookies.get("email")
  const loginname = Cookies.get("Name")
  const id = Cookies.get("id")
  const token = Cookies.get("Token")
  const navigate = useNavigate()




  useEffect(() => {
    window.scrollTo(0, 0);

    if (token === "sdrfg&78967daghf#wedhjgasj(dlsh6kjsdg") {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("_id", id);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };
//https://yourgutmap-food-sensitivity-423a2af84621.herokuapp.com
      fetch(`${process.env.REACT_APP_API_URL}/profileinfocheck`, requestOptions)
        .then(response => response.text())
        .then(result => {
          if (result === "deactivated") {
            const allCookies = Cookies.get();
            for (const cookieName in allCookies) {
              // Cookies.remove(cookieName);
            }
            navigate('/')
          }

        })
        .catch(error => console.log('error', error));
    }


  }, [pathname]);

  return null;
}



function App() {

  return (

    <div className="App">

      <BrowserRouter>
        <ScrollToTop />


        <Routes>

          <Route path='/' element={<Index />} />

          <Route path='/data' element={<Patient />} />
          <Route path='/jobrequests' element={<JobRequests />} />


        </Routes>

        <Routes>


          <Route path='/dashboard/profile' element={<Profile />} />
          <Route path='/screen4testform' element={<Screen4TestForm />} />
          <Route path='/screen4testform2' element={<JobRequestForm />} />
          <Route path="/dashboard/:id" element={<Screen4Details />} />
          {/* <Route path="/jobrequest/:id" element={<JobRequestDetails />} /> */}
          <Route path="/jobrequest/:id" element={<JobRequestForm  />} />
          <Route path="/dashboard" element={<Analytics />} />
          <Route path="/clients" element={<AllClients />} />
          <Route path="/collectors" element={<AllCollectors />} />
          <Route path="/addclient" element={<AddClientForm />} />
          <Route path="/addcollector" element={<AddCollectorForm />} />
          <Route path="/addclient/:id" element={<AddClientForm />} />
          <Route path="/addcollector/:id" element={<AddCollectorForm />} />
          <Route path="/test" element={<BarcodeImageScanner />} />




        </Routes>


      </BrowserRouter>

    </div>
  );
}

export default App;
