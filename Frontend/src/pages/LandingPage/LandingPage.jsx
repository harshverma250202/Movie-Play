import React, { useState, useEffect, useRef } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import './landingpage.css';

import Searchbar from '../../components/Searchbar/Searchbar';

import { Link, useNavigate } from 'react-router-dom';
import { color } from '@mui/system';
import axios from 'axios';
// import { set } from 'immer/dist/internal';


function Landingpage() {
  // const [isFocus, setFocus] = useState(false);
  // const [isData, setData] = useState(null);
  // const [isClick, setClick] = useState(null);
  // const [Search, setSearch] = useState('');
  // const [isDropdownOpen, setDropdownOpen] = useState(false);
  // const [selectedGenres, setSelectedGenres] = useState([]);
  // const dropdownRef = useRef(null);

  // const genres = ["Comedy", "Drama", "Music", "Romance", "Thriller", "Sport", "History"];
  // const colors = ["#FF6633", "#FFB399", "#FF33FF", "#FFFF99", "#00B3E6", "#E6B333", "#3366E6"];

  // const getColor = (index) => colors[index % colors.length];

  // const handleGenreClick = (genre) => {
  //   if (!selectedGenres.includes(genre)) {
  //     setSelectedGenres([...selectedGenres, genre]);
  //   }
  // };


  // const navigate = useNavigate();

  // const handleFocus = () => {
  //   setFocus(true);
  //   fetchData(Search);
  // };

  // const handleBlur = () => {
  //   setFocus(false);
  // };

  // const handleKeyPress = (event) => {
  //   if (event.key === 'Enter') {
  //     handleResult();
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async (value) => {
  //   try {
  //     const response = await axios.get(`${serverUrl}/search/${value}`,{
  //       selectedGenres
  //     });
  //     const data = await response.json();
  //     setData(data);
  //     if (value?.length > 0) setClick(data[0]);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // const handleChange = (event) => {
  //   const { value } = event.target;
  //   setSearch(value);
  //   fetchData(value);
  // };

  // const handleClick = (id) => {
  //   setClick(id);
  // };

  // const handleResult = () => {
  //   // Redirect to result page and pass the data as state
  //   navigate('/Result', { state: { data: isData, query: Search } });
  // };

  // const handleImageError = (event) => {
  //   event.target.src = 'https://via.placeholder.com/150';
  // }

  // const displayTitleWithDots = inputString => {
  //   const words = inputString.split(' ');
  //   return words.length > 5 ? words.slice(0, 5).join(' ') + '...' : inputString;
  // };

  // const handleDropDown = () => {
  //   setDropdownOpen(!isDropdownOpen);
  // };

  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setDropdownOpen(false);
  //     }
  //   }

  //   // Bind the event listener
  //   document.addEventListener("mousedown", handleClickOutside);
    
  //   // Cleanup the event listener on unmount
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <div className={`landingpage`} >

      <Searchbar />

      <div className={`Textonlandingpage`} >
        "<span>Search</span>, Explore and Enjoy"
      </div>

    </div>
  );
}

export default Landingpage;
