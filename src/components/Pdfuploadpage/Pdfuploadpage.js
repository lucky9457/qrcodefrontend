import React, { useState } from 'react'
import "./Pdfuploadpage.css"
import qrCode from '../../assets/QRCode.png';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { QRCodeCanvas } from 'qrcode.react';

const list = [{
    title: "think python",
    author: "lucky",
    publisher: "radiant",
    exam: "bsc",
    subject: "python",
    description: "python  is a well designed course fkuagdSJKVAKFDHKsjaskjdlhSASVHDBsnashvdjAVHSDKNAVSHCKBJDKNSVAHCSBJ,KNASHCANSCASBX,AN ACSMBX,AMNB ACSNXB ACSMNXAASHVCBXN",
    price: "200",
    language: "englsh",
    isbn: "vjashjg,hKWJ",
    publicationDate: "25/10/2000",
}, {
    title: "think python",
    author: "lucky",
    publisher: "radiant",
    exam: "bsc",
    subject: "python",
    description: "python is a well designed course",
    price: "200",
    language: "englsh",
    isbn: "vjashjg,hKWJ",
    publicationDate: "25/10/2000",
}, {
    title: "think python",
    author: "lucky",
    publisher: "radiant",
    exam: "bsc",
    subject: "python",
    description: "python is a well designed course",
    price: "200",
    language: "englsh",
    isbn: "vjashjg,hKWJ",
    publicationDate: "25/10/2000",
}, {
    title: "think python",
    author: "lucky",
    publisher: "radiant",
    exam: "bsc",
    subject: "python",
    description: "python is a well designed course",
    price: "200",
    language: "englsh",
    isbn: "vjashjg,hKWJ",
    publicationDate: "25/10/2000",
}, {
    title: "think python",
    author: "lucky",
    publisher: "radiant",
    exam: "bsc",
    subject: "python",
    description: "python is a well designed course",
    price: "200",
    language: "englsh",
    isbn: "vjashjg,hKWJ",
    publicationDate: "25/10/2000",
}, {
    title: "think python",
    author: "lucky",
    publisher: "radiant",
    exam: "bsc",
    subject: "python",
    description: "python is a well designed course",
    price: "200",
    language: "englsh",
    isbn: "vjashjg,hKWJ",
    publicationDate: "25/10/2000",
}, {
    title: "think python",



}]


const Pdfuploadpage = () => {
    const { order, setOrder } = useState("asc")
    const { sortBy, setSortBy } = useState("title")
    const [uploadedFile, setUploadedFile] = useState(null);
    const [qrValue, setQrValue] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const handleSort = () => {
        console.log("sort")
    }

    const handleaddpdf = () => {
        console.log("clickedaddpdf")
    }
    const handleAddFileClick = () => {
        setShowPopup(true);
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedFile(file);
            setQrValue(`Uploaded File: ${file.name}`); // Simple QR Code value
        }
    };
    const closePopup = () => {
        setShowPopup(false);
        setUploadedFile(null);
        setQrValue("");
    };

    return (
        <div className='pdfuploadContainer'>
            <div className='pdfuploadoverlay'>

                <div className='pdfAddcontainer'>
                    <div className='sortcon'>
                        <select className='titleselect' value={sortBy} onChange={(e) => { setSortBy(e.target.value); }}>
                            <option value="addedDate">Date</option>
                            <option value="title">Title</option>
                        </select>
                        <select value={order} onChange={(e) => { setOrder(e.target.value); }}>
                            <option value="asc">asc</option>
                            <option value="desc">desc</option>
                        </select>
                        <button className='sortbtn' onClick={handleSort}>
                            Sort
                        </button>
                    </div>

                    <button onClick={handleAddFileClick}>
                        Add file
                    </button>


                </div>
                <div className='pdfsListContainer'>
                    {list.map((item) => (
                        <div className='listItem'>
                            <div className='qr_imagecontainer'>
                                <img src={qrCode} alt="qr" className='qrimage' />
                            </div>
                            <div className='pdfitemContent'>
                                <div className='contentpdf'>
                                    <h2>
                                        <strong>title: </strong>{item.title}
                                    </h2>
                                    <p>Published Date: {item.publicationDate}</p>
                                </div>
                                <div className='actionbuttons'>

                                    <button
                                        className='editbtn'

                                    >
                                        <FaEdit /> Edit
                                    </button>
                                    <button
                                        className='deletebtn'

                                    >
                                        <FaTrash /> Delete
                                    </button>

                                </div>


                            </div>



                        </div>


                    ))}



                </div>

            </div>
            {/* Popup Modal */}
            {showPopup && (
                <div className='popupOverlay'>
                    <div className='popupContent'>
                        <h2>Upload PDF File</h2>
                        <input type="file" accept="application/pdf" onChange={handleFileChange} />
                        {uploadedFile && (
                            <div className='qrContainer'>
                                <p><strong>File Uploaded:</strong> {uploadedFile.name}</p>
                                <QRCodeCanvas value={qrValue} size={150} />
                            </div>
                        )}
                        <button onClick={closePopup} className='closeBtn'>Close</button>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Pdfuploadpage
