import "../css/profile.css";
import React, { useState } from "react";
import Navbar from "../components/navbar";
import { message } from "antd";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";

function Screen4ChainOfCustodyForm() {
  const navigate = useNavigate()
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isError, setIsError] = useState(false);
  // const [formData, setFormData] = useState({ donorSignature: "" });
  const [isSignaturePadOpen, setIsSignaturePadOpen] = useState(false);
  const [donorOpen, setIsDonorOpen] = useState(false);
  const [donorConcentOpen, setIsDonorConcentOpen] = useState(false);
  const [collectorOpen, setIsCollectorOpen] = useState(false);
  const [collectorCertificationOpen, setIsCollectorCerificationOpen] = useState(false);
  
  // const [comments, setComments] = useState({
    
  // }); // Track comments

  // const handleAddComment = (field) => {
  //   const comment = prompt("Enter your comment:");
  //   if (comment) {
  //     setFormData((prev) => ({ ...prev, [field]: comment })); // Save the comment for the field
  //   }
  //   console.log(formData)
  // };
  const handleAddComment = (field) => {
    const comment = prompt("Enter your comment:");
    if (comment) {
      setFormData((prev) => {
        const updatedFormData = { ...prev, [field]: comment };
        return updatedFormData;
      });
    }
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
  const pad = (data) =>{
    return   <div
    style={{
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 1000,
      backgroundColor: "white",
      border: "1px solid #ccc",
      padding: "20px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    }}
  >
    <canvas
      ref={canvasRef}
      style={{
        width: "400px",
        height: "200px",
        border: "1px solid #ccc",
        cursor: "crosshair",
      }}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={finishDrawing}
      onMouseLeave={finishDrawing}
    />
    <div style={{ marginTop: "10px" }}>
      <button
        type="button"
        onClick={clearCanvas}
        style={{
          marginRight: "10px",
          padding: "5px 10px",
          backgroundColor: "#f44336",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Clear
      </button>
      <button
        type="button"
        onClick={closeSignaturePadWithoutSave}
        style={{
          marginRight: "10px",
          padding: "5px 10px",
          backgroundColor: "#f44336",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Close
      </button>
      <button
        type="button"
        onClick={()=>{closeSignaturePad(data)}}
        style={{
          padding: "5px 10px",
          backgroundColor: "#4caf50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Save & Close
      </button>
    </div>
  </div>
  }

  const specificFields = [
    "DrugsandAlcoholUrineTest",
    "DrugsandAlcoholOralTest",
    "BreathAlcoholOnlyTest",
    "DrugsOnlyTest",
  ];
  const openSignaturePad = () => {
    setIsSignaturePadOpen(true);
    setTimeout(initializeCanvas, 0); // Initialize canvas after it renders
  };

  const closeSignaturePad = (mydata) => {
    setIsSignaturePadOpen(false);

    // Save canvas content as a data URL
    const canvas = canvasRef.current;
    const signatureData = canvas.toDataURL();
    console.log(mydata)
    setFormData((prevData) => ({ ...prevData, [mydata]: signatureData }));
    setIsDonorOpen(false)
    setIsCollectorOpen(false)
    setIsDonorConcentOpen(false)
    setIsCollectorCerificationOpen(false)
  };
  const closeSignaturePadWithoutSave = () => {
    setIsSignaturePadOpen(false);

    // Save canvas content as a data URL
    const canvas = canvasRef.current;
    // const signatureData = canvas.toDataURL();
    // setFormData((prevData) => ({ ...prevData, donorSignature: signatureData }));
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    context.clearRect(0, 0, canvas.width, canvas.height); // Clears the entire canvas
  };

  const initializeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    canvas.style.width = `${canvas.offsetWidth}px`;
    canvas.style.height = `${canvas.offsetHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 2;
    contextRef.current = context;

    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };


  const [formData, setFormData] = useState({
    donorName: "",
    donorEmail: "",
    gcalicno:"",
    dob: "",
    companyName: "",
    reasonForTest: "", // Default reason
    location: "",
    flight: "",
    idsource: "",
    gender: "",
    barcodeno: "",
    refno: "",
    dateoftest: "",
    alcohoDeclaration: "",
    donorSignature: "",
    donorDate: "",
    test1: "",
    test1BaracResult1: "",
    test1BaracResult2: "",
    test2: "",
    test2BaracResult1: "",
    test2BaracResult2: "",
    collectorName: "",
    collectorRemarks: "",
    collectorSignature: "",
    collectorDate: "",
    donorConcent: "",
    donorDeclaration: "",
    donorConcentDate: "",
    medicationDate1: "",
    medicationDate2: "",
    medicationDate3: "",
    medicationDate4: "",
    medicationType1: "",
    medicationType2: "",
    medicationType3: "",
    medicationType4: "",
    medicationDosage1: "",
    medicationDosage2: "",
    medicationDosage3: "",
    medicationDosage4: "",
    collectionTime: "",
    resultReadTime: "",
    temperature: "",
    lotno: "",
    expDate: "",
    adulterationTestPassed: "",
    adulterationRemarks: "",
    
    AlcoholScreen: "",
    AlcoholConfirm: "",
    AmphetaminesScreen: "",
    AmphetaminesConfirm: "",
    BenzodiazepinesScreen: "",
    BenzodiazepinesConfirm: "",
    BuprenorphineScreen: "",
    BuprenorphineConfirm: "",
    BloodScreen: "",
    BloodConfirm: "",
    OtherScreen: "",
    OtherConfirm: "",
    CocaineScreen: "",
    CocaineConfirm: "",
    KetamineScreen: "",
    KetamineConfirm: "",
    MaritimeScreen: "",
    MaritimeConfirm: "",
    MDMAScreen: "",
    MDMAConfirm: "",
    MethadoneScreen: "",
    MethadoneConfirm: "",
    MethamphetamineScreen: "",
    MethamphetamineConfirm: "",
    MorphineScreen: "",
    MorphineConfirm: "",
    NetworkScreen: "",
    NetworkConfirm: "",
    OpiatesScreen: "",
    OpiatesConfirm: "",
    SSRIScreen: "",
    SSRIConfirm: "",
    TCAScreen: "",
    TCAConfirm: "",
    THCScreen: "",
    THCConfirm: "",

    donorCertificationName:"",
    donorCertificationSignature:"", 
    donorCertificationDate:"",
    collectorCertificationName:"",
    collectorCertificationSignature:"", 
    collectorCertificationDate:"",
    recieveInitial:"",
    recieveName:"",
    recieveDate:"",
    specimenBottle:"",
    fatalFlaws:"",
    specimenBottleComment: "",
    fatalFlawsComment: "",
    DrugsandAlcoholUrineTest:false,
    DrugsandAlcoholOralTest:false,
    BreathAlcoholOnlyTest:false,
    DrugsOnlyTest:false,
  });


 
  // const handleChange = async (e) => {
  //   const { name, value, type, checked } = e.target;
  //   console.log(formData.DrugsandAlcoholUrineTest)
  //   // console.log(checked )
  //   await setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: type === "checkbox" ? checked : value.toString(),
  //   }));

  // };
//   const handleChange = async (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prevData) => ({
//         ...prevData,
//         [name]: type === "checkbox" ? checked : value.toString(),
//     }));

//     console.log(formData)
// };

const handleChange = async (e) => {
  const { name, value, type, checked } = e.target;
  setFormData((prevData) => {
      const updatedData = {
          ...prevData,
          [name]: type === "checkbox" ? checked : value.toString(),
      };
      console.log(updatedData); // Logs the updated state immediately
      return updatedData;
  });
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // console.log("Form Data Submitted: ", formData);
    if (!formData.reasonForTest) {
      setIsError("reasonForTest");
      message.warning("Please select a reason for the test");
    } 
    else if (!formData.gender) {
      setIsError("gender");
      message.warning("Please select gender");
    } 
    else if (!formData.alcohoDeclaration) {
      setIsError("alcohoDeclaration");
      message.warning("Please answer RESIDUAL MOUTH ALCOHOL DECLARATION");
    } 
    else if (!formData.donorSignature) {
      setIsError("donorSignature");
      message.warning("Please fill donor signature");
    } 
    else if (!formData.collectorSignature) {
      setIsError("collectorSignature");
      message.warning("Please fill collector signature");
    } 
    else if (!formData.collectorCertificationSignature) {
      setIsError("collectorCertificationSignature");
      message.warning("Please fill collector certification signature");
    } 
    
    
    else {
      try {
        const response = await fetch(
          // `${process.env.REACT_APP_API_URL}/addscreen4data`,
          `${process.env.REACT_APP_API_URL}/addscreen4data`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
  
        const result = await response.json();
  
        if (response.ok) {
          message.success("Form submitted successfully!");
        } else {
          message.error(result.message || "Failed to submit form.");
        }
  
        // Reset form
        setFormData({
          donorName: "",
          donorEmail: "",
          gcalicno:"",
          dob: "",
          companyName: "",
          reasonForTest: "", // Default reason
          location: "",
          flight: "",
          idsource: "",
          gender: "",
          barcodeno: "",
          refno: "",
          dateoftest: "",
          alcohoDeclaration: "",
          donorSignature: "",
          donorDate: "",
          test1: "",
          test1BaracResult1: "",
          test1BaracResult2: "",
          test2: "",
          test2BaracResult1: "",
          test2BaracResult2: "",
          collectorName: "",
          collectorRemarks: "",
          collectorSignature: "",
          collectorDate: "",
          donorConcent: "",
          donorDeclaration: "",
          donorConcentDate: "",
          medicationDate1: "",
          medicationDate2: "",
          medicationDate3: "",
          medicationDate4: "",
          medicationType1: "",
          medicationType2: "",
          medicationType3: "",
          medicationType4: "",
          medicationDosage1: "",
          medicationDosage2: "",
          medicationDosage3: "",
          medicationDosage4: "",
          collectionTime: "",
          resultReadTime: "",
          temperature: "",
          lotno: "",
          expDate: "",
          adulterationTestPassed: "",
          adulterationRemarks: "",
          
          AlcoholScreen: "",
          AlcoholConfirm: "",
          AmphetaminesScreen: "",
          AmphetaminesConfirm: "",
          BenzodiazepinesScreen: "",
          BenzodiazepinesConfirm: "",
          BuprenorphineScreen: "",
          BuprenorphineConfirm: "",
          BloodScreen: "",
          BloodConfirm: "",
          OtherScreen: "",
          OtherConfirm: "",
          CocaineScreen: "",
          CocaineConfirm: "",
          KetamineScreen: "",
          KetamineConfirm: "",
          MaritimeScreen: "",
          MaritimeConfirm: "",
          MDMAScreen: "",
          MDMAConfirm: "",
          MethadoneScreen: "",
          MethadoneConfirm: "",
          MethamphetamineScreen: "",
          MethamphetamineConfirm: "",
          MorphineScreen: "",
          MorphineConfirm: "",
          NetworkScreen: "",
          NetworkConfirm: "",
          OpiatesScreen: "",
          OpiatesConfirm: "",
          SSRIScreen: "",
          SSRIConfirm: "",
          TCAScreen: "",
          TCAConfirm: "",
          THCScreen: "",
          THCConfirm: "",
      
          donorCertificationName:"",
          donorCertificationSignature:"", 
          donorCertificationDate:"",
          collectorCertificationName:"",
          collectorCertificationSignature:"", 
          collectorCertificationDate:"",
          recieveInitial:"",
          recieveName:"",
          recieveDate:"",
          specimenBottle:"",
          fatalFlaws:"",
          specimenBottleComment: "",
          fatalFlawsComment: "",
          DrugsandAlcoholUrineTest:"",
          DrugsandAlcoholOralTest:"",
          BreathAlcoholOnlyTest:"",
          DrugsOnlyTest:"",
        });
        navigate("/jobrequests")
      } catch (error) {
        console.error("Error: ", error);
        message.error("Submission failed due to server error.");
      }
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <div
        style={{
          // display: "flex",
          // justifyContent: "center",
          padding: "20px",
          display:"grid",
          placeItems:"center",
          // alignItems: "center",
          // height: "100vh",
          height: "100%",
          background:"#80c209"
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            // marginTop: "1110px",
            background: "#ffffff",
            padding: "60px",
            paddingTop: "15px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            width: "900px",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#80c209",
              padding: "10px",
            }}
          >
            CHAIN of CUSTODY FORM FOR SPECIMEN ANALYSIS
          </h2>
          <hr />
          <div className="donor">
            {/* Donor's Name */}
            <label>Donor's Name<span style={{color: "red"}}>*</span>
            </label>
            <input
              className="inputstyle"
              type="text"
              name="donorName"
              value={formData.donorName}
              onChange={handleChange}
              placeholder="Enter Donor's Name"
              required
            />
          </div>
          <hr />
          <div className="donor">
            {/* Donor's Name */}
            <label>Donor's Email<span style={{color: "red"}}>*</span>
            </label>
            <input
              className="inputstyle"
              type="email"
              name="donorEmail"
              value={formData.donorEmail}
              onChange={handleChange}
              placeholder="Enter Donor's Email"
              required
            />
          </div>
          <hr></hr>
          <div
            className="2nd-row"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="donor">
              {/* GCAA LIC No */}
              <label style={{ width: "180px" }}>
                GCAA LIC No{" "}
                <span style={{ fontSize: "10px" }}>(if applicable)</span>:
              </label>
              <input
                className="inputstyle"
                type="number"
                name="gcalicno"
                value={formData.gcalicno}
                placeholder="Enter GCAA LIC No"
                onChange={handleChange}
                style={{ width: "39%" }}
              />
            </div>
            <div className="donor">
              {/* Date of Birth */}
              <label>Date of Birth<span style={{ color: "red" }}>*</span></label>
              <input
                className="inputstyle"
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                style={{ width: "99%" }}
                required
              />
            </div>
          </div>
          <hr></hr>
          <div
            className="main-container"
            style={{ display: "flex", columnGap: "0px" }}
          >
            <div className="inner1" style={{}}>
              <div className="donor">
                {/* Company Name */}
                <label style={{ width: "137px" }}>Company Name<span style={{ color: "red" }}>*</span></label>
                <input
                  className="inputstyle"
                  style={{ marginLeft: "15px", width: "190px" }}
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Enter Company Name"
                  required
                />
              </div>

              <div className="donor">
                {/* Location */}

                <label>Location<span style={{ color: "red" }}>*</span></label>
                <input
                  className="inputstyle"
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter Location"
                  required
                />
              </div>
              <div className="donor">
                {/* Flight/Vessel */}
                <label>Flight/Vessel<span style={{ color: "red" }}>*</span></label>
                <input
                  className="inputstyle"
                  type="text"
                  name="flight"
                  value={formData.flight}
                  onChange={handleChange}
                  placeholder="Enter Flight / Vessel"
                  required
                />
              </div>
              {/* <span style={{ fontSize: "6px" }}>Check donor identity and record ID source here, e.g. passport (with number) OR supervisor’s signature and PRINTED name.</span> */}
              <div className="donor">
                {/* ID Source */}
                <label>ID Source<span style={{ color: "red" }}>*</span></label>
                <input
                  className="inputstyle"
                  type="text"
                  name="idsource"
                  value={formData.idsource}
                  onChange={handleChange}
                  placeholder="Enter ID Source"
                  required
                />
              </div>
              {/* <label style={{ marginLeft: "0px" }}>
                <input
                  type="checkbox"
                  name="gender"
                  value="M"
                  checked={formData.gender}
                  onChange={handleChange}
                />
                M
              </label>
              <label style={{ marginLeft: "10px" }}>
                <input
                  type="checkbox"
                  name="gender"
                  value="F"
                  checked={!formData.gender}
                  onChange={handleChange}
                />
                F
              </label> */}
              <label style={{ marginLeft: "0px" }}>
    <input
      type="radio"
      name="gender"
      value="M"
      checked={formData.gender === "M"}
      onChange={handleChange}
    />
    M
  </label>
  <label style={{ marginLeft: "10px" }}>
    <input
      type="radio"
      name="gender"
      value="F"
      checked={formData.gender === "F"}
      onChange={handleChange}
    />
    F
  </label>
  {isError && isError==='gender' && (
          <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
            Please select gender
          </p>
        )}
            </div>
            <div className="inner2" style={{ marginLeft: "45px" }}>
              {/* Reason for Test */}
              <label style={{ marginBottom: "20px", display: "block" }}>
                Reason for Test
                <span style={{ color: "red" }}>*</span>
              </label>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: "9px",
                }}
              >
                <label style={{ margin: "0" }}>
    <input
      type="radio"
      name="reasonForTest"
      value="Pre-Employment"
      checked={formData.reasonForTest === "Pre-Employment"}
      onChange={handleChange}
    />
    Pre-Employment
  </label>
  <label>
    <input
      type="radio"
      name="reasonForTest"
      value="Random"
      checked={formData.reasonForTest === "Random"}
      onChange={handleChange}
    />
    Random
  </label>
  <label>
    <input
      type="radio"
      name="reasonForTest"
      value="For Cause"
      checked={formData.reasonForTest === "For Cause"}
      onChange={handleChange}
    />
    For Cause
  </label>
  <label>
    <input
      type="radio"
      name="reasonForTest"
      value="Follow-up"
      checked={formData.reasonForTest === "Follow-up"}
      onChange={handleChange}
    />
    Follow-up
  </label>
  {isError && isError==='reasonForTest' && (
          <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
            Please select a reason for the test.
          </p>
        )}
              </div>
            </div>
            <div className="inner3">
              <div className="donor">
                {/* BAR CODE NUMBER */}
                <label>BAR CODE NUMBER<span style={{ color: "red" }}>*</span></label>
                <input
                  style={{ width: "35%", marginLeft: "0px" }}
                  className="inputstyle"
                  type="number"
                  name="barcodeno"
                  value={formData.barcodeno}
                  onChange={handleChange}
                  required
                />
              </div>
              <hr></hr>
              <div className="donor">
                {/* REF NO/JOB NO:*/}
                <label>REF NO/JOB NO<span style={{ color: "red" }}>*</span></label>
                <input
                  className="inputstyle"
                  style={{ width: "35%", marginLeft: "0px" }}
                  type="number"
                  name="refno"
                  value={formData.refno}
                  onChange={handleChange}
                  required
                />
              </div>
              <hr></hr>
              <div className="donor">
                {/* DATE OF TEST: */}
                <label style={{ width: "180px" }}>DATE OF TEST<span style={{ color: "red" }}>*</span></label>
                <input
                  className="inputstyle"
                  style={{ width: "36%", marginLeft: "0px" }}
                  type="date"
                  name="dateoftest"
                  value={formData.dateoftest}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <hr />
          <div class="third-row" style={{ marginBottom: "10px" }}>
            <p style={{ fontSize: "12px" }}>
              {" "}
              <span style={{ fontWeight: "bold", fontSize: "15px" }}>
                DONOR CONSENT TO TEST AND SPECIFIC DECLARATION
              </span>{" "}
              I hereby consent to providing a sample of breath, saliva, urine
              hair or blood to the collector and if required for it to be
              screened in my presence, if necessary, and if required by my
              employer / potential future employer, for the analysis to be
              performed at an off site laboratory. I also consent to the results
              of the analysis being communicated in writing to my employer /
              potential future employer and for them to use this information for
              any purpose connected to my employment / application for
              employment{" "}
              <span style={{ fontWeight: "bold", fontSize: "13px" }}>
                I declare that I have read and understood the Donor Information
                Sheet relating to the test.
              </span>
            </p>
            <div class="" style={{ display: "flex" }}>
              <div className="donor">
                {/* GCAA LIC No */}
                <label
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    width: "120px",
                  }}
                >
                  Donor Consent<span style={{ color: "red" }}>*</span>{" "}
                </label>
                <input
                  className="inputstyle"
                  type="text"
                  name="donorConcent"
                  value={formData.donorConcent}
                  placeholder=""
                  onChange={handleChange}
                  style={{ margin: "0px", width: "150px" }}
                  
                />
              </div>
              <div
                class="box"
                style={{
                  border: "1px solid black",
                  marginLeft: "15px",
                  padding: "3px",
                  width: "90%",
                }}
              >
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: "bold",
                    margin: "0px",
                    paddingLeft: "10px",
                  }}
                >
                  I am satisfied that the test has been completed in line with
                  stated process.
                </p>
                <div
                  className="2nd-row"
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <div className="donor">
                    {/* GCAA LIC No */}
                    <label
                      style={{
                        width: "130px",
                        fontSize: "11px",
                        fontWeight: "bold",
                      }}
                    >
                      Donor Declaration<span style={{ color: "red" }}>*</span>{" "}
                    </label>
                    <input
                      className="inputstyle"
                      type="text"
                      name="donorDeclaration"
                      value={formData.donorDeclaration}
                      placeholder=""
                      onChange={handleChange}
                      style={{ width: "152px", margin: "0px", height: "5px" }}
                      
                    />
                  </div>
                  <div className="donor">
                    <label
                      style={{
                        width: "25px",
                        fontSize: "12px",
                        fontWeight: "bold",
                        marginLeft: "10px",
                        marginRight: "10px",
                      }}
                    >
                      Date<span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      className="inputstyle"
                      type="date"
                      name="donorDate"
                      value={formData.donorDate}
                      onChange={handleChange}
                      style={{ width: "69%", height: "5px" }}
                      
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr style={{marginTop:"20px",marginBottom:"20px"}}/>
          <div
            class="second-container"
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <div
              class="second-container-part1"
              style={{
                width: "35.5%",
                border: "1px solid black",
                padding: "10px",
              }}
            >
              <h5>RESIDUAL MOUTH ALCOHOL DECLARATION</h5>
              <p style={{ fontSize: "10.5px" }}>
                Have you in the last 20 minutes smoked and/or consumed an
                alcoholic drink or used a product containing alcohol such as
                mouthwash
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <label
                  style={{
                    marginRight: "10px",
                    width: "100px",
                    fontSize: "14px",
                  }}
                >
                  Yes
                  <input
                    type="radio"
                    name="alcohoDeclaration"
                    value="Yes"
                    checked={formData.alcohoDeclaration==='Yes'}
                    onChange={handleChange}
                  />
                </label>
                <label
                  style={{
                    marginRight: "10px",
                    width: "100px",
                    fontSize: "14px",
                  }}
                >
                  No
                  <input
                    type="radio"
                    name="alcohoDeclaration"
                    value="No"
                    checked={formData.alcohoDeclaration==='No'}
                    onChange={handleChange}
                  />
                </label>
                {isError && isError==='alcohoDeclaration' && (
          <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
            Please answer RESIDUAL MOUTH ALCOHOL DECLARATION
          </p>
        )}
                <span
                  style={{
                    marginLeft: "auto",
                    width: "100px",
                    fontSize: "14px",
                  }}
                >
                  Please tick
                </span>
              </div>

              <p style={{ fontSize: "10.5px" }}>
                I understand that any of the above may artificially increase the
                result of the breath test that I am about to take.
              </p>
              {/* <div className="2nd-row" style={{ display: "flex",justifyContent:"space-between" }}> */}
              <div className="donor">
                {/* <label style={{ fontSize: "11px", fontWeight: "bold" }}>
                  Donor's Signature{" "}
                </label>
                <input
                  className="inputstyle"
                  type="text"
                  name="donorSignature"
                  value={formData.donorSignature}
                  placeholder=""
                  onChange={handleChange}
                  style={{ margin: "0px" }}
                  required
                /> */}
                <label style={{ fontSize: "11px", fontWeight: "bold" }}>
          Donor's Signature<span style={{ color: "red" }}>*</span>
        </label>
        <input
          className="inputstyle"
          type="text"
          name="donorSignature"
          value=""
          placeholder=""
          onClick={()=>{openSignaturePad(); setIsDonorOpen(true)}}
          style={{
             width: "156px",
            margin: "0px",
            cursor: "pointer",
            backgroundImage: `url(${formData.donorSignature})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: "30px", // Adjust height to fit the signature image
          }}
          readOnly
        />
        {isError && isError==='donorSignature' && (
          <p style={{ color: "red", padding:"5px",fontSize: "12px", marginTop: "5px" }}>
            Please fill donor signature
          </p>
        )}
        

              </div>
              {isSignaturePadOpen && donorOpen && (
      pad("donorSignature")
      )}
              <div className="donor">
                {/* Date of Birth */}
                <label
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    marginLeft: "10px",
                    marginRight: "10px",
                    margin: "0px",
                  }}
                >
                  Date<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="inputstyle"
                  type="date"
                  name="donorConcentDate"
                  value={formData.donorConcentDate}
                  onChange={handleChange}
                  // style={{ width: "39%" }}
                  required
                />
              </div>
              {/* </div> */}
            </div>
            <div
              class="second-container-part2"
              style={{
                width: "58.8%",
                border: "1px solid black",
                padding: "10px",
              }}
            >
              <h5>
                I certify that I have conducted Breath Alcohol testing on the
                above named individual, the results of which are recorded below:
              </h5>

              <div
                className="2nd-row"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "12px",
                    width: "110px",
                    marginTop: "18px",
                  }}
                >
                  Local Time<span style={{ color: "red" }}>*</span>
                </p>
                <div className="donor">
                  <label
                    style={{ width: "45px", fontSize: "12px", margin: "0px" }}
                  >
                    Test 1.
                  </label>
                  <input
                    className="inputstyle"
                    type="text"
                    name="test1"
                    value={formData.test1}
                    placeholder=""
                    onChange={handleChange}
                    style={{ width: "85px", margin: "0px" }}
                    required
                  />
                </div>
                <div className="donor">
                  {/* Date of Birth */}
                  <label
                    style={{
                      width: "25px",
                      fontSize: "12px",
                      marginLeft: "10px",
                      marginRight: "-10px",
                    }}
                  >
                    BrAC Result
                  </label>
                  <input
                    className="inputstyle"
                    type="text"
                    name="test1BaracResult1"
                    value={formData.test1BaracResult1}
                    onChange={handleChange}
                    style={{ width: "69%" }}
                    required
                  />
                </div>
                <div className="donor">
                  {/* Date of Birth */}
                  <label
                    style={{
                      width: "25px",
                      fontSize: "12px",
                      marginLeft: "10px",
                      marginRight: "-10px",
                    }}
                  >
                    BrAC Result
                  </label>
                  <input
                    className="inputstyle"
                    type="text"
                    name="test1BaracResult2"
                    value={formData.test1BaracResult2}
                    onChange={handleChange}
                    style={{ width: "69%" }}
                    required
                  />
                </div>
                <p style={{ paddingLeft: "10px" }}>%</p>
              </div>
              <div
                className="2nd-row"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "12px",
                    width: "110px",
                    marginTop: "18px",
                  }}
                >
                  Local Time<span style={{ color: "red" }}>*</span>
                </p>
                <div className="donor">
                  <label
                    style={{ width: "45px", fontSize: "12px", margin: "0px" }}
                  >
                    Test 2.
                  </label>
                  <input
                    className="inputstyle"
                    type="text"
                    name="test2"
                    value={formData.test2}
                    placeholder=""
                    onChange={handleChange}
                    style={{ width: "85px", margin: "0px" }}
                    required
                  />
                </div>
                <div className="donor">
                  {/* Date of Birth */}
                  <label
                    style={{
                      width: "25px",
                      fontSize: "12px",
                      marginLeft: "10px",
                      marginRight: "-10px",
                    }}
                  >
                    BrAC Result
                  </label>
                  <input
                    className="inputstyle"
                    type="text"
                    name="test2BaracResult1"
                    value={formData.test2BaracResult1}
                    onChange={handleChange}
                    style={{ width: "69%" }}
                    required
                  />
                </div>
                <div className="donor">
                  {/* Date of Birth */}
                  <label
                    style={{
                      width: "25px",
                      fontSize: "12px",
                      marginLeft: "10px",
                      marginRight: "-10px",
                    }}
                  >
                    BrAC Result
                  </label>
                  <input
                    className="inputstyle"
                    type="text"
                    name="test2BaracResult2"
                    value={formData.test2BaracResult2}
                    onChange={handleChange}
                    style={{ width: "69%" }}
                    required
                  />
                </div>
                <p style={{ paddingLeft: "10px" }}>%</p>
              </div>
              <div
                className="2nd-row"
                style={{ display: "flex", justifyContent: "space-evenly" }}
              >
                <div className="donor">
                  {/* GCAA LIC No */}
                  <label
                    style={{
                      width: "130px",
                      fontSize: "11px",
                      fontWeight: "bold",
                    }}
                  >
                    Collector Name<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    className="inputstyle"
                    type="text"
                    name="collectorName"
                    value={formData.collectorName}
                    placeholder=""
                    onChange={handleChange}
                    style={{ width: "142px", margin: "0px" }}
                    required
                  />
                </div>
                <div className="donor">
                  {/* Date of Birth */}
                  <label
                    style={{
                      width: "25px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      marginLeft: "31px",
                      marginRight: "10px",
                    }}
                  >
                    Remarks<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    className="inputstyle"
                    type="text"
                    name="collectorRemarks"
                    value={formData.collectorRemarks}
                    onChange={handleChange}
                    style={{ width: "69%" }}
                    required
                  />
                </div>
              </div>
              <div
                className="2nd-row"
                style={{ display: "flex", justifyContent: "space-around" }}
              >
                <div className="donor">
                  {/* GCAA LIC No */}
                  <label
                    style={{
                      width: "130px",
                      fontSize: "11px",
                      fontWeight: "bold",
                    }}
                  >
                    Collector Signature<span style={{ color: "red" }}>*</span>
                  </label>
                  
                  <input
                    className="inputstyle"
                    type="text"
                    onClick={()=>{openSignaturePad(); setIsCollectorOpen(true)}}
                    name="collectorSignature"
                    value=""
                    placeholder=""
                    onChange={handleChange}
                    style={{ width: "152px", margin: "0px",cursor: "pointer",
                      backgroundImage: `url(${formData.collectorSignature})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",height:"30px"}}
        
                  />
                </div>
               
                {isSignaturePadOpen && collectorOpen&&(
      pad("collectorSignature")
      )}
                <div className="donor">
                  {/* Date of Birth */}
                  <label
                    style={{
                      width: "25px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      marginLeft: "10px",
                      marginRight: "10px",
                    }}
                  >
                    Date<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    className="inputstyle"
                    type="date"
                    name="collectorDate"
                    value={formData.collectorDate}
                    onChange={handleChange}
                    style={{ width: "69%" }}
                    required
                  />
                </div>
                
              </div>
               {isError && isError==='collectorSignature' && (
          <p style={{ color: "red", padding:"5px",paddingRight:"0px",fontSize: "12px", marginTop: "5px" }}>
            Please fill collector signature
          </p>
        )}
            </div>
          </div>
          <hr style={{marginTop:"25px"}}/>
          <table className="table-one" style={{marginTop:"0px"}}>
            <tr>
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
          <h4>What test type is required?</h4>
        <tr>
          <th>Test Name</th>
          <th>Include</th>
        </tr>
      </thead>
      <tbody>
        {specificFields.map((field, index) => (
          <tr key={index}>
            <td style={{ border: "1px solid black", padding: "8px" }}>{field==='DrugsandAlcoholUrineTest' ? ' Drugs and Alcohol (Urine & Breath)':field==='DrugsandAlcoholOralTest' ? 'Drugs and Alcohol (Oral Fl & Breath)' : field==='BreathAlcoholOnlyTest' ? 'Breath Alcohol Only' : field==='DrugsOnlyTest' ? 'Drugs Only ' : field}</td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              <input
                type="checkbox"
                name={field}
                checked={formData[field] === true}
                onChange={handleChange}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </tr>
    <tr>
              <td colspan="3" className="form-description">
                <caption>Medication</caption>
                Give details of any medication, nutritional or fitness
                supplements taken within the last 14 days. If none, write
                'NONE'.
              </td>
            </tr>
            <tr>
              {/* <th>Date Taken{formData.DrugsandAlcoholUrineTest === "true" || formData.DrugsandAlcoholOralTest !== "true" ?<span style={{ color: "red" }}>*</span> : null }</th>
              <th>Type/Description{formData.DrugsandAlcoholUrineTest !== "" || formData.DrugsandAlcoholOralTest !== "" ?<span style={{ color: "red" }}>*</span> : null }</th>
              <th>Dosage{formData.DrugsandAlcoholUrineTest !== "" || formData.DrugsandAlcoholOralTest !== "" ?<span style={{ color: "red" }}>*</span> : null }</th> */}
            <th>
  Date Taken
  {formData.DrugsandAlcoholUrineTest === true || formData.DrugsandAlcoholOralTest === true
  //  ? (  <span style={{ color: "red" }}>*</span>  ) : null
  }
</th>
<th>
  Type/Description
  {formData.DrugsandAlcoholUrineTest === true || formData.DrugsandAlcoholOralTest === true
  //  ? (    <span style={{ color: "red" }}>*</span> ) : null
   }
</th>
<th>
  Dosage
  {formData.DrugsandAlcoholUrineTest === true || formData.DrugsandAlcoholOralTest === true
  // ? (<span style={{ color: "red" }}>*</span> ) : null
  }
</th>

            </tr>
            <tr>
              <td>
                <input
                  className="noborder"
                  type="date"
                  name="medicationDate1"
                  value={formData.medicationDate1}
                  onChange={handleChange}
                  // required={formData.DrugsandAlcoholUrineTest !== "" || formData.DrugsandAlcoholOralTest !== ""}
                />
              </td>
              <td>
                <input
                  className="noborder"
                  type="text"
                  name="medicationType1"
                  value={formData.medicationType1}
                  onChange={handleChange}
                  // required={formData.DrugsandAlcoholUrineTest !== "" || formData.DrugsandAlcoholOralTest !== ""}
                  />
              </td>
              <td>
                <input
                  className="noborder"
                  type="text"
                  name="medicationDosage1"
                  value={formData.medicationDosage1}
                  onChange={handleChange}
                  // required={formData.DrugsandAlcoholUrineTest !== "" || formData.DrugsandAlcoholOralTest !== ""}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  className="noborder"
                  type="date"
                  name="medicationDate2"
                  value={formData.medicationDate2}
                  onChange={handleChange}
                  />
              </td>
              <td>
                <input
                  className="noborder"
                  type="text"
                  name="medicationType2"
                  value={formData.medicationType2}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  className="noborder"
                  type="text"
                  name="medicationDosage2"
                  value={formData.medicationDosage2}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  className="noborder"
                  type="date"
                  name="medicationDate3"
                  value={formData.medicationDate3}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  className="noborder"
                  type="text"
                  name="medicationType3"
                  value={formData.medicationType3}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  className="noborder"
                  type="text"
                  name="medicationDosage3"
                  value={formData.medicationDosage3}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  className="noborder"
                  type="date"
                  name="medicationDate4"
                  value={formData.medicationDate4}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  className="noborder"
                  type="text"
                  name="medicationType4"
                  value={formData.medicationType4}
                  onChange={handleChange}
                />
              </td>
              <td>
                <input
                  className="noborder"
                  type="text"
                  name="medicationDosage4"
                  value={formData.medicationDosage4}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </table>
          <div class="row5">
            <div
              class="head"
              style={{
                border: "1px solid black",
                borderBottom: "none",
                width: "98.7%",
                height: "30px",
                fontSize: "15px",
                fontWeight: "bold",
                paddingLeft: "10px",
              }}
            >
              Adulteration Check
            </div>
            <div class="body" style={{ display: "flex" }}>
              <div
                class="bone"
                style={{
                  border: "1px solid black",
                  borderRight: "none",
                  width: "30%",
                  height: "100px",
                }}
              >
                <div className="donor" style={{ marginLeft: "5px" }}>
                  {/* GCAA LIC No */}
                  <label
                    style={{
                      width: "130px",
                      fontSize: "13px",
                      fontWeight: "bold",
                    }}
                  >
                    Collection Time:{" "}
                  </label>
                  <input
                    className="inputstyle"
                    type="text"
                    name="collectionTime"
                    value={formData.collectionTime}
                    placeholder=""
                    onChange={handleChange}
                    style={{ width: "102px", margin: "0px", height: "5px" }}
                    // required
                  />
                </div>
                <div className="donor" style={{ marginLeft: "5px" }}>
                  {/* GCAA LIC No */}
                  <label
                    style={{
                      width: "130px",
                      fontSize: "13px",
                      fontWeight: "bold",
                    }}
                  >
                    Result Read Time:{" "}
                  </label>
                  <input
                    className="inputstyle"
                    type="text"
                    name="resultReadTime"
                    value={formData.resultReadTime}
                    placeholder=""
                    onChange={handleChange}
                    style={{ width: "102px", margin: "0px", height: "5px" }}
                    // required
                  />
                </div>
                <div class="row"></div>
                <h5 style={{ marginLeft: "5px" }}>
                  Temperature 32 - 38˚{" "}
                  <label
                    style={{
                      marginRight: "10px",
                      marginLeft: "10px",
                      width: "100px",
                      fontSize: "14px",
                    }}
                  >
                    Yes
                    <input
                      type="radio"
                      name="temperature"
                      value="Yes"
                      checked={formData.temperature === 'Yes'}
                      onChange={handleChange}
                    />
                  </label>
                  <label
                    style={{
                      marginRight: "10px",
                      width: "100px",
                      fontSize: "14px",
                    }}
                  >
                    No
                    <input
                      type="radio"
                      name="temperature"
                      value="No"
                      checked={formData.temperature === 'No'}
                      onChange={handleChange}
                    />
                  </label>
                </h5>
              </div>
              <div class="btwo myb" style={{ width: "40%", height: "100px" }}>
                <div
                  class="row1"
                  style={{ height: "50px", borderBottom: "1px solid black" }}
                >
                  <div class="" style={{ display: "flex" }}>
                    <div
                      class=""
                      style={{
                        height: "50px",
                        width: "50%",
                        borderRight: "1px solid black",
                      }}
                    >
                      <div
                        className="donor"
                        style={{ marginLeft: "5px", marginTop: "10px" }}
                      >
                        {/* GCAA LIC No */}
                        <label
                          style={{
                            width: "50px",
                            fontSize: "13px",
                            fontWeight: "bold",
                          }}
                        >
                          Lot No.{" "}
                        </label>
                        <input
                          className="inputstyle"
                          type="number"
                          name="lotno"
                          value={formData.lotno}
                          placeholder=""
                          onChange={handleChange}
                          style={{
                            width: "72px",
                            margin: "0px",
                            height: "5px",
                          }}
                          // required
                        />
                      </div>
                    </div>
                    <div class="" style={{ height: "50px", width: "50%" }}>
                      <div
                        className="donor"
                        style={{ marginLeft: "10px", marginTop: "10px" }}
                      >
                        {/* GCAA LIC No */}
                        <label
                          style={{
                            width: "71px",
                            fontSize: "13px",
                            fontWeight: "bold",
                          }}
                        >
                          Exp Date{" "}
                        </label>
                        <input
                          className="inputstyle"
                          type="date"
                          name="expDate"
                          value={formData.expDate}
                          placeholder=""
                          onChange={handleChange}
                          style={{
                            width: "52px",
                            margin: "0px",
                            height: "5px",
                          }}
                          // required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row2" style={{ height: "50px" }}>
                  <h5 style={{ marginLeft: "5px", marginTop: "10px" }}>
                    Adulteration Test Passed
                    <label
                      style={{
                        marginRight: "10px",
                        marginLeft: "20px",
                        width: "100px",
                        fontSize: "14px",
                      }}
                    >
                      Yes
                      <input
                        type="radio"
                        name="adulterationTestPassed"
                        value="Yes"
                        checked={formData.adulterationTestPassed === 'Yes'}
                        onChange={handleChange}
                      />
                    </label>
                    <label
                      style={{
                        marginRight: "10px",
                        width: "100px",
                        fontSize: "14px",
                      }}
                    >
                      No
                      <input
                        type="radio"
                        name="adulterationTestPassed"
                        value="No"
                        checked={formData.adulterationTestPassed === 'No'}
                        onChange={handleChange}
                      />
                    </label>
                  </h5>
                </div>
              </div>
              <div
                class="bthree"
                style={{
                  border: "1px solid black",
                  borderLeft: "none",
                  width: "30%",
                  height: "100px",
                }}
              >
                <div
                  className=""
                  style={{
                    padding: "10px",
                    marginLeft: "5px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* GCAA LIC No */}
                  <label
                    style={{
                      width: "130px",
                      fontSize: "13px",
                      fontWeight: "bold",
                    }}
                  >
                    Remarks / Drug Test Result
                  </label>
                  <input
                    className="inputstyle"
                    type="text"
                    name="adulterationRemarks"
                    value={formData.adulterationRemarks}
                    placeholder=""
                    onChange={handleChange}
                    style={{ width: "192px", margin: "0px", height: "5px" }}
                    // required
                  />
                </div>
              </div>
            </div>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                borderCollapse: "collapse",
                width: "100%",
                border: "1px solid black",
              }}
            >
              <thead>
                <tr>
                  <th
                    colSpan="6"
                    style={{ border: "1px solid black", padding: "8px" }}
                  >
                    Laboratory Tests (Please tick tests required)
                  </th>
                  <th
                    colSpan="1"
                    style={{ border: "1px solid black", padding: "8px" }}
                  ></th>
                  <th
                    colSpan="1"
                    style={{ border: "1px solid black", padding: "8px" }}
                  >
                    Screen
                  </th>
                  <th
                    colSpan="1"
                    style={{ border: "1px solid black", padding: "8px" }}
                  >
                    Confirm
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["", "screen", "confirm", "", "Methamphetamine"],
                  ["Alcohol", "", "", "Cocaine", "Morphine"],
                  ["Amphetamines", "", "", "Ketamine", "Network Rail Std"],
                  [
                    "Benzodiazepines",
                    "",
                    "",
                    "Maritime Std",
                    "Opiates",
                  ],
                  ,
                  ["Buprenorphine", "", "", "MDMA", "SSRI"],
                  ["Blood", "", "", "Methadone", "TCA"],
                  ["Other (Please Specify)", "", "", "", "THC"],
                ].map(([leftTest, a, b, rightTest, c], index) => (
                  <tr key={index}>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {leftTest}
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {a}
                      {index !== 0 && (<input
                              type="checkbox"
                              name={`${leftTest.split(" ")[0]}Screen`}
                              checked={formData[`${leftTest.split(" ")[0]}Screen`] || false}
                              onChange={handleChange}
                              />)}
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {b}
                      {index !== 0 && (<input
                              type="checkbox"
                              name={`${leftTest.split(" ")[0]}Confirm`}
                              checked={formData[`${leftTest.split(" ")[0]}Confirm`] || false}
                              onChange={handleChange}
                              />)}
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {rightTest}
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {a}
                      {index !== 0 &&index !== 7 && (<input
                              type="checkbox"
                              name={`${rightTest.split(" ")[0]}Screen`}
                              checked={formData[`${rightTest.split(" ")[0]}Screen`] || false}
                              onChange={handleChange}
                              />)}
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {b}
                      {index !== 0 && index !== 7 &&(<input
                              type="checkbox"
                              name={`${rightTest.split(" ")[0]}Confirm`}
                              checked={formData[`${rightTest.split(" ")[0]}Confirm`] || false}
                              onChange={handleChange}
                              />)}
                    </td>
                    <td style={{ border: "1px solid black", padding: "8px" }}>
                      {c}
                    </td>
                    <td
                      style={{ border: "1px solid black", padding: "8px" }}
                    >{<input
                      type="checkbox"
                      name={`${c.split(" ")[0]}Screen`}
                      checked={formData[`${c.split(" ")[0]}Screen`] || false}
                      onChange={handleChange}
                      />}</td>
                    <td
                      style={{ border: "1px solid black", padding: "8px" }}
                    >{<input
                      type="checkbox"
                      name={`${c.split(" ")[0]}Confirm`}
                      checked={formData[`${c.split(" ")[0]}Confirm`] || false}
                      onChange={handleChange}
                      />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div class="myb seventh-row">
            <div
              class="third-row"
              style={{ marginBottom: "10px", padding: "10px" }}
            >
              <div class="" style={{ borderBottom: "1px solid black" }}>
                <h5 style={{ fontWeight: "bold", fontSize: "15px" }}>
                  DONOR CONSENT TO TEST AND SPECIFIC DECLARATION
                </h5>
              </div>
              <p style={{ fontSize: "12px" }}>
                {" "}
                I certify that the specimens accompanying this form are my own
                and were provided by me to the collector. The specimens were
                split and sealed with tamper-proof seals in my presence and the
                information provided on this form and on the labels is correct.
                I consent to the specimens being submitted to a laboratory for
                testing. I understand the results of the test will only be made
                available to the organisation requesting the test or their
                authorised representatives.
                <span style={{ fontWeight: "bold", fontSize: "13px" }}>
                  I am satisfied that the test has been completed in line with
                  stated process.
                </span>
              </p>
              <div class="" style={{ display: "flex" }}>
                <div className="donor">
                  {/* GCAA LIC No */}
                  <label
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      width: "60px",
                    }}
                  >
                    Name{" "}
                  </label>
                  <input
                    className="inputstyle"
                    type="text"
                    name="donorCertificationName"
                    value={formData.donorCertificationName}
                    placeholder=""
                    onChange={handleChange}
                    style={{ margin: "0px", width: "150px" }}
                    
                  />
                </div>
                <div className="donor" style={{ marginLeft: "30px" }}>
                  {/* GCAA LIC No */}
                  <label
                    style={{
                      width: "80px",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    Signature{" "}
                  </label>
                  <input
                    className="inputstyle"
                    type="text"
                    name="donorCertificationSignature"
                    value=""//{formData.donorCertificationSignature}
                    placeholder=""
                    onChange={handleChange}
                    onClick={()=>{openSignaturePad(); setIsDonorConcentOpen(true)}}
                    style={{ width: "152px", margin: "0px",cursor: "pointer",
                      backgroundImage: `url(${formData.donorCertificationSignature})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",height:"30px"}}
              
                  />
                </div>
                {isSignaturePadOpen&& donorConcentOpen && (
      pad("donorCertificationSignature")
      )}
                <div className="donor" style={{ marginLeft: "30px" }}>
                  <label
                    style={{
                      width: "25px",
                      fontSize: "14px",
                      fontWeight: "bold",
                      marginLeft: "10px",
                      marginRight: "10px",
                    }}
                  >
                    Date
                  </label>
                  <input
                    className="inputstyle"
                    type="date"
                    name="donorCertificationDate"
                    value={formData.donorCertificationDate}
                    onChange={handleChange}
                    style={{ width: "69%" }}
                    
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            class="myb eightth-row"
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            <div
              class="third-row"
              style={{ marginBottom: "10px", padding: "10px" }}
            >
              <div class="" style={{ borderBottom: "1px solid black" }}>
                <h5 style={{ fontWeight: "bold", fontSize: "15px" }}>
                  Collector Certification
                </h5>
              </div>
              <p style={{ fontSize: "12px" }}>
                {" "}
                I certify that the specimen identified on this form is that
                provided to me by the donor providing the certification above,
                that it bears the identification as set forth above and that it
                has been collected in accordance with the instructions provided.
              </p>
              <div class="" style={{ display: "flex" }}>
                <div className="donor">
                  {/* GCAA LIC No */}
                  <label
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      width: "60px",
                    }}
                  >
                    Name<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    className="inputstyle"
                    type="text"
                    name="collectorCertificationName"
                    value={formData.collectorCertificationName}
                    placeholder=""
                    onChange={handleChange}
                    style={{ margin: "0px", width: "150px" }}
                    required
                  />
                </div>
                <div className="donor" style={{ marginLeft: "30px" }}>
                  {/* GCAA LIC No */}
                  <label
                    style={{
                      width: "80px",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    Signature<span style={{ color: "red" }}>*</span>
                  </label>
                  
                  <input
                    className="inputstyle"
                    type="text"
                    name="collectorCertificationSignature"
                    value=""//{formData.collectorCertificationSignature}
                    placeholder=""
                    onClick={()=>{openSignaturePad(); setIsCollectorCerificationOpen(true)}}
                    onChange={handleChange}
                    style={{ width: "152px", margin: "0px",cursor: "pointer",
                      backgroundImage: `url(${formData.collectorCertificationSignature})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",height:"30px" }}
         
                  />
                </div>
                {isSignaturePadOpen && collectorCertificationOpen && (
      pad("collectorCertificationSignature")
      )}
                <div className="donor" style={{ marginLeft: "30px" }}>
                  <label
                    style={{
                      width: "25px",
                      fontSize: "14px",
                      fontWeight: "bold",
                      marginLeft: "10px",
                      marginRight: "10px",
                    }}
                  >
                    Date<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    className="inputstyle"
                    type="date"
                    name="collectorCertificationDate"
                    value={formData.collectorCertificationDate}
                    onChange={handleChange}
                    style={{ width: "69%" }}
                    required
                  />
                </div>
              </div>
               {isError && isError==='collectorCertificationSignature' && (
          <p style={{ color: "red", padding:"5px",paddingRight:"0px",fontSize: "12px", marginTop: "5px" }}>
            Please fill collector certification signature
          </p>
        )}
            </div>
          </div>
          {/* <div class="last-row" style={{display:"flex",width: "100%"}}>
            <div class="part1" style={{padding:"10px",width: "40%",border:"1px solid black",height:"130px",marginBottom:"20px",borderRight:"none"}}><h5 style={{ fontWeight: "bold", fontSize: "15px" }}>
                  Received at Laboratory:
                </h5> <div className="donor" style={{ marginLeft: "5px" }}>
                  
                  <label
                    style={{
                      width: "130px",
                      fontSize: "13px",
                      fontWeight: "bold",
                    }}
                  >
                    Initials:{" "}
                  </label>
                  <input
                    className="inputstyle"
                    type="text"
                    name="recieveInitial"
                    value={formData.recieveInitial}
                    placeholder=""
                    onChange={handleChange}
                    style={{ width: "102px", margin: "0px", height: "5px" }}
                    
                  />
                </div>
                <div className="donor" style={{ marginLeft: "5px" }}>
             
                  <label
                    style={{
                      width: "130px",
                      fontSize: "13px",
                      fontWeight: "bold",
                    }}
                  >
                   Name:{" "}
                  </label>
                  <input
                    className="inputstyle"
                    type="text"
                    name="recieveName"
                    value={formData.recieveName}
                    placeholder=""
                    onChange={handleChange}
                    style={{ width: "102px", margin: "0px", height: "5px" }}
                    
                  />
                </div>
                <div className="donor" style={{ marginLeft: "5px" }}>
           
                  <label
                    style={{
                      width: "130px",
                      fontSize: "13px",
                      fontWeight: "bold",
                    }}
                  >
                    Date:{" "}
                  </label>
                  <input
                    className="inputstyle"
                    type="date"
                    name="recieveDate"
                    value={formData.recieveDate}
                    placeholder=""
                    onChange={handleChange}
                    style={{ width: "102px", margin: "0px", height: "5px" }}
                    
                  />
                </div>
                </div>
            <div class="part2" style={{width: "30%",border:"1px solid black",height:"150px",marginBottom:"20px",borderRight:"none"}}><h5 style={{ fontWeight: "bold",padding:"7px",paddingLeft:"12px", fontSize: "15px" }}>
            Specimen bottle seals intact
                </h5><div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <label
                  style={{
                    marginRight: "10px",
                    width: "50px",
                    fontSize: "14px",
                  }}
                >
                  Yes
                  <input
                    type="radio"
                    name="specimenBottle"
                    value="Yes"
                    checked={formData.specimenBottle === 'Yes'}
                    onChange={handleChange}
                  />
                </label>
                <label
                  style={{
                    marginRight: "10px",
                    width: "50px",
                    fontSize: "14px",
                  }}
                >
                  No
                  <input
                    type="radio"
                    name="specimenBottle"
                    value="No"
                    checked={formData.specimenBottle === 'No'}
                    onChange={handleChange}
                  />
                </label>

                <span
            style={{
              marginLeft: "auto",
              width: "110px",
              marginLeft:"0px",
              fontSize: "14px",
              cursor: "pointer",
              color: "green", // Add color to indicate clickable text
            }}
            onClick={() => handleAddComment("specimenBottleComment")} // Handle add comment
            title={formData.specimenBottleComment} // Display the comment on hover
          >
            {formData.specimenBottleComment ? "update comment" : "add comment"}
          </span>
              </div>
  
        {formData.specimenBottleComment && (
          <div
            style={{
              fontSize: "12px",
              color: "gray",
              marginTop: "5px",
              paddingLeft: "10px",
            }}
          >
            Comment: {formData.specimenBottleComment}
          </div>
        )}</div>
            <div class="part3" style={{width: "30%",border:"1px solid black",height:"150px",marginBottom:"20px"}}><h5 style={{ fontWeight: "bold",padding:"7px",paddingLeft:"12px", fontSize: "15px" }}>
            Fatal Flaws
                </h5><div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <label
                  style={{
                    marginRight: "10px",
                    width: "50px",
                    fontSize: "14px",
                  }}
                >
                  Yes
                  <input
                    type="radio"
                    name="fatalFlaws"
                    value="Yes"
                    checked={formData.fatalFlaws === 'Yes'}
                    onChange={handleChange}
                  />
                </label>
                <label
                  style={{
                    marginRight: "10px",
                    width: "50px",
                    fontSize: "14px",
                  }}
                >
                  No
                  <input
                    type="radio"
                    name="fatalFlaws"
                    value="No"
                    checked={formData.fatalFlaws === 'No'}
                    onChange={handleChange}
                  />
                </label>
                
          <span
            style={{
              marginLeft: "auto",
              width: "110px",
              marginLeft:"0px",
              fontSize: "14px",
              cursor: "pointer",
              color: "green", // Add color to indicate clickable text
            }}
            onClick={() => handleAddComment("fatalFlawsComment")} // Handle add comment
            title={formData.fatalFlawsComment} // Display the comment on hover
          >
            {formData.fatalFlawsComment ? "update comment" : "add comment"}
          </span>
              </div>
             
        {formData.fatalFlawsComment && (
          <div
            style={{
              fontSize: "12px",
              color: "gray",
              marginTop: "5px",
              paddingLeft: "10px",
            }}
          >
            Comment: {formData.fatalFlawsComment}
          </div>
        )}</div>
          </div> */}

         
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              background: "#19b0e6",
              background: "#80c209",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Screen4ChainOfCustodyForm;

