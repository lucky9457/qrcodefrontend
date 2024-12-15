import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import QRCode from 'react-qr-code';
import './BookformModal.css';
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

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
    const [qrBlob, setQrBlob] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setLoading(true);
        try {
            console.log('Submitting book data:', formData);
            const qrCodeValue = JSON.stringify(formData); // Generate the QR code data
            setQrCodeValue(qrCodeValue); // Update QR code state
            console.log('QR Code value set:', qrCodeValue);

            // Step 1: Retrieve the token
            const token = localStorage.getItem('token'); // Get the token from local storage
            if (!token) {
                throw new Error('Authentication token not found. Please log in.');
            }
            console.log(token);

            // Step 2: Submit the form data to the backend with the token
            const response = await axios.post('/books/add', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`, // Include the token in the Authorization header
                },
            });
            console.log('Book successfully submitted:', response.data);

            // Step 3: Generate QR code from the submitted form data



            // Step 4: Mark the form as submitted
            setSubmitted(true);
            console.log('Form submission state updated to true.');

            // Step 5: Close the modal

            console.log('Modal closed successfully.');
            setLoading(false);
        } catch (error) {
            // Handle errors gracefully
            console.error('Error submitting book data:', error.response?.data || error.message);
            setLoading(false);
        }
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


            canvas.toBlob((blob) => {
                setQrBlob(blob);
            });
            // Restore original styles
            qrCodeElement.style.cssText = originalStyle;
        });
    };


    const shareQRCode = async () => {
        const qrCodeElement = document.getElementById("qrCode");

        // Temporarily remove styles for better QR code capture
        const originalStyle = qrCodeElement.style.cssText;
        qrCodeElement.style.opacity = "1";
        qrCodeElement.style.filter = "none";

        try {
            const canvas = await html2canvas(qrCodeElement);

            // Restore original styles
            qrCodeElement.style.cssText = originalStyle;

            // Convert canvas to a blob
            canvas.toBlob(async (blob) => {
                if (!blob) {
                    console.error("Failed to create blob from QR code.");
                    return;
                }

                setQrBlob(blob);

                if (!navigator.share) {
                    alert("Sharing is not supported on this device or browser.");
                    return;
                }

                const file = new File([blob], "QRCode.png", { type: "image/png" });

                try {
                    await navigator.share({
                        files: [file],
                        title: "QR Code",
                        text: "Here is the QR code for the book details.",
                    });
                    console.log("QR Code shared successfully!");
                } catch (shareError) {
                    console.error("Error sharing QR Code:", shareError);
                }
            });
        } catch (error) {
            console.error("Error generating QR Code:", error);
        }
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
                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? <ClipLoader color="#fff" size={20} /> : "Submit"}
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
                        <div className="actions">
                            <button className="download-btn" onClick={downloadQRCode}>
                                Download QR
                            </button>
                            <button className="download-btn share-btn" onClick={shareQRCode}>
                                Share QR
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookformModal;
