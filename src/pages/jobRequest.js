import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Cookies from "js-cookie";
import { message, Pagination, Popconfirm } from "antd";
import { Spin } from 'antd';

const JobRequests = () => {
  const [client, setClient] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState("Pending");
  const [acceptedById,setAcceptedById] = useState()
  const [jobRequesId,setJobRequestId]= useState()
  const [cocId,setCocId] = useState();
  const [isDeleting,setIsDeleting] = useState(false);
  const [deletedId,setDeletedId] = useState(null);
  const navigate = useNavigate();
  const token = Cookies.get("Token")
  const clientId = Cookies.get("id")
  const collectorId = Cookies.get("id")
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailId,setEmailId] = useState(null);

// pagination
const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(0);
const [totalItems, setTotalItems] = useState(0);
const limit = 10; // or whatever you want per page




  useEffect(() => {
    token==="clientdgf45sdgf@89756dfgdhg&%df" && setSelectedTab("Completed")
  }, [token])
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
  const deleteJobRequest = async (collectorId) => {
    setIsDeleting(true);
    setDeletedId(collectorId);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/deletejobrequest/${collectorId}`, {
        method: "DELETE",
      });
  
      const result = await response.json();
  
      if (response.ok) {
        message.success("Job Request deleted successfully");
        fetchScreen4Data();
        // Optionally refresh list or remove from local state
      } else {
        message.error(result.message || "Failed to delete Job Request");
      }
    } catch (error) {
      console.error("Error deleting Job Request:", error);
      message.error("Something went wrong");
    }

    setIsDeleting(false);
  };
  


  const fetchAcceptedById = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/getacceptedbyid`, {
        method: "POST", // ✅ Use POST instead of GET
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }), // ✅ Send ID in the request body
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch acceptedBy ID");
      }
  
      const data = await response.json();
      console.log("Fetched Collector Form ID:", data._id); // ✅ Ensure correct field
      return data._id; // ✅ Return the correct field
    } catch (error) {
      console.error("Error fetching acceptedBy ID:", error);
    }
  };
  

  const fetchScreen4Data = async (pageNumber = 1, currentTab = selectedTab, query = searchQuery) => {
    setLoading(true)
    try {
      const response = await fetch(
      `${process.env.REACT_APP_API_URL}/getjobrequests?status=${currentTab.toLowerCase()}&page=${pageNumber}&limit=${limit}&id=${collectorId}&token=${encodeURIComponent(token.toString())}&search=${encodeURIComponent(query)}`
  );
  
      if (!response.ok) throw new Error("Failed to fetch job requests");
  
      const data = await response.json();
      setClient(data.data || []);
      setFilteredClients(data.data || []);
      setTotalPages(data.totalPages);
      setTotalItems(data.total);
      setPage(data.currentPage);
      if(token === "collectorsdrfg&78967daghf#wedhjgasjdlsh6kjsdg"){
        filterClients()
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token !== "clientdgf45sdgf@89756dfgdhg&%df") {
      fetchScreen4Data(page, selectedTab, searchQuery); 
    }
  }, [page, selectedTab]);
  
  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
  };
  const fetchScreen4Databyclients = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/getjobrequestsbyclients/${clientId}`
      );
      if (!response.ok) {
        if (response.status === 404) {
          setError("No job requests found for this client.");
        }
        else if (response.status === 500) {
        throw new Error("Failed to fetch client data");
      }
    }
      const data = await response.json();
      setClient(data.data || []);
      setFilteredClients(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(token!== "clientdgf45sdgf@89756dfgdhg&%df"){ 
      // fetchScreen4Data();
      fetchScreen4Data(page, selectedTab, searchQuery);
      // filterClients();
    }else{
      fetchScreen4Databyclients();
    }
  }, []);

  useEffect(() => {
    const token = Cookies.get("Token");
    if (
      !token ||
      (token !== "dskgfsdgfkgsdfkjg35464154845674987dsf@53" &&
        token !== "collectorsdrfg&78967daghf#wedhjgasjdlsh6kjsdg")
    ) {
      // navigate("/");
      return;
    }
  }, [navigate]);

  const filterClients = (tab, query) => {
    let filtered = client;
    // if (tab === "Pending") {
    //   filtered = client.filter((c) => !c.isAccepted && !c.isCompleted);
    // } 
    if (tab === "Accepted"){
      filtered = client.filter((c) => {
        if (token === "collectorsdrfg&78967daghf#wedhjgasjdlsh6kjsdg") {
          return String(c?.acceptedBy) === String(collectorId);
        }
        // Admin view: accepted and not completed
        return c?.isAccepted && !c?.isCompleted;
      });
    } 
    else if (tab === "Completed") {
      filtered = client.filter((c) =>{
        if (token === "collectorsdrfg&78967daghf#wedhjgasjdlsh6kjsdg") {
          return c?.isCompleted && String(c?.acceptedBy) === String(collectorId);
        }
        // Admin/client view: accepted and completed
        return c?.isAccepted && c?.isCompleted;
      })        
    }
    
    
    // if (query) {
      filtered = filtered.filter(
        (c) =>
          c.customer?.toLowerCase().includes(query) ||
          c.jobReferenceNo?.toLowerCase().includes(query) ||
          c.location?.toLowerCase().includes(query) ||
          c.dateAndTimeOfCollection?.toLowerCase().includes(query)
      );
    // }
    setFilteredClients(filtered);
  };


  useEffect(() => {
    filterClients(selectedTab, searchQuery);
  }, [client, selectedTab, searchQuery]); // ✅ Dependencies


  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setPage(1); // 👈 reset to first page
    fetchScreen4Data(1, tab, searchQuery); 
  };
  
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setPage(1);
    fetchScreen4Data(1, selectedTab, query); 
  };

  const handleClientClick = async (id) => {
    if(selectedTab==='Pending'){
      navigate(`/jobrequest/${id}`);
    }
    else if (selectedTab === 'Accepted') {
      try {
        const collectorFormId = await fetchAcceptedById(id); 
        if (collectorFormId) {
          navigate(`/dashboard/${collectorFormId}`); 
        } else {
          console.error("Collector Form ID not found");
        }
      } catch (error) {
        console.error("Error navigating:", error);
      }
    }
    else if (selectedTab === 'Completed') {
      // try {
      //   const collectorFormId = await fetchAcceptedById(id); // ✅ Await the API response
      //   if (collectorFormId) {
      //     navigate(`/jobrequest/completed/${collectorFormId}`); // ✅ Use the fetched ID
      //   } else {
      //     console.error("Collector Form ID not found");
      //   }
      // } catch (error) {
      //   console.error("Error navigating:", error);
      // }
    }
  };

  const handleSendEmail = async (client, event) => {
    setSendingEmail(true)
    setEmailId(client._id)
    event.stopPropagation(); // Stop propagation to prevent card click

    if (client.isEmailed) return;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/sendscreenemailtodonor/${client._id}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      setFilteredClients((prevClients) =>
        prevClients.map((c) =>
          c._id === client._id ? { ...c, isEmailed: true } : c
        )
      );
    } catch (err) {
      console.error(err.message);
    }
    setSendingEmail(false)
  };

  return (
    <div>
      <Navbar />
      <div className="deshboardmain" style={{ background: "#80c209" }}>
        <div
          className="Practitionermainbody"
          style={{
            paddingTop: "20px",
            paddingLeft: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingBottom: "100px",
          }}
        >
<div className="jobhead" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", position: "relative" }}>
  {/* Centered Text */}
  <div
    className="key jobreq jobreqhead"
    style={{
      // fontSize: "24px",
      marginBottom: "10px",
      marginTop: "10px",
      textAlign: "center",
      position: token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" ?  "absolute" : null,
      left: "50%",
      transform: token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" ?  "translateX(-50%)":null, // Ensures perfect centering
    }}
  >
    {selectedTab} Job Requests ({totalItems || 0})
  </div>




  {/* Right-Aligned Button */}
 {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" ? <Link to="/screen4testform2" style={{ textDecoration: "none", marginLeft: "auto" }}>
    <div
      className="key createjob createjob2 heading"
      style={{
        fontSize: "14px",
        marginBottom: "10px",
        marginTop: "10px",
        background: "#80c209",
        color: "white",
        padding: "10px 18px",
        borderRadius: "10px",
        fontWeight: "bold",
        textDecoration: "none",
      }}
    >
      Create a Job Request
    </div>
  </Link> : null}
</div>


          {/* Tabs */}
         {token!=="clientdgf45sdgf@89756dfgdhg&%df"&&<> <div style={{ marginBottom: "25px", marginTop: "5px", display: "flex", gap: "10px" }}>
            {["Pending", "Accepted", "Completed"].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "20px",
                  border: selectedTab === tab ? "none" : "1px solid #7fc109",
                  backgroundColor: selectedTab === tab ? "#7fc109" : "#f3ffdf",
                  color: selectedTab === tab ? "#fff" : "#000",
                  cursor: "pointer",
                  width: "100px"
                }}
              >
                {tab}
              </button>
            ))}
          </div>
          </>}
          {/* Search */}
          <div
            style={{
              position: "relative",
              width: "61.5%",
              marginBottom: "20px",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                fontSize: "16px",
                color: "#ccc",
                pointerEvents: "none",
              }}
            >
              🔍
            </span>
            <input
              type="text"
              placeholder="Search by customer, Job reference number, or location..."
              value={searchQuery}
              className="my-search-input"
              onChange={handleSearchChange}
              style={{
                width: "100%",
                padding: "10px",
                paddingLeft: "35px",
                borderRadius: "20px",
                border: "1px solid #ccc",
                fontSize: "16px",
              }}
            />
          </div>

          {/* Client List */}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {
            // loading ? (
            //   <div
            //     style={{
            //       marginTop: "20px",
            //       fontSize: "18px",
            //       color: "#80c20a",
            //     }}
            //   >
            //     Loading  {selectedTab} Job Requests...
            //   </div>
            // )
            loading ? (
              <div style={{ marginTop: "40px", textAlign: "center" }}>
                <Spin
                  indicator={
                    <div className="custom-spinner" />
                  }
                  tip={
                    <span style={{ color: "#80c209", fontSize: "16px", fontWeight: "bold" }}>
                      Loading {selectedTab} Job Requests...
                    </span>
                  }
                />
                <div
                 style={{
                   marginTop: "20px",
                   fontSize: "18px",
                   color: "#80c20a",
                 }}
               >
                 Loading  {selectedTab} Job Requests...
               </div>
              </div>
            )
             : error ? (
              <div
                style={{ marginTop: "20px", fontSize: "18px", color: "red" }}
              >
                {error}
              </div>
            ) : 
            
            filteredClients.length > 0 ? 
            <> 
            
              {filteredClients?.map((client, index) => (
            <> 
             {((selectedTab === 'Pending' && !client.isAccepted && !client.isCompleted) ||
             (selectedTab === 'Accepted' && client.isAccepted && !client.isCompleted)||
             (selectedTab === 'Completed' && client.isAccepted && client.isCompleted))&&  <>
              <div
                  className="pad"
                  key={index}
                  style={{
                    marginBottom: "20px",
            
                    // height: "102px",
                    borderRadius: "13px",
                    background: "#f3ffdf",
                    border: "1px solid #80c20a",
                    cursor: "pointer",
                  }}
                  onClick={() => handleClientClick(client._id)}
                >
                  <div
                  className="jobrequestcontainer"
                 
                  >
                    <div className="conpart1" >
                      <div className="key">
                        Job Reference Number :{" "}
                        <span className="mybold">{client.jobReferenceNo}</span>
                      </div>
                      <div className="key">
                        Customer :{" "}
                        <span className="mybold2">{client.customer}</span>
                      </div>
                      <div className="key">
                        Collector :{" "}
                        <span className="mybold2">{ client.collector.email}</span>
                      </div>
                      {/* <div className="key">Date And Time Of Collection : <span className="mybold">{client.dateAndTimeOfCollection}</span></div> */}
                      <div className="key">
                        Date And Time Of Collection :{" "}
                        <span className="mybold2">
                          {new Date(
                            client.dateAndTimeOfCollection
                          ).toLocaleString("en-US", {
                            timeZone: "UTC",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: true,
                          })}
                        </span>
                        
                      </div>
                  </div>


                  {selectedTab === "Accepted" && (
                      <div class="" 
                      >
                      <button
                        onClick={(e) =>{ navigate(`/jobrequest/${client._id}`,'_blank'); e.stopPropagation()}}
                      
                        className="custom-button createjob2"
                      >
                        Update Timesheet
                      </button>
                      </div>
                    )}
                  {selectedTab === "Pending" && token==="dskgfsdgfkgsdfkjg35464154845674987dsf@53" && (
                    isDeleting && client._id === deletedId ?<h3 style={{color:"#7cc209"}}>Deleting...</h3> : 
                      <div class="" >
             
                      
  <Popconfirm
    title="Are you sure you want to delete this job request?"
    description="This action cannot be undone."
    onConfirm={(e) => {
      deleteJobRequest(client._id);
      e?.stopPropagation(); // optional, just in case
    }}
    onCancel={(e) => {
      e?.stopPropagation(); // stop propagation on cancel
    }}
    okText="Yes"
    cancelText="No"
  >
    <button
       className="custom-button createjob2"
      onClick={(e) => e.stopPropagation()} // prevent parent click
    >
      Delete
    </button>
  </Popconfirm>

                      </div>
                    )}
                 
                    {selectedTab === "Completed" && (
                      <div class="completeddiv">
                       {token==="dskgfsdgfkgsdfkjg35464154845674987dsf@53"&&<> 
                       {sendingEmail && client._id === emailId ? <h3 style={{color:"#7cc209"}}>Sending...</h3> :  <button
                       className="custom-button createjob2"
                        onClick={(event) => handleSendEmail(client, event)}
                        disabled={client.isEmailed}
                        style={{
                          // marginTop: "0px",
                          // padding: "10px 30px",
                          // borderRadius: "20px",
                          border: client.isEmailed ? "1px solid #80c20a" : "none",
                          backgroundColor: client.isEmailed ? "#f3ffdf" : "#80c20a",
                          color: client.isEmailed ? "#80c20a" : "white",
                          cursor: client.isEmailed ? "not-allowed" : "pointer",
                        }}
                       
                      >
                        {client.isEmailed
                          ? "Email Sent"
                          : "Send Email To Donor"}
                      </button> }
                      </>}
                      <button
                        // onClick={() => navigate(`/jobrequest/${client._id}`)}
                        onClick={() => window.open(`/jobrequest/${client._id}`, '_blank')}

                       className="custom-button createjob2"
                      >
                        Job Request
                      </button>
                      <button
                        onClick={async () =>{
                          try {
                            const collectorFormId = await fetchAcceptedById(client._id); // ✅ Await the API response
                            if (collectorFormId) {
                              window.open(`/dashboard/${collectorFormId}`,'_blank'); // ✅ Use the fetched ID
                            } else {
                              console.error("Collector Form ID not found");
                            }
                          } catch (error) {
                            console.error("Error navigating:", error);
                          }}}
                          className="custom-button createjob2"
                      >
                        COC Form
                      </button>
                      </div>
                    )}
                    
                  </div>
                </div>
                </>}
                </>
              ))}
              {/* ✅ Add Pagination Here */}
      <Pagination
        current={page}
        total={totalItems}
        pageSize={limit}
        onChange={handlePageChange}
        showSizeChanger={false}
        style={{ marginTop: "20px" }}
      />
              </> : 
            
            
            (
              <div
                style={{
                  marginTop: "20px",
                  fontSize: "18px",
                  color: "#80c20a",
                  padding: "20px",
                  textAlign: "center",
                }}
              >
                No Job Reqeusts found matching your search.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobRequests;
