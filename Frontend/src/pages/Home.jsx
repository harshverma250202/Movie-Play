import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';

const HomeWrapperStyles = styled.div``;

const Home = () => {
  return (
    <HomeWrapperStyles>
      <div>
        <p>
          If you want to develop your own Institute courses in pedagogical framework, please register your institution
          here
        </p>
        <Link to="/institutes">
          <Button variant="contained">Institutes</Button>
        </Link>
      </div>
    </HomeWrapperStyles>
  );
};

export default Home;
