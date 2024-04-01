import './Searchbar.css'
import React, { useState, useEffect, useRef } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import { useLocation } from 'react-router-dom';

import { Link, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../constants';
// import { on } from 'events';


const serverUrl=BACKEND_URL;
function Searchbar({defaultFocus = false, onClose = () => {}}) {
    const [isFocus, setFocus] = useState(defaultFocus);
    const [isData, setData] = useState(null);
    const [isClick, setClick] = useState(null);
    const [Search, setSearch] = useState('');
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);
    const location = useLocation();

    const genres = ["Comedy", "Drama", "Music", "Romance", "Thriller", "Sport", "History"];
    const colors = ["#FF6633", "#FFB399", "#FF33FF", "#FFFF99", "#00B3E6", "#E6B333", "#3366E6"];

    const getColor = (index) => colors[index % colors.length];

    const handleGenreClick = (genre) => {
        if (!selectedGenres.includes(genre)) {
        setSelectedGenres([...selectedGenres, genre]);
        }
    };


    const navigate = useNavigate();

    const handleFocus = () => {
        setFocus(true);
        fetchData(Search);
    };

    const handleBlur = () => {
        setFocus(false);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            // console.log('check')
            handleResult();
            onClose();
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (defaultFocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [defaultFocus]);


    const fetchData = async (value) => {
        try {
            console.log("userInput--> ",value)
            if (value?.length > 0) {
        // const response = await fetch(`${serverUrl}/search/${value}`,
        //     selectedGenres
        //   );
        const response = await fetch(`https://ap-south-1.aws.data.mongodb-api.com/app/application-0-biplo/endpoint/searchMovie?arg=${value}`)
        const data = await response.json();
        console.log("data-->",data)
        setData(data);
        setClick(data[0]);}
        } catch (error) {
        console.error("Error fetching data:", error);
        }
    };

    const handleChange = (event) => {
        const { value } = event.target;
        setSearch(value);
        fetchData(value);
    };

    const handleClick = (id) => {
        setClick(id);
    };

    const handleResult = () => {
        // Redirect to result page and pass the data as state
        setFocus(false);
        navigate('/Result', { state: { data: isData, query: Search }, replace: true });
    };

    const handleImageError = (event) => {
        event.target.src = 'https://via.placeholder.com/150';
    }

    const displayTitleWithDots = inputString => {
        const words = inputString.split(' ');
        return words.length > 5 ? words.slice(0, 5).join(' ') + '...' : inputString;
    };

    const handleDropDown = () => {
        setDropdownOpen(!isDropdownOpen);
        setFocus(true);
    };

    useEffect(() => {
        function handleClickOutside(event) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup the event listener on unmount
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={`search-bar-layer ${isFocus ? 'zhigh' : ''}`}>

            <div onClick={(e)=>e.stopPropagation()} className={`search-bar-container ${isFocus ? 'open' : ''}`}>
                <div className={`search-bar-top ${isFocus ? 'open' : ''}`}>
                <input
                    id='myInput'
                    className={`searchbar2 ${isFocus ? 'open' : ''}`}
                    type="text"
                    placeholder="Search"
                    onFocus={handleFocus}
                    onKeyPress={handleKeyPress}
                    onChange={handleChange}
                    autoComplete='off'
                    ref={inputRef}
                />
                <div className={`search-genre-filter-dropdown ${isFocus ? 'zhigh' : ''}`} ref={dropdownRef} onClick={handleDropDown}>
                    {isDropdownOpen ? <CloseIcon fontSize='large' /> : <FilterListIcon fontSize='large' />}
                    {isDropdownOpen && (
                    <div className={`dropdown-content`}>
                        <ul>
                        {genres.map((genre, index) => (
                            <li key={index} onClick={() => handleGenreClick(genre)}>{genre}</li>
                        ))}
                        </ul>
                    </div>
                    )}
                </div>
                </div>
                <div className={`search-bar-genre-list ${isFocus ? 'zhigh' : ''}`}>
                    {selectedGenres.length > 0 && <div onClick={() => setSelectedGenres([])} style={{borderColor: "red", backgroundColor: "#FF000080", cursor:"pointer"}} className="genre-tag">
                    <CloseIcon style={{backgroundColor: "red"}} className='genre-remove-close' fontSize='small'  />
                    Clear All
                    </div>}

                {selectedGenres.map((genre, index) => (
                    <div style={{borderColor: getColor(index)}} className="genre-tag" key={index}>
                    <CloseIcon style={{backgroundColor: getColor(index)}} className='genre-remove-close' fontSize='small' onClick={() => setSelectedGenres(selectedGenres.filter((g) => g !== genre))} />
                    {genre}
                    </div>
                ))}
                </div>

                {(isData && isFocus && Search) && (
                <div className={`flex ${Search.length > 0 ? 'a' : ''}`}>
                    <div className='popupresults'>
                    {Array.isArray(isData) && isData.map((result, index) => (
                        <Link onClick={() => {
                            handleBlur();
                            onClose();
                        }} key={index} to={`/player/${result._id}`}>
                        <div className={`search-results`} key={result._id} onMouseEnter={() => handleClick(result)}>
                            <div className={`Search-resultafterclick ${result._id == isClick._id ? 'selectedResultBg' : ''}`}>
                                <div className="imgsinsearchresult">
                                <img onError={handleImageError} src={`${result.poster}`} alt={result.title} />
                                </div>
                                <div className="dataofsearchresult">
                                <div>
                                    <h2>{`${result.title}`}</h2>
                                </div>
                                <div className="extradataofsearchresult">
                                    <div className="info1ofsearchresult">
                                    {`${result.genres?.toString().replace(/,/g, ', ')}`} | {`${result.year}`}
                                    </div>
                                    <div className='info2ofsearchresult'>{`${result.imdb.rating} IMDb`}</div>
                                </div>
                                <div style={{backgroundColor: `${
                                    result.subscriptionType === 'Free' ? '#006400' :
                                    result.subscriptionType === 'Premium' ? '#371F76' : '#880000'
                                }`}} className="subscription-type-searchresult">
                                    {`${result.subscriptionType}`}
                                </div>
                                </div>
                            </div>
                        </div>
                        </Link>
                    ))}
                    </div>
                    {isClick &&
                    <div className="Extradetailsofresult">
                        <div className='boxoneofextra'>
                        <div className='detailsofextra'>
                            <div className='box1ofextradetails'>
                            <h2>
                                {typeof isClick.title === 'string' && displayTitleWithDots(isClick.title)}
                            </h2>
                            </div>
                            <div className="box23ofextradetails">
                            <div className='box2ofextradetails'>
                                {`${isClick.genres?.toString().replace(/,/g, ', ')}`} | {`${isClick.year}`}
                            </div>
                            <div className='box3ofextradetails'>
                                {`${isClick.imdb.rating} IMDb`} | {`${isClick.rated ?? 'U'}`}
                            </div>
                            </div>
                            <div className='box4ofextradetails'>
                            <span>Cast: </span>{`${isClick.cast?.toString().replace(/,/g, ', ')}`}
                            </div>
                        </div>
                        <div className='imgdetailsofextra'>
                            <img onError={handleImageError} id='img123' src={`${isClick.poster}`} alt={isClick.title} />
                        </div>
                        </div>
                        <div className="boxtwoofextra">
                        {typeof isClick.fullplot === 'string' && `${isClick.fullplot.substring(0, 150)}...`}
                        </div>
                    </div>}
                </div>
                )}
            </div>

            {isFocus && <div className="search-bar-mask" onClick={() => {
                handleBlur();
                onClose();
            }}></div>}
    </div>
    )

}

export default Searchbar;