import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Cookies from "js-cookie";
import { message } from "antd"; // already imported in your code
import { Button, Popconfirm } from 'antd';
const AllClients = () => {

  const [selectedTab, setSelectedTab] = useState("Pending");
  const navigate = useNavigate();
  const token = Cookies.get("Token")

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    filterClients(selectedTab, query);
  };
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
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const [isDeleting,setIsDeleting] = useState(false);
    const [deletedId,setDeletedId] = useState(null);

  const deleteCollector = async (collectorId) => {
    setIsDeleting(true);
    setDeletedId(collectorId);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/deletecollector/${collectorId}`, {
        method: "DELETE",
      });
  
      const result = await response.json();
  
      if (response.ok) {
        message.success("Collector deleted successfully");
        fetchClients();
        // Optionally refresh list or remove from local state
      } else {
        message.error(result.message || "Failed to delete collector");
      }
    } catch (error) {
      console.error("Error deleting collector:", error);
      message.error("Something went wrong");
    }
    setIsDeleting(false);
  };
  

  const fetchClients = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/getcollectors`);
      if (!response.ok) {
        throw new Error("Failed to fetch client data");
      }
      const data = await response.json();

      if (!Array.isArray(data)) {
        console.error("Unexpected response format:", data);
        setClients([]);
        return;
      }

      setClients(data);
      setFilteredClients(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {

    fetchClients();
  }, []);

  useEffect(() => {
    filterClients(searchQuery);
  }, [searchQuery, clients]);

  const filterClients = (query) => {
    if (!query) {
      setFilteredClients(clients);
      return;
    }

    const filtered = clients.filter((c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.emails.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredClients(filtered);
  };
  // c.contact.includes(query) ||
  // c.hqAddress.toLowerCase().includes(query.toLowerCase()) ||

  const handleClientClick = async (id) => {
    // if(selectedTab==='Pending'){
    navigate(`/addcollector/${id}`);
    // }

  }

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
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", position: "relative" }}>
            {/* Centered Text */}
            <div
              className="key allclient"
              style={{
                fontSize: "24px",
                marginBottom: "10px",
                marginTop: "10px",
                textAlign: "center",
                position: token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" ? "absolute" : null,
                left: "50%",
                transform: token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" ? "translateX(-50%)" : null, // Ensures perfect centering
              }}
            >
              All Collectors  ({clients.length})
            </div>

            {/* Right-Aligned Button */}
            {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" ? <Link to="/addcollector" style={{ textDecoration: "none", marginLeft: "auto" }}>
              <div
                className="key clientbtn createjob2"
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
                Add a Collector
              </div>
            </Link> : null}
          </div>


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
            {loading ? (
              <div
                style={{
                  marginTop: "20px",
                  fontSize: "18px",
                  color: "#80c20a",
                }}
              >
                Loading Collectors...
              </div>
            ) : error ? (
              <div
                style={{ marginTop: "20px", fontSize: "18px", color: "red" }}
              >
                {error}
              </div>
            ) : filteredClients.length > 0 ? (
              filteredClients.map((client, index) => (
                <div
                  key={index}
                  style={{
                    padding: "20px",
                    marginBottom: "20px",
                    width: "60%",
                    // height: "52px",
                    borderRadius: "13px",
                    background: "#f3ffdf",
                    border: "1px solid #80c20a",
                    cursor: "pointer",
                  }}
                  onClick={() => handleClientClick(client._id)}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "flex-start",
                    }}
                  >
                    <div style={{ width: '80%' }}>
                      <div className="key">
                        Collector :{" "}
                        <span className="mybold ellipsis">{client.name}</span>
                      </div>
                      <div className="key">
                        Email :{" "}
                        <span className="mybold ellipsis">{client.email}</span>
                      </div>
                    </div>
                    {/* {isDeleting && client._id === deletedId ?<h3 style={{color:"#7cc209"}}>Deleting...</h3> : <button className="clientbtn createjob2" style={{
                      width: '20%', fontSize: "14px",
                      marginBottom: "10px",
                      marginTop: "10px",
                      border: "none",
                      background: "#80c209",
                      color: "white",
                      padding: "10px 18px",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      textDecoration: "none"
                    }} 
                    onClick={async (e) => {deleteCollector(client._id); e.stopPropagation();}}
                    >
                      Delete
                    </button>}
 */}
{isDeleting && client._id === deletedId ? (
  <h3 style={{ color: "#7cc209" }}>Deleting...</h3>
) : (
  <Popconfirm
    title="Are you sure you want to delete this collector?"
    description="This action cannot be undone."
    onConfirm={(e) => {
      deleteCollector(client._id);
      e?.stopPropagation(); // optional, just in case
    }}
    onCancel={(e) => {
      e?.stopPropagation(); // stop propagation on cancel
    }}
    okText="Yes"
    cancelText="No"
  >
    <button
      className="clientbtn createjob2"
      style={{
        width: '20%',
        fontSize: "14px",
        marginBottom: "10px",
        marginTop: "10px",
        border: "none",
        background: "#80c209",
        color: "white",
        padding: "10px 18px",
        borderRadius: "10px",
        fontWeight: "bold",
        textDecoration: "none",
        cursor: "pointer"
      }}
      onClick={(e) => e.stopPropagation()} // prevent parent click
    >
      Delete
    </button>
  </Popconfirm>
)}


                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  marginTop: "20px",
                  fontSize: "18px",
                  color: "#80c20a",
                }}
              >
                No clients found matching your search.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllClients;
