import React, { useState, useEffect } from 'react'
import Navbar from '../components/navbar';
import Sidemanu from '../components/sidemanu';
import "../css/deshboard.css"
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar, PieChart, Pie, Label, LabelList, Cell } from "recharts"
import { LineChart, Line, CartesianGrid, Legend } from 'recharts';

import Cookies from 'js-cookie';
import { AiFillDelete, AiOutlineClose } from "react-icons/ai"
import { loadStripe } from '@stripe/stripe-js';

import { AutoComplete, message, Button, Divider, InputNumber, notification, Space, Switch } from 'antd';
import { useNavigate } from 'react-router-dom';


function Desboard() {


  const loginname = Cookies.get("Name")
  const id = Cookies.get("id")
  const token = Cookies.get("Token")
  const token2 = Cookies.get("Token2")
  const loginemail = Cookies.get("email")
  const [kit, setkit] = useState([])
  const [practitioner, setpractitioner] = useState([])
  const [practitioner2, setpractitioner2] = useState([])
  const [ackKit, setackKit] = useState([])
  const [notificationn, setnotification] = useState([])

  const totalKits = kit.length;
  const assignedKits = kit.filter(item => item.assignedto && item.assignedto.length > 0).length;
  const notassignedKits = kit.filter(item => !item.assignedto || item.assignedto.length === 0).length;
  const painKits = kit.filter(item => item.Kitprice === "fdgbhjbdgfhjdfgsbf").length;



  const resulKits = kit.filter(item => item.result && item.result.length > 0).length;
  const notresultKits = kit.filter(item => !item.result || item.result.length === 0).length;

  // const notassignedKits = kit.filter((item) => item.assignedto.length === 0).length;
  // const kitsWithResults = kit.filter((item) => item.result.length > 0).length;
  // const kitsWithoutResults = kit.filter((item) => item.result.length === 0).length;




  var rangeDataadmin2 = []



  const [enabled, setEnabled] = React.useState(true);
  const [threshold, setThreshold] = React.useState(3);
  const [api, contextHolder] = notification.useNotification({
    stack: enabled
      ? {
        threshold,
      }
      : false,
  });
  const openNotification = async () => {

    try {

      if (token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53") {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        const response = await fetch(`${process.env.REACT_APP_API_URL}/getallnotification`, requestOptions);


        const result = await response.json();



        result.forEach(value => {
          if (!value.status) {
            const key = `${value._id}`;
            const btn = (
              <Space>

                <Button type="primary" size="small" onClick={() => {
                  api.destroy(key)
                  var myHeaders = new Headers();
                  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

                  var urlencoded = new URLSearchParams();
                  urlencoded.append("_id", value._id);


                  var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: urlencoded,
                    redirect: 'follow'
                  };

                  fetch(`${process.env.REACT_APP_API_URL}/editnotification`, requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(""))



                }}>
                  Mark as Read
                </Button>
              </Space>
            );
            api.open({
              message: value.title,
              description: value.contant,
              btn,
              key,
              duration: null,

            });
          }

        });
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      // Handle error (e.g., show error notification)
    }
  };



  useEffect(() => {
    openNotification()


  }, [])





  function kitpracbarchart() {

    practitioner
      .map((item) => {
        return { name: item.name, Value: item.assignedkits.length };
      })
      .sort((a, b) => b.Value - a.Value) // Sort in descending order based on 'Value'
      .slice(0, 10) // Take the top 10 practitioners
      .forEach((practitioner) => {
        rangeDataadmin2.push(practitioner);
      });




  }



  function countPrac() {

  };


  useEffect(() => {



    if (token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" || token2 === "afdksjfjsdgfjgsdugcsduygfcsdvcfgsdcfgtysdftd") {

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");



      var requestOptions = {
        method: 'GET',
        headers: myHeaders,

        redirect: 'follow'
      };
      fetch(`${process.env.REACT_APP_API_URL}/getallnotification`, requestOptions)
        .then(response => response.json())
        .then(result => setnotification(result))


      fetch(`${process.env.REACT_APP_API_URL}/getallpractitioner`, requestOptions)
        .then(response => response.json())
        .then(result => {
          setpractitioner(result)
          setpractitioner2(result)
        })






      var myHeaders2 = new Headers();
      myHeaders2.append("Content-Type", "application/x-www-form-urlencoded");



      var requestOptions2 = {
        method: 'GET',
        headers: myHeaders2,

        redirect: 'follow'
      };

      fetch(`${process.env.REACT_APP_API_URL}/getallkits`, requestOptions2)
        .then(response => response.json())
        .then(result => setkit(result))


      // fetch(`${process.env.REACT_APP_API_URL}/getallemaidata`, requestOptions2)
      //   .then(response => response.json())
      //   .then(result => setackKit(result))

      kitpracbarchart()
      countPrac();

    } else if (token === "sdrfg&78967daghf#wedhjgasj(dlsh6kjsdg") {

      var urlencoded2 = new URLSearchParams();
      urlencoded2.append("id", id);

      var requestOptions2 = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded2,
        redirect: 'follow'
      };


      fetch(`${process.env.REACT_APP_API_URL}/profileKitsinfo`, requestOptions2)
        .then(response => response.json())
        .then(result => setkit(result))
        .catch(error => console.log('error', error));




    }






  }, [token2])












  var fs = 0
  const [mb, setmb] = useState(0)
  var dm = 0
  var pt = 0
  const countkits = () => {

    kit.map((value) => {
      if (value.Kittype === "210" || value.Kittype === "100") {
        fs = fs + 1
      }

      if (value.Kittype === "mb") {
        mb = mb + 1
      }

      if (value.Kittype === "dm") {
        dm = dm + 1
      }
      if (value.Kittype === "pt") {
        pt = pt + 1
      }



    })


  }



  const [rangeDataadminn, setrangeDataadminn] = useState([
    { name: 'jan', Value: 0 },
    { name: 'feb', Value: 0 },
    { name: 'mar', Value: 0 },
    { name: 'apr', Value: 0 },
    { name: 'may', Value: 0 },
    { name: 'jun', Value: 0 },
    { name: 'jul', Value: 0 },
    { name: 'aug', Value: 0 },
    { name: 'sep', Value: 0 },
    { name: 'oct', Value: 0 },
    { name: 'nov', Value: 0 },
    { name: 'dec', Value: 0 }
  ]);

  const [data, setData] = useState([]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1;

    const createMonthlyCounts = () => ({
      jan: 0, feb: 0, mar: 0, apr: 0, may: 0,
      jun: 0, jul: 0, aug: 0, sep: 0, oct: 0, nov: 0, dec: 0
    });

    const counts2023 = createMonthlyCounts();
    const counts2024 = createMonthlyCounts();

    practitioner.forEach((value) => {
      const timestamp = value.timestamp;
      const [year, month] = timestamp.slice(0, 7).split('-');

      if (year === previousYear.toString()) {
        switch (month) {
          case "01": counts2023.jan += 1; break;
          case "02": counts2023.feb += 1; break;
          case "03": counts2023.mar += 1; break;
          case "04": counts2023.apr += 1; break;
          case "05": counts2023.may += 1; break;
          case "06": counts2023.jun += 1; break;
          case "07": counts2023.jul += 1; break;
          case "08": counts2023.aug += 1; break;
          case "09": counts2023.sep += 1; break;
          case "10": counts2023.oct += 1; break;
          case "11": counts2023.nov += 1; break;
          case "12": counts2023.dec += 1; break;
          default: break;
        }
      } else if (year === currentYear.toString()) {
        switch (month) {
          case "01": counts2024.jan += 1; break;
          case "02": counts2024.feb += 1; break;
          case "03": counts2024.mar += 1; break;
          case "04": counts2024.apr += 1; break;
          case "05": counts2024.may += 1; break;
          case "06": counts2024.jun += 1; break;
          case "07": counts2024.jul += 1; break;
          case "08": counts2024.aug += 1; break;
          case "09": counts2024.sep += 1; break;
          case "10": counts2024.oct += 1; break;
          case "11": counts2024.nov += 1; break;
          case "12": counts2024.dec += 1; break;
          default: break;
        }
      }
    });

    setData([
      { month: 'JAN', signUp2023: counts2023.jan, signUp2024: counts2024.jan },
      { month: 'FEB', signUp2023: counts2023.feb, signUp2024: counts2024.feb },
      { month: 'MAR', signUp2023: counts2023.mar, signUp2024: counts2024.mar },
      { month: 'APR', signUp2023: counts2023.apr, signUp2024: counts2024.apr },
      { month: 'MAY', signUp2023: counts2023.may, signUp2024: counts2024.may },
      { month: 'JUN', signUp2023: counts2023.jun, signUp2024: counts2024.jun },
      { month: 'JUL', signUp2023: counts2023.jul, signUp2024: counts2024.jul },
      { month: 'AUG', signUp2023: counts2023.aug, signUp2024: counts2024.aug },
      { month: 'SEPT', signUp2023: counts2023.sep, signUp2024: counts2024.sep },
      { month: 'OCT', signUp2023: counts2023.oct, signUp2024: counts2024.oct },
      { month: 'NOV', signUp2023: counts2023.nov, signUp2024: counts2024.nov },
      { month: 'DEC', signUp2023: counts2023.dec, signUp2024: counts2024.dec },
    ]);
  }, [practitioner]);



  const currentYear = new Date().getFullYear();










  const [searchTerm, setSearchTerm] = useState('');
  var options = [];

  const dooption = () => {
    practitioner2.map((value, index) => {

      // options = [
      //   { value: 'Burns Bay Road' },

      // ];
      // const newvalue = toString(value.kitid)

      if (kit.assignedKits && kit.assignedkits.length === 0) {

        options.push({ value: value.name })
        options.push({ value: value.email })

      }
    })


  }
  var sno1 = 1
  var sno2 = 1
  var sno3 = 1




  const handleInputChange = (e) => {
    e.preventDefault()






    const intttt = (searchTerm)

    // Filter the Kit array based on the user's input
    const filteredSuggestions = practitioner.filter((item) =>

      item.name.toLowerCase().includes(intttt.toLowerCase()) || item.email.toLowerCase().includes(intttt.toLowerCase())



    );


    setpractitioner2(filteredSuggestions)
    setsearchdone(true)

  };




  const [searchdone, setsearchdone] = useState(false)

  const clearsearch = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const hide = message.loading("Action in progress", 0)

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,

      redirect: 'follow'
    };

    fetch(`${process.env.REACT_APP_API_URL}/getallpractitioner`, requestOptions)
      .then(response => response.json())
      .then(result => setpractitioner2(result))


    var myHeaders2 = new Headers();
    myHeaders2.append("Content-Type", "application/x-www-form-urlencoded");



    var requestOptions2 = {
      method: 'GET',
      headers: myHeaders2,

      redirect: 'follow'
    };

    fetch(`${process.env.REACT_APP_API_URL}/getallkits`, requestOptions2)
      .then(response => response.json())
      .then(result => setkit(result))


    setsearchdone(false)
    setTimeout(() => {
      hide(); // Call hide to stop the loading message
      message.success("Action completed successfully");
    }, 2000);
  }


  const colors = ['#6F4FA0', '#4381B8']; // Define an array of colors

  const navigate = useNavigate()




  const circleresultdata = () => {
    // console.log("Saad")
    // console.log(kit)
    // const pending = kit.reduce((count, value) => {
    //   if (
    //     (value.Kittype === "210" && value.result.length === 0) ||
    //     (value.Kittype === "100" && value.result2.length === 0) ||
    //     (["pt", "dm"].includes(value.Kittype) && value.otherresults === "nil")
    //   ) {
    //     return count + 1;
    //   }
    //   return count;
    // }, 0);
    const result = kit.filter(item => item.result && item.result.length > 0).length;
    const notresultKits = kit.filter(item => !item.result || item.result.length === 0).length;
    const percentage = Math.round((result / kit.length) * 100);
    // return 100 - percentage;
    // console.log(percentage)
    
    return percentage
  };
  const analysisCompletedValue = () => {
    // console.log("Saad")
    // console.log(kit)
    // const pending = kit.reduce((count, value) => {
    //   if (
    //     (value.Kittype === "210" && value.result.length === 0) ||
    //     (value.Kittype === "100" && value.result2.length === 0) ||
    //     (["pt", "dm"].includes(value.Kittype) && value.otherresults === "nil")
    //   ) {
    //     return count + 1;
    //   }
    //   return count;
    // }, 0);
    const result = kit.filter(item => item.result && item.result.length > 0).length;
    // const notresultKits = kit.filter(item => !item.result || item.result.length === 0).length;
    // const percentage = Math.round((result / kit.length) * 100);
    // return 100 - percentage;
    // console.log(percentage)
    
    return result
  };


  let circleSize = 350;
  let strokeWidth = 75;

  if (token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53") {
    circleSize = 350;
    strokeWidth = 75;
  }

  const completed = circleresultdata();
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const completedOffset = circumference - (completed / 100) * circumference;

  // Calculate angles for completed and pending labels
  const completedAngle = (360 * completed - 1500) / 100;
  const pendingAngle = completedAngle + 30;

  // Convert angles to radians
  const completedX = circleSize / 2 + radius * Math.cos((completedAngle - 90) * (Math.PI / 180));
  const completedY = circleSize / 2 + radius * Math.sin((completedAngle - 90) * (Math.PI / 180)) + 5;

  const pendingX = circleSize / 2 + radius * Math.cos((pendingAngle - 90) * (Math.PI / 180));
  const pendingY = circleSize / 2 + radius * Math.sin((pendingAngle - 90) * (Math.PI / 180)) + 5;






  const getkitsvalue = (condition) => {
    let width = 0;
    let value = 0; // Start with 0 if counting unassigned kits
    let percentage = 4; // Default minimum value for percentage

    if (condition === "TOTAL KITS") {
      value = kit.length;
      width = (value / kit.length) * 100;

      // Scale width to be between 4 and 94
      percentage = ((width / 100) * (94 - 4)) + 4;

    } else if (condition === "NOT ASSIGNED YET") {
      // Count kits that are not assigned
      kit.forEach((item) => {
        if (!item.assignedto || item.assignedto.length === 0) {
          value += 1;
        }
      });

      width = (value / kit.length) * 100;

      // Scale width to be between 4 and 94
      percentage = ((width / 100) * (94 - 4)) + 4;
    } else if (condition === "ASSIGNED KITS") {
      // Count kits that are not assigned
      kit.forEach((item) => {
        if (item.assignedto) {
          value += 1;
        }
      });

      width = (value / kit.length) * 100;

      // Scale width to be between 4 and 94
      percentage = ((width / 100) * (94 - 4)) + 4;
    } 
    // else if (condition === "PAID KITS") {
    //   // Count kits that are not assigned
    //   kit.forEach((item) => {
    //     if (item.Kitprice === "fdgbhjbdgfhjdfgsbf") {
    //       value += 1;
    //     }
    //   });

    //   width = (value / kit.length) * 100;

    //   // Scale width to be between 4 and 94
    //   percentage = ((width / 100) * (94 - 4)) + 4;
    // } else if (condition === "UNPAID KITS") {
    //   // Count kits that are not assigned
    //   kit.forEach((item) => {
    //     if (item.Kitprice !== "fdgbhjbdgfhjdfgsbf") {
    //       value += 1;
    //     }
    //   });

    //   width = (value / kit.length) * 100;

    //   // Scale width to be between 4 and 94
    //   percentage = ((width / 100) * (94 - 4)) + 4;
    // } 
    else if (condition === "ANALYSIS PENDING") {
      // Count kits that are not assigned
      // value = kit.reduce((count, item) => {
      //   if (
      //     (item.Kittype === "210" && item.result.length === 0) ||
      //     (item.Kittype === "100" && item.result2.length === 0) ||
      //     (["pt", "dm"].includes(item.Kittype) && item.otherresults === "nil")
      //   ) {
      //     return count + 1;
      //   }
      //   return count;
      // }, 0);

      // // const percentage = Math.round((pending / kit.length) * 100);
      // // alert(value)
      const value = kit.length - kit.filter(item => item.result && item.result.length > 0).length;
      width = (value / kit.length) * 100;

      // Scale width to be between 4 and 94
      percentage = ((width / 100) * (94 - 4)) + 4;
    } else if (condition === "ANALYSIS COMPLETED") {
      // Count kits that are not assigned
      // value = kit.reduce((count, item) => {
      //   if (
      //     (item.Kittype === "210" && item.result.length === 0) ||
      //     (item.Kittype === "100" && item.result2.length === 0) ||
      //     (["pt", "dm"].includes(item.Kittype) && item.otherresults === "nil")
      //   ) {
      //     return count + 1;
      //   }
      //   return count;
      // }, 0);

      // // const percentage = Math.round((pending / kit.length) * 100);
      // // alert(value)
      // value = kit.length - value
      const value = kit.filter(item => item.result && item.result.length > 0).length;

      width = (value / kit.length) * 100;

      // Scale width to be between 4 and 94
      percentage = ((width / 100) * (94 - 4)) + 4;
    }



    return [percentage, value];
  };



  // const data = [
  //   { month: 'JAN', signUp2023: 0, signUp2024: 105 },
  //   { month: 'FEB', signUp2023: 35, signUp2024: 105 },
  //   { month: 'MAR', signUp2023: 70, signUp2024: 95 },
  //   { month: 'APR', signUp2023: 105, signUp2024: 80 },
  //   { month: 'MAY', signUp2023: 140, signUp2024: 50 },
  //   { month: 'JUN', signUp2023: 105, signUp2024: 60 },
  //   { month: 'JUL', signUp2023: 70, signUp2024: 90 },
  //   { month: 'AUG', signUp2023: 35, signUp2024: 100 },
  //   { month: 'SEPT', signUp2023: 0, signUp2024: 95 },
  //   { month: 'OCT', signUp2023: 35, signUp2024: 80 },
  //   { month: 'NOV', signUp2023: 70, signUp2024: 60 },
  //   { month: 'DEC', signUp2023: 105, signUp2024: 70 },
  // ];

  const PractitionerSignUpChart = () => {
    return (
      // <ResponsiveContainer style={{ backgroundColor: '#F1EBFF', padding: "10px 2%", borderRadius: '10px' }} width="94%" height={400}>
      <ResponsiveContainer style={{ backgroundColor: '#4d4b4b1f', padding: "10px 2%", borderRadius: '10px' }} width="94%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="signUp2023" stroke="#8fbfcf" strokeDasharray="5 5" dot={{ fill: '#8fbfcf', r: 5 }} name={"Practitioners Sign Up in " + (currentYear - 1)} />
          <Line type="monotone" dataKey="signUp2024" stroke="#19afe6" dot={{ fill: '#19afe6', r: 5 }} name={"Practitioners Sign Up in " + currentYear} />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (<>
    {contextHolder}
    {(token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" || token === "sdrfg&78967daghf#wedhjgasj(dlsh6kjsdg") && <>

      <Navbar />

      <div className='deshboardmain'>
        <Sidemanu />

        <div className='mainbody' >

          <div style={{ width: '100%', height: "fit-content" }}>

            {countkits()}
            <div className='kitscouts'>
              <div className='boxxxx' onClick={() => navigate("/dashboard/fs/kit")}><h5 className='bbbbg'>FOOD SENSITIVITY KITS</h5> <h2>{getkitsvalue("TOTAL KITS")[1]}</h2></div>
              {/* {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>      <div className='boxxxx' onClick={() => navigate("/dashboard/micro/kit")}><h5 className='bbbbg'>MICROBIOME KITS </h5><h2> {mb}</h2></div></>}
              <div className='boxxxx' onClick={() => navigate("/dashboard/dna/kit")}><h5 className='bbbbg'  >DNAMAP KITS </h5><h2> {dm}</h2></div>
              <div className='boxxxx' onClick={() => navigate("/dashboard/Parasitology/kit")}><h5 className='bbbbg'>PARASITOLOGY KITS </h5><h2> {pt}</h2></div> */}
            </div>


            <div className='kitsbarssandcircle'>

              <div className='kitsbarrr'>
                <div className='barmain'>
                  <div className='barfill'><div className='barfill2' style={{ width: `${getkitsvalue("TOTAL KITS")[0]}%` }}><h3>{getkitsvalue("TOTAL KITS")[1]}</h3></div></div>
                  <div className='barname'><h3>TOTAL KITS</h3></div>
                </div>
                {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>
                  <div className='barmain'>
                    <div className='barfill'><div className='barfill2' style={{ width: `${getkitsvalue("ASSIGNED KITS")[0]}%` }}><h3>{getkitsvalue("ASSIGNED KITS")[1]}</h3></div></div>
                    <div className='barname'><h3> ASSIGNED KITS</h3></div>
                  </div>

                  <div className='barmain'>
                    <div className='barfill'><div className='barfill2' style={{ width: `${getkitsvalue("NOT ASSIGNED YET")[0]}%` }}><h3>{getkitsvalue("NOT ASSIGNED YET")[1]}</h3></div></div>
                    <div className='barname'><h3> NOT ASSIGNED YET</h3></div>
                  </div>
                </>}

                {/* {token === "sdrfg&78967daghf#wedhjgasj(dlsh6kjsdg" && <> */}
                <div className='barmain'>
                  {/* <div className='barfill'><div className='barfill2' style={{ width: `${getkitsvalue("ANALYSIS COMPLETED")[0]}%` }}><h3>{getkitsvalue("ANALYSIS COMPLETED")[1]}</h3></div></div> */}
                  <div className='barfill'><div className='barfill2' style={{ width: `${getkitsvalue("ANALYSIS COMPLETED")[0]}%` }}><h3>{analysisCompletedValue()}</h3></div></div>
                  <div className='barname'><h3> ANALYSIS COMPLETED</h3></div>
                </div>

                <div className='barmain'>
                  {/* <div className='barfill'><div className='barfill2' style={{ width: `${getkitsvalue("ANALYSIS PENDING")[0]}%` }}><h3>{getkitsvalue("ANALYSIS PENDING")[1]}</h3></div></div> */}
                  <div className='barfill'><div className='barfill2' style={{ width: `${getkitsvalue("ANALYSIS PENDING")[0]}%` }}><h3>{kit.length-analysisCompletedValue()}</h3></div></div>
                  <div className='barname'><h3> ANALYSIS PENDING</h3></div>
                </div>
                {/* </>} */}
                {/* <div className='barmain'>
                  <div className='barfill'><div className='barfill2' style={{ width: `${getkitsvalue("PAID KITS")[0]}%` }}><h3>{getkitsvalue("PAID KITS")[1]}</h3></div></div>
                  <div className='barname'><h3> PAID KITS</h3></div>
                </div>

                <div className='barmain'>
                  <div className='barfill'><div className='barfill2' style={{ width: `${getkitsvalue("UNPAID KITS")[0]}%` }}><h3>{getkitsvalue("UNPAID KITS")[1]}</h3></div></div>
                  <div className='barname'><h3> UNPAID KITS</h3></div>
                </div> */}
              </div>


              <div className='kitsresutldcircle'>

                <div style={{ position: 'relative', width: circleSize, height: circleSize }}>
                  <svg width={circleSize} height={circleSize}>
                    {/* Pending Segment */}
                    <circle
                      cx={circleSize / 2}
                      cy={circleSize / 2}
                      r={radius}
                      stroke="#4d4b4b1f" // Light purple for pending
                      strokeWidth={strokeWidth}
                      fill="none"
                      strokeDasharray={circumference}
                      strokeDashoffset={0}
                    />
                    {/* Completed Segment */}
                    <circle
                      cx={circleSize / 2}
                      cy={circleSize / 2}
                      r={radius}
                      stroke="#19afe6" // Dark purple for completed
                      strokeWidth={strokeWidth}
                      fill="none"
                      strokeDasharray={circumference}
                      strokeDashoffset={completedOffset}
                      transform={`rotate(-90 ${circleSize / 2} ${circleSize / 2})`}
                    />

                    {/* Completed Percentage Label */}
                    <text
                      x={completedX}
                      y={completedY}
                      textAnchor="middle"
                      fontSize="18px"
                      fontWeight="bold"
                      fill="#ffffff"
                    >
                      {completed}%
                    </text>

                    {/* Pending Percentage Label */}
                    <text
                      x={pendingX}
                      y={pendingY}
                      textAnchor="middle"
                      fontSize="18px"
                      fontWeight="bold"
                      fill="#19afe6"
                    >
                      {100 - completed}%
                    </text>
                  </svg>

                  {/* Center Text for Analysis Labels */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      textAlign: 'center',
                      fontSize: '12px',
                      color: '#6E4E9F',
                    }}
                  >
                    <div style={{
                      fontWeight: 'bold',
                      backgroundColor: '#19afe6',
                      color: '#fff',
                      padding: '4px 5px',
                      borderRadius: '8px',
                      marginBottom: '4px'
                    }}>
                      ANALYSIS COMPLETED
                    </div>
                    <div style={{
                      fontWeight: 'bold',
                      backgroundColor: '#4d4b4b1f',
                      color: '#19afe6',
                      padding: '4px 8px',
                      borderRadius: '8px'
                    }}>
                      ANALYSIS PENDING
                    </div>
                  </div>
                </div>
              </div>


            </div>

            {/* {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>  <ResponsiveContainer >
              <BarChart width={500} height={250} data={rangeDataadmin} margin={{ top: 20, right: 20, bottom: 20, left: 20 }} >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Value" fill="#4180B7" radius={10} />
              </BarChart>
            </ResponsiveContainer>

            </>} */}



          </div>


          {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>
            <div className='piechars'>





              <div className='div1'  >



                <div className='header' style={{ marginBottom: '10px' }}>
                  <h2 className='pppheading'> Practitioners who have never purchased a test
                  </h2>
                  {dooption()}

                  {searchdone === false && <>
                    <form onSubmit={handleInputChange}>
                      <AutoComplete
                        type="number"
                        style={{ width: 200 }}
                        options={options}
                        placeholder="Search by Email/Name"
                        filterOption={(inputValue, options) =>
                          options.value.toString().toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                          //  console.log(kitss) 
                        }
                        onChange={(inputValue) => setSearchTerm(inputValue)}
                      />
                      <button>Search</button>
                    </form>

                  </>}
                  {searchdone === true && <>     <div className='clearsearch'  ><h3>search: {searchTerm}</h3> <button onClick={clearsearch}><AiOutlineClose /> Clear</button>  </div>
                  </>}
                </div>
                <div className='imp'>
                  <table className='tablep' cellPadding={"10"} cellSpacing={"0"}>
                    <thead className='tablephead'>
                      <tr>
                        <th>S NO.</th>
                        <th>NAME</th>
                        <th>EMAIL</th>



                      </tr>
                    </thead>
                    <tbody>

                      {practitioner2.map((kit, index) => (<>
                        {(!kit.assignedKits && kit.assignedkits.length === 0 && (!kit.mbkits || kit.mbkits === "0")) && <>
                          <tr>
                            <td>{sno1++}</td>
                            <td>{kit.name} </td>
                            <td>{kit.email} </td>

                          </tr></>}
                      </>))}



                    </tbody>
                  </table>


                </div>




              </div>



            </div>





            <div style={{ width: '100%', height: "400px", marginTop: '100px' }}>


              {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>
                <PractitionerSignUpChart />

              </>}



            </div>

          </>}






          {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>
            <div>

              <div className='header' style={{ marginTop: "100px" }}><h3>List of Practitioners Who Have Not Bought a Kit in the Last 6 Months</h3></div>
              <div className='imp'>
                <table className='tablep' cellPadding={"10"} cellSpacing={"0"}>
                  <thead className='tablephead'>
                    <tr>
                      <th>S NO.</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Assigned Kits</th>
                      {/* <th>Payment Method</th>
                      <th></th> */}



                    </tr>
                  </thead>
                  <tbody>

                    {practitioner.map((item, index) => {

                      var show = false
                      if (!item.assignedKits && item.assignedkits.length > 0) {





                        kit.map((value2, index) => {

                          item.assignedkits.map((value3) => {

                            if (value3 === value2._id) {


                              const today = new Date();
                              const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 6);

                              // Get the year and month
                              const year = sixMonthsAgo.getFullYear();
                              const month = String(sixMonthsAgo.getMonth() + 1).padStart(2, '0'); // Adding 1 to month as it's zero-indexed

                              // Format the date in "yyyy-mm" format
                              const formattedDate = `${year}-${month}`;

                              const date = formattedDate.split('-');
                              const timestamp = value2.timestamp

                              // // Extract year and month from timestamp
                              const timestampYearMonth = timestamp.slice(0, 7).split('-');


                              const formattedDateString = formattedDate.replace('-', '');
                              const timestampYearMonthString = timestamp.slice(0, 7).replace('-', '');

                              if (formattedDateString < timestampYearMonthString) {
                                show = true;
                              }
                            }
                          })


                        })

                      } else {
                        show = true
                      }


                      return (<>


                        {show === false && <>
                          <tr>
                            <td>{sno2++}</td>
                            <td>{item.name} </td>
                            <td>{item.email}</td>
                            <td>{item.assignedkits.length}</td>


                            {/* {item.CardID === "nocardneeded" && <>
                          <td>Consignment</td>
                        </>}


                        {item.CardID === "nocardneeded" && <>
                          <td><a href='/' onClick={(e) => {

                            e.preventDefault()


                            var myHeaders = new Headers();
                            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

                            var urlencoded = new URLSearchParams();
                            urlencoded.append("_id", item._id);

                            var requestOptions = {
                              method: 'POST',
                              headers: myHeaders,
                              body: urlencoded,
                              redirect: 'follow'
                            };

                            fetch(`${process.env.REACT_APP_API_URL}/asktoaddcard", requestOptions)
                              .then(response => response.json())
                              .then(result => setpractitioner(result))
                              .catch(error => console.log('error', error));





                          }} >Ask to Add Card</a></td>
                        </>}

                        {(item.CardID && item.CardID.length !== 0 && item.CardID !== "nocardneeded") && <>
                          <td>Card Added</td>
                        </>}

                        {!item.CardID && <>
                          <td>Card not Added yet</td>
                        </>} */}





                          </tr>
                        </>}

                      </>)
                    })}







                  </tbody>
                </table>



              </div>
            </div>


          </>}








          {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>
            <div style={{ width: '100%', height: 'fit-content', marginTop: '50px' }} >
              {kitpracbarchart("54")}
              <h2 style={{ color: '#4180B7' }}>Top Practitioners By Kits </h2><h2 style={{ color: '#19afe6' }}>All Time</h2>
              {/* <ResponsiveContainer >
                <BarChart width={730} height={250} data={rangeDataadmin2} margin={{ top: 20, right: 20, bottom: 20, left: 20 }} >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="Value" fill="#4180B7" radius={10} />
                </BarChart>
              </ResponsiveContainer> */}



              <div className='kitsbarrr' style={{ width: '100%' }}>

                {rangeDataadmin2.map((value) => {

                  const bigestnumber = 251
                  let width
                  let percentage

                  width = (value.Value / bigestnumber) * 100;

                  // Scale width to be between 4 and 94
                  percentage = ((width / 100) * (94 - 4)) + 4;


                  return (<>
                    <div className='barmain'>
                      <div className='barfill'><div className='barfill2' style={{ width: `${percentage}%` }}><h3>{value.Value}</h3></div></div>
                      <div className='barname'><h3>{value.name}</h3></div>
                    </div>
                  </>)
                })}
              </div>

            </div>
          </>}




          {/* {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>
            <div className='header' style={{ marginTop: "100px" }}><h3>Sample received in Lab</h3></div>

            <div className="imp">
              <table className='tablep' cellPadding={"10"} cellSpacing={"0"} >
                <thead className='tablephead'>
                  <tr>
                    <th>S NO.</th>
                    <th>Date/Time</th>
                    <th>Patient Name</th>
                    <th>Kit ID</th>
                    <th>Acknowledgment</th>


                    <th></th>
                  </tr>
                </thead>
                <tbody>

                  {ackKit.map((item, index) => {
                    var kitinfo = []
                    var match = false
                    kit.map((value) => {

                      if (item.KitId === value.kitid) {
                        kitinfo = value
                        match = true
                      }
                    })




                    return (<>







                      <tr>
                        <td>{sno3++}</td>
                        <td>{item.timestamp}</td>
                        <td>{item.Name} </td>
                        <td>{item.KitId}</td>





                        {match ? (<>


                          {kitinfo.ack ? (<><td>Already Acknowleded</td></>) : (<>
                            <td> <button className='button' onClick={async () => {
                              const hide = message.loading("Action in progress", 0)
                              var myHeaders = new Headers();
                              myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

                              var urlencoded = new URLSearchParams();
                              urlencoded.append("kitID", item.KitId);
                              urlencoded.append("patientName", item.Name);
                              urlencoded.append("_id", item._id);

                              var requestOptions = {
                                method: 'POST',
                                headers: myHeaders,
                                body: urlencoded,
                                redirect: 'follow'
                              };

                              const resp = await fetch(`${process.env.REACT_APP_API_URL}/ackemail`, requestOptions)
                                .then(response => response.json())

                                .catch(error => console.log('error', error));


                              window.location.reload();
                              await setackKit(resp)


                              setTimeout(() => {
                                hide(); // Call hide to stop the loading message
                                message.success("Action completed successfully");
                              }, 2000);

                            }} > Sample Receipt Email </button></td>


                          </>)}


                        </>) : (<><td style={{ color: 'red' }}>Kit is not in our Database</td></>)}





                        <td className='assignbuttom' ><AiFillDelete className='hovar' style={{ width: '30px', height: '30px', color: 'red' }}
                          onClick={() => {
                            const hide = message.loading("Action in progress", 0)
                            var myHeaders = new Headers();
                            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

                            var urlencoded = new URLSearchParams();
                            urlencoded.append("_id", item._id);

                            var requestOptions = {
                              method: 'POST',
                              headers: myHeaders,
                              body: urlencoded,
                              redirect: 'follow'
                            };

                            fetch(`${process.env.REACT_APP_API_URL}/deleteemaidata`, requestOptions)
                              .then(response => response.json())
                              .then(result => setackKit(result))
                              .catch(error => console.log('error', error));




                            setTimeout(() => {
                              hide(); // Call hide to stop the loading message
                              message.success("Action completed successfully");
                            }, 2000);
                          }}


                        /></td>
                      </tr>

                    </>)
                  })}







                </tbody>
              </table>
            </div>
          </>}
 */}

<div style={{width:"100%",height:"100px"}}></div>




        </div>


      </div>
    </>} </>)
}

export default Desboard