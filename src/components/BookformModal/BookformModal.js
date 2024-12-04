import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import QRCode from 'react-qr-code';
import './BookformModal.css';


const BookformModal = ({ handleClose }) => {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        publisher: "",
        exam: "",
        subject: "",
        description: "",
        price: "",
        language: "",
        isbn: "",
        publicationDate: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [qrCodeValue, setQrCodeValue] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Close modal after submission
        setQrCodeValue(JSON.stringify(formData)); // Generate QR code from form data
        setSubmitted(true);
    };
    const downloadQRCode = () => {
        const qrCodeElement = document.getElementById("qrCode");

        // Temporarily remove styles for better QR code capture
        const originalStyle = qrCodeElement.style.cssText;
        qrCodeElement.style.opacity = "1";
        qrCodeElement.style.filter = "none";

        html2canvas(qrCodeElement).then((canvas) => {
            const link = document.createElement("a");
            link.download = "QRCode.png";
            link.href = canvas.toDataURL();
            link.click();

            // Restore original styles
            qrCodeElement.style.cssText = originalStyle;
        });
    };




    return (
        <div className="modalbookform">

            <div className="app-container">
                <button className="close-btn" onClick={handleClose}>
                    &times;
                </button>

                <div className="modal-content">


                    <h1>Book Details Form</h1>
                    <form onSubmit={handleSubmit}>
                        {Object.keys(formData).map((key) => (
                            <div className="form-group" key={key}>
                                <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                                <input
                                    type={
                                        key === "price"
                                            ? "number"
                                            : key === "publicationDate"
                                                ? "date"
                                                : "text"
                                    }
                                    name={key}
                                    value={formData[key]}
                                    onChange={handleChange}
                                    placeholder={`Enter ${key}`}
                                    required
                                />
                            </div>
                        ))}
                        <button type="submit" className="submit-btn">
                            Submit
                        </button>
                    </form>
                </div>

                <div className="qr-container">


                    <h2>Generated QR Code</h2>

                    <div
                        id="qrCode"
                        style={{
                            opacity: submitted ? 1 : 0.2,
                            filter: submitted ? "none" : "blur(5px)",
                            transition: "opacity 0.5s, filter 0.5s",
                            background: "white",
                            padding: "10px",
                        }}
                    >
                        <QRCode value={qrCodeValue} size={200} />
                    </div>
                    {submitted && (
                        <button className="download-btn" onClick={downloadQRCode}>
                            Download QR
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookformModal;
