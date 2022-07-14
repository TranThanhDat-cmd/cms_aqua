import './style.scss';

import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

const Homepage = () => {
  const history = useHistory();
  useEffect(() => {
    history.push('device');
  }, []);
  return <div className="homepage"></div>;
};

export default Homepage;
