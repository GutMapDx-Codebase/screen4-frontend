

import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Cookies from "js-cookie";

const Analytics = () => {
  const navigate = useNavigate();
  const [monthlyData, setMonthlyData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [reasonData, setReasonData] = useState([]);
  const [formData, setFormData] = useState({});
const tests = ["Alcohol","Amphetamines","Benzodiazepines","Buprenorphine","Blood","Other","Cocaine","Ketamine","Maritime Std","MDMA","Methadone","Methamphetamine","Morphine","Network Rail Std","Opiates","SSRI","TCA","THC"];
  useEffect(() => {
    const fetchScreen4Data = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/getscreen4data`);
        if (!response.ok) {
          throw new Error("Failed to fetch client data");
        }
        const data = await response.json();
        const clients = data.data || [];

        // Process monthly data
        const monthlyCounts = {};
        clients.forEach((client) => {
          const date = new Date(client.dateoftest);
          const month = date.toLocaleString("default", { month: "long" });
          monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
        });
        const monthlyDataArray = Object.keys(monthlyCounts).map((month) => ({
          month,
          count: monthlyCounts[month],
        }));
        setMonthlyData(monthlyDataArray);

        // Process reasons data
        const reasonCounts = {};
        clients.forEach((client) => {
          const reason = client.reasonForTest || "Unknown";
          reasonCounts[reason] = (reasonCounts[reason] || 0) + 1;
        });
        const reasonDataArray = Object.keys(reasonCounts).map((reason) => ({
          reason,
          count: reasonCounts[reason],
        }));
        setReasonData(reasonDataArray);

        // Extract city names from locations
        const cityCounts = {};
        for (const client of clients) {
          const location = client.location || "Unknown";
          const city = await fetchCityFromLocation(location); // Fetch city name
          cityCounts[city] = (cityCounts[city] || 0) + 1;
        }
        const locationDataArray = Object.keys(cityCounts).map((city) => ({
          location: city,
          count: cityCounts[city],
        }));
        setLocationData(locationDataArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchScreen4Data();
  }, []);
  const [testCounts, setTestCounts] = useState({}); // Store counts for each test's Screen and Confirm

 useEffect(() => {
     const token = Cookies.get("Token");
     if (
       !token ||
       (token !== "dskgfsdgfkgsdfkjg35464154845674987dsf@53" 
        &&
         token !== "collectorsdrfg&78967daghf#wedhjgasjdlsh6kjsdg"
        &&
         token !== "clientdgf45sdgf@89756dfgdhg&%df")
     ) {
       navigate("/");
       return;
     }
   }, [navigate]);

  useEffect(() => {
    const fetchScreen4Data = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/getscreen4data`);
        if (!response.ok) {
          throw new Error("Failed to fetch client data");
        }
        const data = await response.json();
        const clients = data.data || [];

        // Process monthly data
        const monthlyCounts = {};
        clients.forEach((client) => {
          const date = new Date(client.dateoftest);
          const month = date.toLocaleString("default", { month: "long" });
          monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
        });
        const monthlyDataArray = Object.keys(monthlyCounts).map((month) => ({
          month,
          count: monthlyCounts[month],
        }));
        setMonthlyData(monthlyDataArray);

        // Process reasons data
        const reasonCounts = {};
        clients.forEach((client) => {
          const reason = client.reasonForTest || "Unknown";
          reasonCounts[reason] = (reasonCounts[reason] || 0) + 1;
        });
        const reasonDataArray = Object.keys(reasonCounts).map((reason) => ({
          reason,
          count: reasonCounts[reason],
        }));
        setReasonData(reasonDataArray);

        // Count screen and confirm selections for each test
        const testCountsTemp = {};
        tests.forEach((test) => {
          testCountsTemp[test] = { screen: 0, confirm: 0 }; // Initialize counts
        });

        clients.forEach((client) => {
          tests.forEach((test) => {
            if (client[`${test}Screen`]) {
              testCountsTemp[test].screen += 1;
            }
            if (client[`${test}Confirm`]) {
              testCountsTemp[test].confirm += 1;
            }
          });
        });

        setTestCounts(testCountsTemp);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchScreen4Data();
  }, []);

  // Fetch city name using Nominatim API
  const fetchCityFromLocation = async (location) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          location
        )}&format=json&addressdetails=1&limit=1`
      );
      const data = await response.json();
      if (data.length > 0) {
        const city = data[0].address.city || data[0].address.town || data[0].address.village;
        return city || "Unknown";
      }
    } catch (error) {
      console.error("Error fetching city:", error);
    }
    return "Unknown";
  };

  const generatePieChart = () => {
    const labels = locationData.map((item) => item.location);
    const values = locationData.map((item) => item.count);

    return {
      labels,
      datasets: [
        {
          label: "Clients by City",
          data: values,
          backgroundColor: labels.map(() =>
            `#${Math.floor(Math.random() * 16777215).toString(16)}`
          ),
        },
      ],
    };
  };

  return (
    <div style={{ background: "white" }}>
      <div style={{ marginTop: "0px", paddingBottom: "100px" }}>
        <Navbar />
      </div>
      <div className="analytics-main" style={{ paddingBottom: "100px" }}>
        <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", margin: "40px 0" }}>
          <div style={{ width: "45%", marginBottom: "20px" }}>
            <h2>Monthly Clients</h2>
            <Bar
              data={{
                labels: monthlyData.map((item) => item.month),
                datasets: [
                  {
                    label: "Clients per Month",
                    data: monthlyData.map((item) => item.count),
                    backgroundColor: "rgba(127, 194, 10, 0.6)",
                    borderColor: "#f3ffdf",
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </div>
          {/* <div style={{ width: "25%", marginBottom: "20px" }}>
            <h2>Clients by City</h2>
            <Pie data={generatePieChart()} />
          </div> */}
          <table
    style={{
      width: "80%",
      margin: "0 auto",
      borderCollapse: "collapse",
    }}
  >
    <thead>
      <tr>
        <th
          style={{
            border: "1px solid #ddd",
            padding: "8px",
            background: "#80c20a",
            color: "white",
          }}
        >
          Reason
        </th>
        <th
          style={{
            border: "1px solid #ddd",
            padding: "8px",
            background: "#80c20a",
            color: "white",
          }}
        >
          Quantity
        </th>
      </tr>
    </thead>
    <tbody>
      {reasonData.map((item, index) => (
        <tr key={index}>
          <td style={{ border: "1px solid #ddd", padding: "8px" }}>
            {item.reason}
          </td>
          <td style={{ border: "1px solid #ddd", padding: "8px" }}>
            {item.count}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
        {/* Table for Test Counts */}
        <table
          style={{
            width: "80%",
            margin: "0 auto",
            borderCollapse: "collapse",
            marginTop: "50px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  background: "#80c20a",
                  color: "white",
                }}
              >
                Test
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  background: "#80c20a",
                  color: "white",
                }}
              >
                Total Screen
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  background: "#80c20a",
                  color: "white",
                }}
              >
                Total Confirm
              </th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{test}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {testCounts[test]?.screen || 0}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {testCounts[test]?.confirm || 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        </div>
      </div>
    </div>
  );
};

export default Analytics;




// import React, { useState, useEffect } from "react";
// import Navbar from "../components/navbar";
// import { Bar, Pie } from "react-chartjs-2";
// import "chart.js/auto";

// const Analytics = () => {
//   const [monthlyData, setMonthlyData] = useState([]);
//   const [locationData, setLocationData] = useState([]);
//   const [reasonData, setReasonData] = useState([]);
//   const [testCounts, setTestCounts] = useState({}); // Store counts for each test's Screen and Confirm

//   const tests = [
//     "Alcohol",
//     "Amphetamines",
//     "Benzodiazepines",
//     "Buprenorphine",
//     "Blood",
//     "Other",
//     "Cocaine",
//     "Ketamine",
//     "Maritime Std",
//     "MDMA",
//     "Methadone",
//     "Methamphetamine",
//     "Morphine",
//     "Network Rail Std",
//     "Opiates",
//     "SSRI",
//     "TCA",
//     "THC",
//   ];

//   useEffect(() => {
//     const fetchScreen4Data = async () => {
//       try {
//         const response = await fetch(`${process.env.REACT_APP_API_URL}/getscreen4data`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch client data");
//         }
//         const data = await response.json();
//         const clients = data.data || [];

//         // Process monthly data
//         const monthlyCounts = {};
//         clients.forEach((client) => {
//           const date = new Date(client.dateoftest);
//           const month = date.toLocaleString("default", { month: "long" });
//           monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
//         });
//         const monthlyDataArray = Object.keys(monthlyCounts).map((month) => ({
//           month,
//           count: monthlyCounts[month],
//         }));
//         setMonthlyData(monthlyDataArray);

//         // Process reasons data
//         const reasonCounts = {};
//         clients.forEach((client) => {
//           const reason = client.reasonForTest || "Unknown";
//           reasonCounts[reason] = (reasonCounts[reason] || 0) + 1;
//         });
//         const reasonDataArray = Object.keys(reasonCounts).map((reason) => ({
//           reason,
//           count: reasonCounts[reason],
//         }));
//         setReasonData(reasonDataArray);

//         // Count screen and confirm selections for each test
//         const testCountsTemp = {};
//         tests.forEach((test) => {
//           testCountsTemp[test] = { screen: 0, confirm: 0 }; // Initialize counts
//         });

//         clients.forEach((client) => {
//           tests.forEach((test) => {
//             if (client[`${test}Screen`]) {
//               testCountsTemp[test].screen += 1;
//             }
//             if (client[`${test}Confirm`]) {
//               testCountsTemp[test].confirm += 1;
//             }
//           });
//         });

//         setTestCounts(testCountsTemp);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchScreen4Data();
//   }, []);

//   const generatePieChart = () => {
//     const labels = locationData.map((item) => item.location);
//     const values = locationData.map((item) => item.count);

//     return {
//       labels,
//       datasets: [
//         {
//           label: "Clients by City",
//           data: values,
//           backgroundColor: labels.map(() =>
//             `#${Math.floor(Math.random() * 16777215).toString(16)}`
//           ),
//         },
//       ],
//     };
//   };

//   return (
//     <div style={{ background: "white" }}>
//       <div style={{ marginTop: "0px", paddingBottom: "100px" }}>
//         <Navbar />
//       </div>
//       <div className="analytics-main" style={{ paddingBottom: "100px" }}>
//         <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", margin: "40px 0" }}>
//           <div style={{ width: "45%", marginBottom: "20px" }}>
//             <h2>Monthly Clients</h2>
//             <Bar
//               data={{
//                 labels: monthlyData.map((item) => item.month),
//                 datasets: [
//                   {
//                     label: "Clients per Month",
//                     data: monthlyData.map((item) => item.count),
//                     backgroundColor: "rgba(127, 194, 10, 0.6)",
//                     borderColor: "#f3ffdf",
//                     borderWidth: 1,
//                   },
//                 ],
//               }}
//             />
//           </div>
//           <div style={{ width: "25%", marginBottom: "20px" }}>
//             <h2>Clients by City</h2>
//             <Pie data={generatePieChart()} />
//           </div>
//         </div>

//         {/* Table for Test Counts */}
//         <table
//           style={{
//             width: "80%",
//             margin: "0 auto",
//             borderCollapse: "collapse",
//             marginTop: "50px",
//           }}
//         >
//           <thead>
//             <tr>
//               <th
//                 style={{
//                   border: "1px solid #ddd",
//                   padding: "8px",
//                   background: "#80c20a",
//                   color: "white",
//                 }}
//               >
//                 Test
//               </th>
//               <th
//                 style={{
//                   border: "1px solid #ddd",
//                   padding: "8px",
//                   background: "#80c20a",
//                   color: "white",
//                 }}
//               >
//                 Total Screen
//               </th>
//               <th
//                 style={{
//                   border: "1px solid #ddd",
//                   padding: "8px",
//                   background: "#80c20a",
//                   color: "white",
//                 }}
//               >
//                 Total Confirm
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {tests.map((test, index) => (
//               <tr key={index}>
//                 <td style={{ border: "1px solid #ddd", padding: "8px" }}>{test}</td>
//                 <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                   {testCounts[test]?.screen || 0}
//                 </td>
//                 <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                   {testCounts[test]?.confirm || 0}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Analytics;
