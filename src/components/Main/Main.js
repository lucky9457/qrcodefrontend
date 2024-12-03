import React, { useState } from "react";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import "./Main.css";
import Navbar from "../Navbar/Navbar";
import bac2 from "../../assets/bac2.mp4";

const QRCodeGenerator = () => {
    const [activeTab, setActiveTab] = useState("dynamicColumns");
    const [dynamicColumns, setDynamicColumns] = useState([{ name: "Column 1", value: "", type: "text" }]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newColumnType, setNewColumnType] = useState("text");
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
    const handleDynamicChange = (index, field, value) => {
        const updatedColumns = [...dynamicColumns];
        updatedColumns[index][field] = value;
        setDynamicColumns(updatedColumns);
    };

    const addNewColumn = () => {
        setDynamicColumns([...dynamicColumns, { name: `Column ${dynamicColumns.length + 1}`, value: "", type: newColumnType }]);
        setIsModalOpen(false);
        setNewColumnType("text"); // Reset the type to default
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
                : activeTab === "textMessage"
                    ? textMessage
                    : JSON.stringify(dynamicColumns, null, 2);


    return (
        <>
            <video className="vid" autoPlay loop muted>
                <source src={bac2} type="video/mp4" />
            </video>
            <Navbar />
            <div className="main2">
                <div className="tabs">
                    <div
                        className={`tab ${activeTab === "dynamicColumns" ? "active" : ""}`}
                        onClick={() => {
                            setActiveTab("dynamicColumns");
                            setSubmitted(false);
                        }}
                    >
                        Dynamic Columns
                    </div>

                    <div
                        className={`tab ${activeTab === "bookForm" ? "active" : ""}`}
                        onClick={() => {
                            setActiveTab("bookForm");
                            setSubmitted(false);
                        }}
                    >
                        Book Form
                    </div>
                    <div
                        className={`tab ${activeTab === "url" ? "active" : ""}`}
                        onClick={() => {
                            setActiveTab("url");
                            setSubmitted(false);
                        }}
                    >
                        URL
                    </div>
                    <div
                        className={`tab ${activeTab === "textMessage" ? "active" : ""}`}
                        onClick={() => {
                            setSubmitted(false);
                            setActiveTab("textMessage");
                        }}
                    >
                        Text Message
                    </div>
                </div>

                <div className="app-container">


                    <div className="form-container">
                        <div className={`tab-content ${activeTab === "dynamicColumns" ? "active" : ""}`}>
                            <h1>Dynamic Columns</h1>
                            <form onSubmit={handleSubmit}>


                                {dynamicColumns.map((col, index) => (
                                    <div key={index} className="form-group-dyn form-group">

                                        <input
                                            type="text"
                                            value={col.name}
                                            onChange={(e) => handleDynamicChange(index, "name", e.target.value)}
                                            placeholder="Enter column name"
                                            className="inputdynamiccol"
                                        />
                                        <input
                                            type={col.type}
                                            value={col.value}
                                            onChange={(e) => handleDynamicChange(index, "value", e.target.value)}
                                            placeholder={`Enter ${col.type} value`}
                                            className="inputdynamicval"
                                        />
                                    </div>

                                ))}
                                <button
                                    type="button"
                                    className="submit-btn"
                                    onClick={() => {
                                        setIsModalOpen(true);

                                    }
                                    }
                                >
                                    Add Column
                                </button>
                                <button type="submit" className="dynamicsbn submit-btn">
                                    Submit
                                </button>
                            </form>
                        </div>
                        {isModalOpen && (
                            <div className={`modal ${isModalOpen ? "active" : ""}`}>
                                <div className="modal-content">
                                    <h2>Select Column Type</h2>
                                    <select value={newColumnType} onChange={(e) => setNewColumnType(e.target.value)}>
                                        <option value="text">Text</option>
                                        <option value="number">Number</option>
                                        <option value="url">URL</option>
                                        <option value="email">Email</option>
                                        <option value="date">Date</option>
                                        <option value="datetime-local">Date & Time</option>
                                        <option value="month">Month</option>
                                        <option value="week">Week</option>
                                        <option value="time">Time</option>
                                        <option value="password">Password</option>
                                        <option value="tel">Telephone</option>
                                        <option value="color">Color</option>
                                        <option value="range">Range</option>
                                        <option value="checkbox">Checkbox</option>
                                        <option value="radio">Radio</option>
                                        <option value="file">File</option>
                                        <option value="hidden">Hidden</option> </select>
                                    <div>

                                        <button onClick={addNewColumn} className="modal-btn">
                                            Add
                                        </button>
                                        <button onClick={() => setIsModalOpen(false)} className="modal-btn">
                                            Cancel
                                        </button> </div>
                                </div>
                            </div>
                        )}

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
            </div >
        </>
    );
};

export default QRCodeGenerator;
