import React, { useState, useEffect } from 'react'
import bac2 from "../../assets/bac2.mp4";
import qrCode from '../../assets/QRCode.png';
import Navbar from '../Navbar/Navbar';
import "./Home.css"
import ClipLoader from 'react-spinners/ClipLoader';
import BookformModal from '../BookformModal/BookformModal';
import BookDetailsModal from '../BookDetailModal/BookDetailModal';
import axios from "axios";

const leftmenu = ["bussiness", "books", "institute"]
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
    author: "lucky",
    publisher: "radiant",
    exam: "bsc",
    subject: "python",
    description: "python is a well designed course",
    price: "200",
    language: "englsh",
    isbn: "vjashjg,hKWJ",
    publicationDate: "25/10/2000",
}]
const Home = () => {
    const [activetab, setactivetab] = useState('bussiness')
    const [openmodal, setopenmodel] = useState(false)
    const [selectedBook, setSelectedBook] = useState(null);
    const [listofbooks, setListofbooks] = useState([])
    const [sortBy, setSortBy] = useState('addedDate');
    const [order, setOrder] = useState('asc');
    const [loading, setLoading] = useState(false);
    const handlemenuclick = (tab) => {
        setactivetab(tab)
    }
    const handleAddbook = () => {
        setopenmodel(true)
    }
    const handleCloseModal = () => {
        setopenmodel(false)
        fetchBooks()
    }
    const handlebookclose = () => {
        setSelectedBook(null);
    }
    const handleViewDetails = (book) => {
        setSelectedBook(book); // Set the selected book
    };

    const fetchBooks = async () => {
        setLoading(true); // Start loading spinner
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Authentication token not found. Please log in.');
        }

        try {
            const { data } = await axios.get("/books/", {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`,
                },
            });
            setListofbooks(data);
        } catch (error) {
            console.error("Error fetching books:", error);
        } finally {
            setLoading(false); // Stop loading spinner
        }
    };


    const handleSort = async () => {
        setLoading(true); // Start loading spinner
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Authentication token not found. Please log in.');
        }

        try {
            const { data } = await axios.get(`/books/sort?sortBy=${sortBy}&order=${order}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`,
                },
            });
            setListofbooks(data);
        } catch (error) {
            console.error("Error sorting books:", error);
        } finally {
            setLoading(false); // Stop loading spinner
        }
    };

    useEffect(() => {
        fetchBooks();
    }, [])

    return (
        <div>
            <video className="vid" autoPlay loop muted>
                <source src={bac2} type="video/mp4" />
            </video>
            <Navbar />
            <div className="homecontainer">
                <div className='leftmenu'>
                    <div className='overlayleftmenu'>
                        <ul className='menutabs'>
                            {leftmenu.map((tab) => {
                                return <li onClick={() => handlemenuclick(tab)} className={`eachtab ${tab == activetab ? "tabactive" : ""}`}>
                                    <button className='menubtn'>
                                        {tab}
                                    </button>

                                </li>
                            })}
                        </ul>
                    </div>

                </div>
                <div className='bodylist'>
                    <div className='overlaybody'>
                        <div className='add-con'>
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

                            <button onClick={handleAddbook}>
                                Add book
                            </button>

                        </div>

                        <div className='bookslistcon'>
                            {loading ? ( // Show spinner while loading
                                <div className="spinner-container">
                                    <ClipLoader color="#36d7b7" size={50} />
                                </div>
                            ) : (
                                <ul>
                                    {listofbooks.map((each) => (
                                        <li className='listitemcon'>
                                            <div className='qrimagecon'>
                                                <img src={each.qrCode} alt="qr" className='qrimage' />

                                            </div>
                                            <div className='contentbook'>
                                                <h1>Title: {each.title}</h1>
                                                <p className='bookdesc'>description: {each.description}</p>
                                                <div>
                                                    <p className='publisherbook'>Author: {each.author}</p>
                                                    <p className='publisherbook'> publisher: {each.publisher}</p>
                                                    <div className='viewdetailsandprice'>
                                                        <p className='price'>Price:  <span className='pricespan'>
                                                            {each.price}</span></p>
                                                        <button
                                                            className='viewdetailsbtn'
                                                            onClick={() => handleViewDetails(each)}
                                                        >View Details</button>
                                                    </div>


                                                </div>
                                            </div>

                                        </li>
                                    ))}

                                </ul>)}

                        </div>

                    </div>

                </div>

            </div>
            {openmodal && <BookformModal handleClose={handleCloseModal} />}
            {selectedBook && (
                <BookDetailsModal book={selectedBook} handleClose={handlebookclose} />
            )}

        </div>
    )
}

export default Home
