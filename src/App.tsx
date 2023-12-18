import React, { FC, useEffect, useState } from 'react';
import './style.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import AirIcon from '@mui/icons-material/Air';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import GrainIcon from '@mui/icons-material/Grain';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';

const Days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const jsonData = [
  {
    day: 0,
    temp: 68,
    image: <AirIcon />,
    message: 'WINDY',
  },
  {
    day: 1,
    temp: 74,
    image: <WbSunnyIcon />,
    message: 'SUNNY',
  },
  {
    day: 2,
    temp: 83,
    image: <ThunderstormIcon />,
    message: 'THUNDERSTORMS IN THE AFTERNOON',
  },
  {
    day: 3,
    temp: 75,
    image: <CloudIcon />,
    message: 'MOSTLY CLOUDY',
  },
  {
    day: 4,
    temp: 82,
    image: <FilterDramaIcon />,
    message: 'PARTLY CLOUDY',
  },
  {
    day: 5,
    temp: 81,
    image: <GrainIcon />,
    message: 'RAIN',
  },
  {
    day: 6,
    temp: 90,
    image: <WbSunnyIcon />,
    message: 'SUNNY',
  },
];

export const App = () => {
  const [startDate, setStartDate] = useState('02/07/2023');
  const [endDate, setEndDate] = useState('08/07/2023');
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(6);
  const [toggle, setToggle] = useState(0);
  const [arr, setArr] = useState([]);

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const handleSubmitClick = () => {
    const arr1 = [];
    setStart((startDate.slice(0, 2) - 2 + 7) % 7);
    setEnd(parseInt(endDate.slice(0, 2)) - parseInt(startDate.slice(0, 2)));
    let j = 0;
    setToggle((prev) => prev + 1);
    for (
      let i = (startDate.slice(0, 2) - 2 + 7) % 7;
      i <=
      ((startDate.slice(0, 2) - 2 + 7) % 7) +
        (parseInt(endDate.slice(0, 2)) - parseInt(startDate.slice(0, 2)));
      i++
    ) {
      if (j > end) break;
      arr1.push(
        <Card key={i} sx={{ minWidth: 100 }}>
          <h3
            className={`center ${
              Days[i % 7] === 'SUN' || Days[i % 7] === 'SAT'
                ? 'highlighted'
                : ''
            }`}
          >
            {Days[i % 7]}
          </h3>
          <h1>{jsonData[i % 7].temp}</h1>
          <div className="center">{jsonData[i % 7].image}</div>
          <p className="center">{jsonData[i % 7].message}</p>
        </Card>
      );
      j++;
    }
    setArr(arr1);
  };

  useEffect(() => {
    console.log('arr after update:', arr);
  }, [arr]);

  return (
    <div>
      <div className="center">
        <div className="d-flex">
          <p>From</p>
          <TextField
            id="outlined-basic"
            label="From"
            variant="outlined"
            value={startDate}
            onChange={handleStartChange}
          />
          <p>To</p>
          <TextField
            id="outlined-basic"
            label="To"
            variant="outlined"
            value={endDate}
            onChange={handleEndChange}
          />
          <Button variant="contained" onClick={handleSubmitClick}>
            Submit
          </Button>
        </div>
      </div>
      <h1>FORECAST</h1>
      <div className="d-flex">{arr}</div>
    </div>
  );
};
