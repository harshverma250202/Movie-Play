import axios from 'axios';
import './subscription_page.css';
import { useState, useEffect } from 'react';
// import { Link } from 'react';

import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../constants';
import { useSelector } from 'react-redux';
import {useAlert} from 'react-alert'

const Subscription = () => {
  const [alignment, setAlignment] = React.useState('web');
  const userData=useSelector(state=>state.auth.user)
  const alert =useAlert();

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const [notes, setNotes] = useState([])
  var t1 = "1 month"
  var t6 = "6 months"
  var t12 = "12 months"
  const [time, settime] = useState(t1)

  const fetchData = async () => {
    const { data } = await axios.get(`${BACKEND_URL}/subscription/`)
    setNotes(data)
    // setblog(data)
  }

  useEffect(() => {
    fetchData();
  }, []);

  // const filterItems = notes.filter( notes=> notes.name === "Premium" )
  const filterItems1 = notes.filter((notes) => notes.timeperiod === t1);
  const filterItems6 = notes.filter((notes) => notes.timeperiod === t6);
  const filterItems12 = notes.filter((notes) => notes.timeperiod === t12);

  const handlemonth1 = () => {
    settime(t1);
  };

  const handlemonth6 = () => {
    settime(t6);
  };
  const handlemonth12 = () => {
    settime(t12);
  };
  const [selectedPart, setSelectedPart] = useState(null);
  const [partSelected, setPartSelected] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (part) => {
    setSelectedPart(part);
    setPartSelected(true);
  };
  return (
    <div className="blogs">
      <div className="context">
        <p>Choose the plan that's right for you </p>
      </div>

      {time == t1 && (
        <div className="items">
          {filterItems1.map((part) => (
            <div key={part._id} className="Mobile" onClick={() => handleSelect(part)}>
              {partSelected && selectedPart && selectedPart._id === part._id && <div className="selected"></div>}

              <div className="Mobile-content">
                <div className="Mobile-color_grading">
                  <div className="type">
                    <p> {part.name}</p>
                  </div>
                  <div className="quality">
                    <p> {part.resolution}P</p>
                  </div>
                </div>
              </div>

              <div className="info">
                <div className="fit">
                  <p>
                    <span className="heading">Time Period</span>
                  </p>
                  <p>
                    <span className="data"> {part.timeperiod} </span>
                  </p>
                  <hr />
                </div>

                <div className="fit">
                  <p>
                    <span className="heading">Total Price</span>
                  </p>
                  <p>
                    <span className="data"> ₹ {part.price}</span>
                  </p>
                  <hr />
                </div>

                <div className="fit">
                  <p>
                    <span className="heading">Viewing Limit</span>
                  </p>
                  <p>
                    <span className="data">{part.devices}</span>
                  </p>
                  <hr />
                </div>

                <div className="fit">
                  <p>
                    <span className="heading">Download</span>
                  </p>
                  <p>
                    <span className="data">{part.download ? 'True' : 'False'}</span>
                  </p>
                </div>
              </div>
              <br />
            </div>
          ))}
        </div>
      )}

      {time == t6 && (
        <div className="items">
          {filterItems6.map((part) => (
            <div key={part._id} className="Mobile" onClick={() => handleSelect(part)}>
              {partSelected && selectedPart && selectedPart._id === part._id && <div className="selected"></div>}
              <div className="Mobile-content">
                <div className="Mobile-color_grading">
                  <div className="type">
                    <p> {part.name}</p>
                  </div>
                  <div className="quality">
                    <p> {part.resolution}P</p>
                  </div>
                </div>
              </div>

              <div className="info">
                <div className="fit">
                  <p>
                    <span className="heading">Time Period</span>
                  </p>
                  <p>
                    <span className="data"> {part.timeperiod} </span>
                  </p>
                  <hr />
                </div>

                <div className="fit">
                  <p>
                    <span className="heading">Total Price</span>
                  </p>
                  <p>
                    <span className="data">₹ {part.price}</span>
                  </p>
                  <hr />
                </div>

                <div className="fit">
                  <p>
                    <span className="heading">Viewing Limit</span>
                  </p>
                  <p>
                    <span className="data">{part.devices}</span>
                  </p>
                  <hr />
                </div>

                <div className="fit">
                  <p>
                    <span className="heading">Download</span>
                  </p>
                  <p>
                    <span className="data">{part.download ? 'True' : 'False'}</span>
                  </p>
                </div>
              </div>
              <br />
            </div>
          ))}
        </div>
      )}

      {time == t12 && (
        <div className="items">
          {filterItems12.map((part) => (
            <div key={part._id} className="Mobile" onClick={() => handleSelect(part)}>
              {partSelected && selectedPart && selectedPart._id === part._id && <div className="selected"></div>}
              <div className="Mobile-content">
                <div className="Mobile-color_grading">
                  <div className="type">
                    <p> {part.name}</p>
                  </div>
                  <div className="quality">
                    <p> {part.resolution}P</p>
                  </div>
                  {/* {selectedItems.includes(part._id) && <div className="tick-mark">&#10003;</div>} */}
                </div>
              </div>

              <div className="info">
                <div className="fit">
                  <p>
                    <span className="heading">Time Period</span>
                  </p>
                  <p>
                    <span className="data"> {part.timeperiod} </span>
                  </p>
                  <hr />
                </div>

                <div className="fit">
                  <p>
                    <span className="heading">Total Price</span>
                  </p>
                  <p>
                    <span className="data">{`₹ ${part.price}`} </span>
                  </p>
                  <hr />
                </div>

                <div className="fit">
                  <p>
                    <span className="heading">Viewing Limit</span>
                  </p>
                  <p>
                    <span className="data">{part.devices}</span>
                  </p>
                  <hr />
                </div>

                <div className="fit">
                  <p>
                    <span className="heading">Download</span>
                  </p>
                  <p>
                    <span className="data">{part.download ? 'True' : 'False'}</span>
                  </p>
                </div>
              </div>
              <br />
            </div>
          ))}
        </div>
      )}

      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        className="TBG"
        size="large"
      >
        <ToggleButton value="web" className="Month" onClick={handlemonth1}>
          1 Month
        </ToggleButton>
        <ToggleButton value="android" className="6Months" onClick={handlemonth6}>
          6 Months
        </ToggleButton>
        <ToggleButton value="ios" className="12Months" onClick={handlemonth12}>
          1 Year
        </ToggleButton>
      </ToggleButtonGroup>

      <button
        className="next-button"
        onClick={() => {
          if (partSelected) {
            if(userData?.subscription?.name=="Standard"&&selectedPart?.name=="Free")
            alert.error("You have higher subscription, so you cannot buy this pack ");
            else
            navigate('/payment', { state: { selectedPart: selectedPart } });
          }
        }}
      >
        {' '}
        Next{' '}
      </button>
    </div>
  );
};


export default Subscription;

