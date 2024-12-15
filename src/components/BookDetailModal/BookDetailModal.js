/*bookdetailsmodal.js**/
import React from "react";
import "./BookDetailModal.css";
import qr from "../../assets/QRCode.png"

const BookDetailsModal = ({ book, handleClose }) => {
    if (!book) return null;

    return (
        <div className="book-details-popup">
            <div className="popup-overlay" onClick={handleClose}></div>
            <div className="popup-content">
                <div className="contentbookdetails">
                    <button className="popup-close-btn" onClick={handleClose}>
                        &times;
                    </button>
                    <h1 className="popup-title">{book.title}</h1>
                    <p><strong>Author:</strong> {book.author}</p>
                    <p><strong>Publisher:</strong> {book.publisher}</p>
                    <p><strong>Price:</strong> Rs. {book.price}</p>
                    <p><strong>Language:</strong> {book.language}</p>
                    <p><strong>ISBN:</strong> {book.isbn}</p>
                    <p><strong>Publication Date:</strong> {book.publicationDate}</p>
                    <p><strong>Added Date:</strong>{book.addedDate}</p>
                    <p className="descdetails"><strong>Description:</strong> {book.description}</p>


                </div>
                <div className="qrimagecontainer">
                    <img className="imageqr" src={book.qrCode} alt="qr" />
                </div>
            </div>
        </div>
    );
};

export default BookDetailsModal;
