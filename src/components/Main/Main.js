import React, { useState } from "react";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import "./Main.css";
import Navbar from "../Navbar/Navbar";
import bac2 from "../../assets/bac2.mp4";

const QRCodeGenerator = () => {
    const [activeTab, setActiveTab] = useState("bookForm");
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
    const [url, setUrl] = useState("");
    const [textMessage, setTextMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        // Reset the form based on the active tab
        if (activeTab === "bookForm") {
            setFormData({
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
        } else if (activeTab === "url") {
            setUrl("");
        } else if (activeTab === "textMessage") {
            setTextMessage("");
        }
    };

    const downloadQRCode = () => {
        const qrCodeElement = document.getElementById("qrCode");
        html2canvas(qrCodeElement).then((canvas) => {
            const link = document.createElement("a");
            link.download = "QRCode.png";
            link.href = canvas.toDataURL();
            link.click();
        });
    };

    const qrCodeValue =
        activeTab === "bookForm"
            ? JSON.stringify(formData, null, 2)
            : activeTab === "url"
                ? url
                : textMessage;

    return (
        <>
            <video className="vid" autoPlay loop muted>
                <source src={bac2} type="video/mp4" />
            </video>
            <Navbar />
            <div className="main2">
                <div className="tabs">
                    <div
                        className={`tab ${activeTab === "bookForm" ? "active" : ""}`}
                        onClick={() => setActiveTab("bookForm")}
                    >
                        Book Form
                    </div>
                    <div
                        className={`tab ${activeTab === "url" ? "active" : ""}`}
                        onClick={() => setActiveTab("url")}
                    >
                        URL
                    </div>
                    <div
                        className={`tab ${activeTab === "textMessage" ? "active" : ""}`}
                        onClick={() => setActiveTab("textMessage")}
                    >
                        Text Message
                    </div>
                </div>

                <div className="app-container">


                    <div className="form-container">
                        <div className={`tab-content ${activeTab === "bookForm" ? "active" : ""}`}>
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

                        <div className={`tab-content ${activeTab === "url" ? "active" : ""}`}>
                            <h1>Enter URL</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>URL</label>
                                    <input
                                        type="url"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        placeholder="Enter a valid URL"
                                        required
                                    />
                                </div>
                                <button type="submit" className="submit-btn">
                                    Submit
                                </button>
                            </form>
                        </div>

                        <div className={`tab-content ${activeTab === "textMessage" ? "active" : ""}`}>
                            <h1>Enter Text Message</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group msgform">
                                    <label>Message</label>
                                    <textarea
                                        value={textMessage}
                                        onChange={(e) => setTextMessage(e.target.value)}
                                        placeholder="Enter your message"
                                        required
                                        style={{ width: "100%", height: "100px" }}
                                    />
                                </div>
                                <button type="submit" className="msgsub submit-btn">
                                    Submit
                                </button>
                            </form>
                        </div>
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
        </>
    );
};

export default QRCodeGenerator;
