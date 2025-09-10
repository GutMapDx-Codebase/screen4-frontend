
import ReactSignatureCanvas from 'react-signature-canvas';
import { useRef, useState } from 'react';
import './refusalform.css';


const RefusalForm = () => {
  

  // Form state
  const [failReason, setFailReason] = useState("");
  const [refuseReason, setRefuseReason] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorTime, setDonorTime] = useState("");
  const [donorDate, setDonorDate] = useState("");
  const [officerName, setOfficerName] = useState("");
  const [officerTime, setOfficerTime] = useState("");
  const [officerDate, setOfficerDate] = useState("");
  const [witnessName, setWitnessName] = useState("");
  const [witnessTime, setWitnessTime] = useState("");
  const [witnessDate, setWitnessDate] = useState("");
  const [witnessRole, setWitnessRole] = useState("");

  const donorSigRef = useRef();
  const officerSigRef = useRef();
  const witnessSigRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const getSignatureData = (ref) => {
      if (!ref.current || ref.current.isEmpty()) return null;
      if (typeof ref.current.getCanvas === 'function') {
        return ref.current.getCanvas().toDataURL('image/png');
      }
      return null;
    };
    const donorSignature = getSignatureData(donorSigRef);
    const officerSignature = getSignatureData(officerSigRef);
    const witnessSignature = getSignatureData(witnessSigRef);
    const formData = {
      failReason,
      refuseReason,
      donor: {
        name: donorName,
        time: donorTime,
        date: donorDate,
        signature: donorSignature,
      },
      officer: {
        name: officerName,
        time: officerTime,
        date: officerDate,
        signature: officerSignature,
      },
      witness: {
        name: witnessName,
        time: witnessTime,
        date: witnessDate,
        role: witnessRole,
        signature: witnessSignature,
      },
    };
    console.log("Form Data:", formData);
  };

  return (
    <div className="form-container refusal-form">
      <div className="form-header">
        <div>
          <h3>Failure to Provide / Refusal to Consent to the Provision of a Sample</h3>
          <p className="form-desc">
            I understand that I have been requested by my Employer to consent to and provide an appropriate sample(s) in accordance with their Drug and Alcohol policy.
          </p>
        </div>
        <div className="logo-box">
          <img src="/Screen4.png" alt="Screen4 Logo" className="screen4-logo" />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <label className="bold-label">
            <span className="bullet-point">&bull;</span> I have failed to provide an appropriate sample of <b>breath / urine / oral fluid</b> because:
          </label>
          <div className="delete-note">(Delete if not applicable)</div>
          <textarea rows="3" className="large-textarea" value={failReason} onChange={e => setFailReason(e.target.value)} required />
        </div>
        <div className="form-section">
          <label className="bold-label">
            <span className="bullet-point">&bull;</span> I DO NOT consent to provide a sample of <b>breath / urine / oral fluid</b> because:
          </label>
          <div className="delete-note">(Delete if not applicable)</div>
          <textarea rows="3" className="large-textarea" value={refuseReason} onChange={e => setRefuseReason(e.target.value)} required />
        </div>
        <div className="table-section">
          <table className="refusal-table">
            <tbody>
              <tr>
                <th>Donors Name</th>
                <th>Time</th>
                <th>Date</th>
              </tr>
              <tr>
                <td><input type="text" value={donorName} onChange={e => setDonorName(e.target.value)} required /></td>
                <td><input type="text" value={donorTime} onChange={e => setDonorTime(e.target.value)} required /></td>
                <td><input type="text" value={donorDate} onChange={e => setDonorDate(e.target.value)} required /></td>
              </tr>
              <tr>
                <th colSpan="3">Donors Signature</th>
              </tr>
              <tr>
                <td colSpan="3">
                  <div className="signature-pad-wrap">
                    <ReactSignatureCanvas
                      ref={donorSigRef}
                      penColor="#222"
                      canvasProps={{width: 350, height: 80, className: 'signature-pad'}}
                    />
                    <button type="button" className="clear-btn" onClick={() => donorSigRef.current.clear()}>Clear</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <table className="refusal-table">
            <tbody>
              <tr>
                <th>Collection Officers Name</th>
                <th>Time</th>
                <th>Date</th>
              </tr>
              <tr>
                <td><input type="text" value={officerName} onChange={e => setOfficerName(e.target.value)} required /></td>
                <td><input type="text" value={officerTime} onChange={e => setOfficerTime(e.target.value)} required /></td>
                <td><input type="text" value={officerDate} onChange={e => setOfficerDate(e.target.value)} required /></td>
              </tr>
              <tr>
                <th colSpan="3">Collection Officers Signature</th>
              </tr>
              <tr>
                <td colSpan="3">
                  <div className="signature-pad-wrap">
                    <ReactSignatureCanvas
                      ref={officerSigRef}
                      penColor="#222"
                      canvasProps={{width: 350, height: 80, className: 'signature-pad'}}
                    />
                    <button type="button" className="clear-btn" onClick={() => officerSigRef.current.clear()}>Clear</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <table className="refusal-table">
            <tbody>
              <tr>
                <th>Witness Name</th>
                <th>Time</th>
                <th>Date</th>
              </tr>
              <tr>
                <td><input type="text" value={witnessName} onChange={e => setWitnessName(e.target.value)} required /></td>
                <td><input type="text" value={witnessTime} onChange={e => setWitnessTime(e.target.value)} required /></td>
                <td><input type="text" value={witnessDate} onChange={e => setWitnessDate(e.target.value)} required /></td>
              </tr>
              <tr>
                <th>Job Role / Position</th>
                <th colSpan="2">Witness Signature</th>
              </tr>
              <tr>
                <td><input type="text" value={witnessRole} onChange={e => setWitnessRole(e.target.value)} required /></td>
                <td colSpan="2">
                  <div className="signature-pad-wrap">
                    <ReactSignatureCanvas
                      ref={witnessSigRef}
                      penColor="#222"
                      canvasProps={{width: 350, height: 80, className: 'signature-pad'}}
                    />
                    <button type="button" className="clear-btn" onClick={() => witnessSigRef.current.clear()}>Clear</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="footer-note">
          <b>Collection Officer:</b> Please attach this form to the white copy of the Chain of Custody Form
        </div>
        <div className="footer-table-wrap">
          <table className="footer-table">
            <tbody>
              <tr>
                <td>Document:</td>
                <td>Failure / Refusal to Consent to Provision of a Sample</td>
                <td>Rev:</td>
                <td>3</td>
              </tr>
              <tr>
                <td>Doc Ref:</td>
                <td>S4C/0046/2022</td>
                <td>Date:</td>
                <td>4<sup>th</sup> October 2023</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button type="submit" className="submit-btn-green">Submit</button>
      </form>
    </div>
  );
};

export default RefusalForm;
