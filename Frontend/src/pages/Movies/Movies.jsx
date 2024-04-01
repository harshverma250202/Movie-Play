import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../SearchResults/SearchResultsList.css';
import './Movies.css'
import { BACKEND_URL } from '../../constants';
import Loader from '../Layouts/Loader';

const Movies = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [array1, setArray1] = useState([]);
    const [array2, setArray2] = useState([]);
    const [array3, setArray3] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/movies?limit=30`);
            const data1 = await response.json();
            setData(data1);
            setLoading(false); // Set loading to false after data is fetched
            splitData(data1);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const splitData = (data) => {
        const shuffledData = shuffleArray([...data]);
        const chunkSize = Math.ceil(shuffledData.length / 3);
        setArray1(shuffledData.slice(0, chunkSize));
        setArray2(shuffledData.slice(chunkSize, 2 * chunkSize));
        setArray3(shuffledData.slice(2 * chunkSize));
    };

    const handleImageError = (event) => {
        event.target.src = 'https://via.placeholder.com/150';
    };

    return (
        <div className="results-container">
            {loading ? (
                <Loader></Loader>
            ) : (
                <>



<p><div style={{
    // color: 'red',

    width: '146px',
    // height: '72px',
    // position: 'absolute',
    // top: '171px',
    left: '112px',
    // opacity: '0'
}}>Trending Now</div></p>

<div className="hr-wrapper">
        <hr className='stylish-line' />
    </div>
<br />


                    <div className="results-list">
                        {array1.map((result) => (
                            <div className='results-element' key={result._id}>
                            <Link to={`/player/${result._id}`}>
                              <div style={{backgroundColor: `${
                                result.subscriptionType === 'Free' ? '#006400' :
                                result.subscriptionType === 'Premium' ? '#371F76' : '#880000'
                              }`}} className='results-sub-type'>
                                  {`${result.subscriptionType}`}
                              </div>
                              <img onError={handleImageError} className='results-poster' src={`${result.poster}`} alt={result.title} />
                            </Link>
                
                          </div>
                        ))}
                    </div>

<p><div style={{
    // color: 'red',
    width: '146px',
    // height: '72px',
    // position: 'absolute',
    // top: '171px',
    left: '112px',
    // opacity: '0'
}}>New Releases</div></p>

<div className="hr-wrapper">
        <hr className='stylish-line' />
    </div>
<br />



                    <div className="results-list">

                        {array3.map((result) => (
                            <div className='results-element' key={result._id}>
                            <Link to={`/player/${result._id}`}>
                              <div style={{backgroundColor: `${
                                result.subscriptionType === 'Free' ? '#006400' :
                                result.subscriptionType === 'Premium' ? '#371F76' : '#880000'
                              }`}} className='results-sub-type'>
                                  {`${result.subscriptionType}`}
                              </div>
                              <img onError={handleImageError} className='results-poster' src={`${result.poster}`} alt={result.title} />
                            </Link>
                
                          </div>
                        ))}
                    </div>


<p><div style={{

    width: '146px',
    // height: '72px',
    // position: 'absolute',
    // top: '171px',
    left: '112px',
    // opacity: '0'
}}>Top Rated</div></p>

<div className="hr-wrapper">
        <hr className='stylish-line' />
    </div>
                    <br />


                    <div className="results-list">
                    {array2.map((result) => (
                            <div className='results-element' key={result._id}>
                            <Link to={`/player/${result._id}`}>
                              <div style={{backgroundColor: `${
                                result.subscriptionType === 'Free' ? '#006400' :
                                result.subscriptionType === 'Premium' ? '#371F76' : '#880000'
                              }`}} className='results-sub-type'>
                                  {`${result.subscriptionType}`}
                              </div>
                              <img onError={handleImageError} className='results-poster' src={`${result.poster}`} alt={result.title} />
                            </Link>
                
                          </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Movies;
