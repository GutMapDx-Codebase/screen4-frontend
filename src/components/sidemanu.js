import React, { useState } from 'react'

import { MdDataExploration, MdLabel, MdMedicalInformation, MdOutlineAnalytics, MdOutlineAppRegistration, MdOutlineQueryStats, MdOutlineSpaceDashboard, MdOutlineWeb } from "react-icons/md"
import { FaBowlFood, FaClipboardQuestion, FaKitMedical } from "react-icons/fa6"
import { HiOutlineUsers, HiUserGroup } from 'react-icons/hi2'
import { HiOutlineDocumentReport } from "react-icons/hi"
import { CgProfile, CgReorder } from "react-icons/cg"
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import { GiDna1, GiDna2, GiInsectJaws, GiLiver } from 'react-icons/gi'
import { FcBiomass } from "react-icons/fc";
import { FaMapMarkedAlt, FaMicroscope, FaShippingFast, FaShoppingCart } from 'react-icons/fa'
import { BiHelpCircle } from 'react-icons/bi'
import { IoTicketSharp } from 'react-icons/io5'
import { BsCalendar2EventFill } from 'react-icons/bs'
import { SiGoogleadsense } from 'react-icons/si'

function Sidemanu() {
    const loginemail = Cookies.get("email")
    const loginname = Cookies.get("Name")
    const id = Cookies.get("id")
    const token = Cookies.get("Token")

    const [manukonssa, setmanukonssa] = useState("0")
    const navigate = useNavigate()
    return (
        <div className='mainsidemanu' >

            <h3 onClick={() => navigate("/dashboard")}><MdOutlineSpaceDashboard style={{ width: '21px', height: '21px' }} /> Dashboard</h3>


            {/* <h3 onClick={() => navigate("/dashboard/kit")}><MdMedicalInformation style={{ width: '21px', height: '21px' }} />All Kits</h3> */}
            {/* <h3 onClick={() => navigate("/dashboard/fs/kit")}><MdMedicalInformation style={{ width: '21px', height: '21px' }} />All Kits</h3> */}

            {/* {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>   <h3 onClick={() => navigate("/dashboard/practitioner")}><HiOutlineUsers style={{ width: '21px', height: '21px' }} />All Practitioners</h3></>}
            {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>   <h3 onClick={() => navigate("/dashboard/patient")}><HiOutlineUsers style={{ width: '21px', height: '21px' }} />All Patients</h3></>} */}
            {/* <h3 onClick={() =>{ setmanukonssa("1"); navigate("/dashboard/fs/report");}}><HiOutlineDocumentReport style={{ width: '15px', height: '15px' }} />Reports</h3> */}
            {/* {manukonssa === "1" && <>   <ul> */}
                {/* <li onClick={() => navigate("/dashboard/fs/kit")}><FaKitMedical style={{ width: '15px', height: '15px' }} />Kit </li>
                {token === "dskgfsdgfkgsdfkjg35464154845674987dsf@53" && <>   <li onClick={() => navigate("/dashboard/fs/practitioner")}><HiUserGroup style={{ width: '15px', height: '15px' }} />Practitioners </li></>} */}
                {/* <li onClick={() => }>Reports </li> */}
            {/* </ul> */}
            {/* </>} */}
            <h3 onClick={() => navigate("/dashboard/profile")}><CgProfile style={{ width: '21px', height: '21px' }} />Profile</h3>

        </div >
    )
}

export default Sidemanu