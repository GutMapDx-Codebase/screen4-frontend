import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar';
import Sidemanu from '../components/sidemanu';
import "../css/profile.css"
import Cookies from 'js-cookie';
import { AiFillEdit } from "react-icons/ai"
import { message, AutoComplete, Image } from 'antd';
import { HiUserAdd } from "react-icons/hi"
import { AiFillDelete, AiOutlineClose } from "react-icons/ai"
import { useNavigate } from 'react-router-dom';

import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { FaRegCircleXmark } from 'react-icons/fa6';
import { ImUpload2 } from 'react-icons/im'
import { v4 } from 'uuid';
import { imageDb } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


function Profile() {
  const Navigate = useNavigate();
  const loginemail = Cookies.get("email")
  const loginname = Cookies.get("Name")
  const id = Cookies.get("id")
  const token = Cookies.get("Token")
  const [userinfo, setuserinfo] = useState([])
  const [kit, setkit] = useState([])
  const [popupdetails2, setpopupdetails2] = useState(false)
  const [popup, setpopup] = useState(false)
  const [popup2, setpopup2] = useState(false)
  const [popup3, setpopup3] = useState(false)
  const [popup4, setpopup4] = useState(false)

  const [editname, seteditname] = useState("")
  const [editemail, seteditemail] = useState("")
  const [editaddres, seteditaddres] = useState("")
  const [editphone, seteditphone] = useState("")
  const [editabout, seteditabout] = useState("")
  const [billingpostcode, setbillingpostcode] = useState("")
  const [editpassword, seteditpassword] = useState("")

  const [practitioner, setpractitioner] = useState([])
  const [password, setpassword] = useState("")





  const [practitionername, setpractitionername] = useState("")
  const [practitioneremail, setpractitioneremail] = useState("")
  const [practitionerpassword, setpractitionerpassword] = useState("")

  const [img, setimg] = useState("/avatar.png")
  const [img2, setimg2] = useState("/avatar.png")
  const [img3, setimg3] = useState("/avatar.png")


  useEffect(() => {

    console.log(loginemail)
    console.log(loginname)
    console.log(id)





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

    fetch(`${process.env.REACT_APP_API_URL}/profileinfo`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setuserinfo(result)


        seteditabout(result.about)
        seteditaddres(result.address)
        seteditemail(result.email)
        seteditname(result.name)
        seteditphone(result.phone)
        setbillingpostcode(result.billingpostcode)
        if (result.profilepic) { setimg3(result.profilepic) }
        else { setimg3("/avatar.png") }



      })
      .catch(error => console.log('error', error));


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








    var myHeaders4 = new Headers();
    myHeaders4.append("Content-Type", "application/x-www-form-urlencoded");



    var requestOptions4 = {
      method: 'GET',
      headers: myHeaders,

      redirect: 'follow'
    };

    fetch(`${process.env.REACT_APP_API_URL}/getalladmin`, requestOptions4)
      .then(response => response.json())
      .then(result => setpractitioner(result))








  }, [])



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



  const subminupdatedata = (e) => {
    e.preventDefault()


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("_id", id);
    urlencoded.append("password", password);
    urlencoded.append("billingpostcode", billingpostcode);
    urlencoded.append("address", editaddres);
    urlencoded.append("phone", editphone);
    urlencoded.append("about", editabout);
    urlencoded.append("email", editemail);
    urlencoded.append("name", editname);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch(`${process.env.REACT_APP_API_URL}/profileedit`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result === "Password is incorrect.") { message.error("Password is incorrect.") } else {
          setuserinfo(result)

          setpopup(false)
          setpopup2(false)
        }
      })
      .catch(error => console.log('error', error));


  }




  var pandingresults = 0
  var totalpatients = 0


  const count = () => {

    // kit.map((value, index) => {

    //   if (value.result && Array.isArray(value.result))  {
    //     if (value.result.length !== 0) { totalpatients = totalpatients + 1 } else { pandingresults = pandingresults + 1 }
    //   }
    // }


    // )



  }





  const addnewPractitioner = (e) => {
    e.preventDefault()




    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("name", practitionername);
    urlencoded.append("email", practitioneremail);
    urlencoded.append("password", practitionerpassword);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch(`${process.env.REACT_APP_API_URL}/addadmin`, requestOptions)
      .then(response => response.json())
      .then(result => {

        if (result === 'user found') {
          message.warning("Admin Already in List")
        } else {

          setpractitioner(result)
          setpopup4(false)
          setpractitioneremail('')
          setpractitionername('')
          setpractitionerpassword('')
        }

      }


      )
      .catch(error => console.log('error', error));


  }






  var conuttt = 0;





  const [searchTerm, setSearchTerm] = useState('');
  var options = [];

  const dooption = () => {
    practitioner.map((value, index) => {

      // options = [
      //   { value: 'Burns Bay Road' },

      // ];
      // const newvalue = toString(value.kitid)
      options.push({ value: value.name })
      options.push({ value: value.email })


    })


  }



  const handleInputChange = (e) => {
    e.preventDefault()






    const intttt = (searchTerm)

    // Filter the Kit array based on the user's input
    const filteredSuggestions = practitioner.filter((item) =>

      item.name.toLowerCase().includes(intttt.toLowerCase()) || item.email.toLowerCase().includes(intttt.toLowerCase())



    );


    setpractitioner(filteredSuggestions)
    setsearchdone(true)

  };




  const [searchdone, setsearchdone] = useState(false)
  const navigate = useNavigate()
  const clearsearch = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");



    var myHeaders4 = new Headers();
    myHeaders4.append("Content-Type", "application/x-www-form-urlencoded");



    var requestOptions4 = {
      method: 'GET',
      headers: myHeaders,

      redirect: 'follow'
    };

    fetch(`${process.env.REACT_APP_API_URL}/getalladmin`, requestOptions4)
      .then(response => response.json())
      .then(result => setpractitioner(result))




    setsearchdone(false)

  }


  var coutppp = 0




  var padingres = 0

  const cout = () => {

    coutppp = kit.filter(item => 'result' in item && item.result.length !== 0).length;
    padingres = kit.length - coutppp;
  }









  const changecard = () => {


    const isSure = window.confirm("Are you certain you want to proceed? Initiating a card change will erase your existing card details, necessitating a subsequent login to securely add a new card.");
    if (isSure) {





      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("id", id);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };

      fetch(`${process.env.REACT_APP_API_URL}/profileKitsinfochnagecard`, requestOptions)
        .then(response => response.text())
        .then(result => {
          if (result === "cardremoved") {
            const allCookies = Cookies.get();
            for (const cookieName in allCookies) {
              Cookies.remove(cookieName);
            }
            navigate('/')
          } else { message.error("Something wrong") }
        })
        .catch(error => console.log('error', error));









    }

  }






  const counttttkit = (type) => {
    var whatsreturn = "0"
    var total = 0

    kit.map((value) => {

      if (type === value.Kittype && userinfo._id === value.assignedto) {
        total = total + 1
      }


    })



    if (type === "100") {
      whatsreturn = "fs 100(" + total + ")"
    } else
      if (type === "210") {
        whatsreturn = "fs 210(" + total + ")"
      } else {
        whatsreturn = total
      }
    return (
      whatsreturn
    )
  }



  const Conuttttttt2 = () => {
    var whatreturn = "0"

    var total2 = 0



    kit.map((value) => {

      if ((value.result.length === 0 || value.result2.length === 0) && userinfo._id === value.assignedto && (value.Kittype === "100" || value.Kittype === "210")) {
        total2 = total2 + 1
      }
      if ((value.otherresults === "nil") && userinfo._id === value.assignedto && (value.Kittype !== "100" && value.Kittype !== "210")) {
        total2 = total2 + 1
      }


    })
    whatreturn = total2




    return whatreturn

  }
  const Conuttttttt = () => {
    var whatreturn = "0"
    var total = 0




    kit.map((value) => {

      if ((value.result || value.result2 || value.otherresults !== "nil") && userinfo._id === value.assignedto) {
        total = total + 1
      }


    })
    whatreturn = total



    return whatreturn

  }


  const handleImgChange = (e) => {
    setimg(URL.createObjectURL(e.target.files[0]));
    setimg2(e.target.files[0])
  };

  const updateimage = async (e) => {
    e.preventDefault()

    const Carimageid = v4();

    const imgRef = ref(imageDb, `profile/${Carimageid}`)
    await uploadBytes(imgRef, img2)
    const cvUrl = await getDownloadURL(imgRef);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded2 = new URLSearchParams();
    urlencoded2.append("profilepic", cvUrl);
    urlencoded2.append("_id", userinfo._id);

    var requestOptions2 = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded2,
      redirect: 'follow'
    };


    await fetch(`${process.env.REACT_APP_API_URL}/updateimage2`, requestOptions2)
      .then(response => response.json())
      .then(result => {



        setimg3(result.profilepic)


      })
      .catch(error => console.log('error', error));
    setpopupdetails2(false)



  }
  var sno1 = 1
  var sno2 = 1

  return (<>


    {(token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" || token === "sdrfg&78967daghf#wedhjgasj(dlsh6kjsdg") && <>



      <Navbar />
      {cout()}
      <div className='deshboardmain'>
        <Sidemanu />
        <div className='profilemainbody'>





          {popup === true && <>
            <div onClick={() => {
              setpopup(false)
              setpopup2(false)
              setpopup3(false)
              setpopup4(false)

            }
            } className='popupbg'></div>
            <div className='popup'>









              <div className='bownpopupbutton'>


                {popup2 === false && <>

                  {popup3 === false && <>


                    <form onSubmit={(e) => {
                      e.preventDefault()
                      setpopup2(true)
                    }} className='profileeditingform'>

                      <h3>Edit Profile</h3>
                      <div className='editprofileinputs'>
                        <label>Name :<input required value={editname} onChange={(e) => seteditname(e.target.value)} /></label>
                        <label>Email :<input required value={editemail} onChange={(e) => seteditemail(e.target.value)} /></label>
                        <label>Address :<input required value={editaddres} onChange={(e) => seteditaddres(e.target.value)} /></label>
                        <label>Phone :<input required value={editphone} onChange={(e) => seteditphone(e.target.value)} /></label>
                        <label>billing post code :<input required value={billingpostcode} onChange={(e) => setbillingpostcode(e.target.value)} style={{ width: '70%' }} /></label>

                        <label style={{ alignItems: 'baseline' }}>About :<textarea required onChange={(e) => seteditabout(e.target.value)} value={editabout} /></label>
                      </div>


                      <div className='buttonnnnn'>

                        <button onClick={() => {
                          setpopup(false)
                          setpopup2(false)

                        }
                        } style={{ border: '1px solid red', color: 'black' }} >cancel</button>







                        <button style={{ backgroundColor: '#4180b7' }}>Update</button>
                      </div>

                    </form>
                  </>}


                  {popup3 === true && <>


                    <form onSubmit={(e) => {
                      e.preventDefault()

                      var myHeaders = new Headers();
                      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

                      var urlencoded = new URLSearchParams();
                      urlencoded.append("_id", id);
                      urlencoded.append("password", password);
                      urlencoded.append("newpassword", editpassword);

                      var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: urlencoded,
                        redirect: 'follow'
                      };

                      fetch(`${process.env.REACT_APP_API_URL}/profileeditpassword`, requestOptions)
                        .then(response => response.json())
                        .then(result => {
                          if (result === "Password is incorrect.") { message.error("Password is incorrect.") } else {
                            setuserinfo(result)
                            message.success("Password has been changed")
                            setpopup(false)
                            setpopup3(false)
                          }
                        })
                        .catch(error => console.log('error', error));











                    }} className='profileeditingform'>

                      <h3>Edit Profile</h3>
                      <div className='editprofileinputs' style={{ gap: '10px' }}>
                        <label style={{ marginBottom: '50px' }}>Old Password :<input type='password' required value={password} onChange={(e) => setpassword(e.target.value)} style={{ width: '70%' }} /></label>
                        <label>New Password :<input required type='password' value={editpassword} onChange={(e) => seteditpassword(e.target.value)} style={{ width: '70%' }} /></label>
                        <label>Confirm Password :<input required type='password' title='Password does not Match' pattern={editpassword} style={{ width: '70%' }} /></label>

                      </div>


                      <div className='buttonnnnn'>

                        <button onClick={() => {
                          setpopup(false)
                          setpopup2(false)
                          setpopup3(false)

                        }
                        } style={{ border: '1px solid red', color: 'black' }} >cancel</button>







                        <button style={{ backgroundColor: '#4180b7' }}>Update</button>
                      </div>

                    </form>
                  </>}

                </>}



                {popup2 === true && <>
                  <form className='profileeditingform' onSubmit={subminupdatedata}>

                    <h3>Please Enter your Password to Continue</h3>
                    <div className='editprofileinputs'>
                      <label>Password :<input type='password' required value={password} onChange={(e) => setpassword(e.target.value)} /></label>
                    </div>


                    <div className='buttonnnnn'>

                      <button onClick={() => {
                        setpopup(false)
                        setpopup2(false)
                        setpopup3(false)
                      }
                      } style={{ border: '1px solid red', color: 'black' }} >cancel</button>







                      <button style={{ backgroundColor: '#4180b7' }}>Continue</button>
                    </div>

                  </form>
                </>}








              </div>

            </div>
          </>}

          {popupdetails2 === true && <>
            <div onClick={() => {
              setpopupdetails2(false)


            }
            } className='popupbg'></div>
            <div className='popup' style={{ height: '600px !important' }}>

              <div>

                <Image src={img} alt='' width={"30%"} />
              </div>

              <form onSubmit={updateimage}>
                <input
                  type='file'
                  onChange={handleImgChange}
                  accept='image/*'
                />
                <button>Update</button>
              </form>



            </div>
          </>}

          <div className='addbutton' style={{ width: '100%' }}>

            <a onClick={(e) => {
              e.preventDefault()

              setpopup3(true)
              setpopup(true)
            }} href='/' style={{ display: 'flex', marginRight: '10px', alignItems: "center", color: 'red' }}> <AiFillEdit style={{ width: '20px', height: '20px' }} />change password</a>
            <button onClick={() => setpopup(true)}><AiFillEdit style={{ width: '20px', height: '20px' }} />Edit Profile</button>
          </div>




          <div className='uperprofile'>

            <div className='profilepicture'>
              <Image alt='avatar' src={img3} width={"300px"} />
              <div> <button className='button' onClick={() => {
                setpopupdetails2(true)


              }}><AiFillEdit style={{ width: '20px', height: '20px' }} />Change Profile Picture</button></div>

            </div>
            <div className='profileabot'>

              <div ><h3 style={{ width: '200px' }}>Name :</h3> <p style={{ margin: '0' }}> {userinfo.name ? (<>{userinfo.name}</>) : (<a href='#' onClick={(e) => {
                e.preventDefault()

                setpopup(true)
              }}>Click to edit</a>)}</p></div>
              <div ><h3 style={{ width: '200px' }}>Email :</h3> <p style={{ margin: '0' }}> {userinfo.email ? (<>{userinfo.email}</>) : (<a onClick={(e) => {
                e.preventDefault()

                setpopup(true)
              }} href='#'>Click to edit</a>)}</p></div>
              <div ><h3 style={{ width: '200px' }}>phone :</h3> <p style={{ margin: '0' }}> {userinfo.phone ? (<>{userinfo.phone}</>) : (<a onClick={(e) => {
                e.preventDefault()

                setpopup(true)
              }} href='#'>Click to edit</a>)}</p></div>
              <div ><h3 style={{ width: '200px' }}>address :</h3> <p style={{ margin: '0' }}> {userinfo.address ? (<>{userinfo.address}</>) : (<a onClick={(e) => {
                e.preventDefault()

                setpopup(true)
              }} href='#'>Click to edit</a>)}</p></div>
              <div ><h3 style={{ width: '200px' }}>billing post code :</h3> <p style={{ margin: '0' }}> {userinfo.billingpostcode ? (<>{userinfo.billingpostcode}</>) : (<a onClick={(e) => {
                e.preventDefault()

                setpopup(true)
              }} href='#'>Click to edit</a>)}</p></div>
              <div ><h3 style={{ width: '200px' }}>Registered On   :</h3> <p style={{ margin: '0' }}> {userinfo.timestamp ? (<>{userinfo.timestamp}</>) : (<a onClick={(e) => {
                e.preventDefault()

                setpopup(true)
              }} href='#'>Click to edit</a>)}</p></div>





              <div style={{ width: '100%', margin: '30px 0' }}>
                <h2>About Me</h2>
                <p style={{ width: '100%', margin: '0' }}>{userinfo.about}</p>
              </div>




              {/* {userinfo.CardID === "nocardneeded" ? (<> <button className='addbutton button' onClick={changecard}>Consignment (Click to add Card)</button>
              </>) : (<>
                {userinfo.CardID ? (<>
                  <button className='addbutton button' onClick={changecard}>Change payment Card</button>
                </>) : (<>
                  <button className='addbutton button' disabled>The card has not been added yet.</button>

                </>)}
              </>)} */}

            </div>

          </div>

          {token === "sdrfg&78967daghf#wedhjgasj(dlsh6kjsdg" && <>
          <div className='profileinfo'>

            <div className='infoboxinside'>
              {userinfo.assignedkits !== undefined && <>      <h2>{userinfo.assignedkits.length}</h2></>}
              {userinfo.assignedkits === undefined && <>      <h2>0</h2></>}
              <p style={{ margin: '0' }}>KIts</p>
            </div>

            <div className='infoboxinside'>
              {/* {userinfo.assignedkits !== undefined && <>      <h2>{coutppp}</h2></>} */}
              <h2 style={{ margin: '0' }}>{Conuttttttt()}</h2>
              <p style={{ margin: '0' }}>Total Patients</p>
            </div>


            <div className='infoboxinside'>
              {/* {userinfo.assignedkits !== undefined && <>      <h2>{padingres}</h2></>} */}
              <h2>{Conuttttttt2()}</h2>
              <p style={{ margin: '0' }}>Pending results
              </p>
            </div>





          </div>

          <table className='tablep' style={{ width: '90%' }}>
            <thead className='tablephead' >
              <tr>
                <th>Food Sensitivity Kits</th>

                <th>Microbiome Kits</th>
                <th>DNAMap Kits</th>
                <th>Parasitology Test</th>

              </tr>
            </thead>
            <tbody>
              <tr>
                <td> {userinfo.fstype ? (<><IoIosCheckmarkCircleOutline style={{ width: '30px', height: '30px', color: 'green' }} /> </>) : (<><FaRegCircleXmark style={{ width: '30px', height: '30px', color: 'red' }} />  </>)}    </td>
                <td> {userinfo.mbtype ? (<><IoIosCheckmarkCircleOutline style={{ width: '30px', height: '30px', color: 'green' }} /> </>) : (<><FaRegCircleXmark style={{ width: '30px', height: '30px', color: 'red' }} />  </>)}    </td>
                <td> {userinfo.dmtype ? (<><IoIosCheckmarkCircleOutline style={{ width: '30px', height: '30px', color: 'green' }} /> </>) : (<><FaRegCircleXmark style={{ width: '30px', height: '30px', color: 'red' }} />  </>)}    </td>
                <td> {userinfo.pttype ? (<><IoIosCheckmarkCircleOutline style={{ width: '30px', height: '30px', color: 'green' }} /> </>) : (<><FaRegCircleXmark style={{ width: '30px', height: '30px', color: 'red' }} />  </>)}    </td>

              </tr>

              <tr>
                <td><h4>{counttttkit("100")}  {counttttkit("210")} </h4></td>
                <td><h4>Viewable on Microbiome Portal.</h4></td>
                <td><h4>{counttttkit("dm")} </h4></td>
                <td><h4>{counttttkit("pt")} </h4></td>
              </tr>
            </tbody>
          </table> </>}  {/* <div className='uperprofile'>

            <div className='profilepicture'>
              <img alt='' src='/avatar.png' width={"300px"} />

            </div>
            <div className='profileabot'>

              <h1>{userinfo.name}</h1>
              <h4>{userinfo.email}</h4>

              <div style={{ width: '100%', margin: '30px 0' }}>
                <h2>About Me</h2>
                <p style={{ width: '100%', margin: '0' }}>{userinfo.about}</p>
              </div>


              <h3>{userinfo.phone}</h3>
              <h3>{userinfo.address}</h3>

              {token === "sdrfg&78967daghf#wedhjgasj(dlsh6kjsdg" && <>        <button className='addbutton button' onClick={changecard}>Change payment Card</button> </>}


            </div>

          </div> */}





          {/* testing */}



       


          {/* {userinfo._id === "6548a8ac3eb6db0cecff770d" && <> */}
          {userinfo._id === "6720ceb3b4fea95641fcb985" && <>

            <div className='profileinfo2'>






              <div className='header' style={{ width: '100%' }}>
                <h1> Admins</h1>
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





              <div className='addbutton' style={{ width: '100%' }}><button onClick={() => setpopup4(true)}><HiUserAdd style={{ width: '20px', height: '20px' }} />Add Admin</button></div>


              {popup4 === true && <>
                <div onClick={() => {
                  setpopup4(false)
                  setpractitioneremail('')
                  setpractitionername('')
                  setpractitionerpassword('')

                }
                } className='popupbg'></div>
                <div className='popup'>

                  <form onSubmit={addnewPractitioner} className='addPractitioner'>
                    <input autoComplete="none" style={{ borderRadius: '5px' }} type='name' value={practitionername} onChange={(e) => setpractitionername(e.target.value)} required placeholder='Admin Name' />
                    <input autoComplete="none" style={{ borderRadius: '5px' }} onChange={(e) => setpractitioneremail(e.target.value)} type="email" name='new' value={practitioneremail} required placeholder='Admin Email' />
                    <input autoComplete="none" style={{ borderRadius: '5px' }} onChange={(e) => setpractitionerpassword(e.target.value)} type="password" name='nedfvw' value={practitionerpassword} required placeholder='Password for Admin' />


                    <div className='bownpopupbutton' style={{ width: '85%' }}>

                      <button onClick={() => {
                        setpopup4(false)
                        setpractitioneremail('')
                        setpractitionername('')
                        setpractitionerpassword('')
                      }
                      } style={{ border: '1px solid red', color: 'black' }} >cancel</button>
                      <button style={{ backgroundColor: '#4180b7' }}>Add Admin</button>

                    </div>

                  </form>




                </div>
              </>}








              {(practitioner.length !== 0 && practitioner) && <>
                <table className='tablep'>
                  <thead className='tablephead'>
                    <tr>
                      <th>S NO.</th>
                      <th>Name</th>
                      <th>Email</th>

                      <th></th>
                    </tr>
                  </thead>
                  <tbody>

                    {practitioner.map((item, index) => (<>
                      {item._id !== "6720ceb3b4fea95641fcb985" && <>
                        <tr>
                          <td>{sno1++}</td>
                          <td>{item.name} </td>
                          <td>{item.email}</td>







                          <td className='assignbuttom' ><AiFillDelete className='hovar' style={{ width: '30px', height: '30px', color: 'red' }}
                            onClick={() => {

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

                              fetch(`${process.env.REACT_APP_API_URL}/dltadmin`, requestOptions)
                                .then(response => response.json())
                                .then(result => setpractitioner(result))
                                .catch(error => console.log('error', error));







                            }}


                          /></td>
                        </tr>
                      </>}
                    </>))}







                  </tbody>
                </table>


              </>}




              {practitioner.length === 0 && <>

                <img alt='' src='/empty.gif' width={"40%"} />
              </>}


















            </div>

          </>}



        </div>


      </div>
    </>}
  </>)
}

export default Profile