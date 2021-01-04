import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Layout from '../../components/Layout';

const Register: React.FC = () => {
  const history = useHistory();
  const [name, setName] = useState<string>('');
  const [coordinates, setCoordinates] = useState<object>({});
  const [locationError, setLocationError] = useState<boolean>(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const handleSubmit = () => {
    history.push('/chat', { name, coordinates });
  };

  const getGeoPosition = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ latitude, longitude });
      },
      err => {
        if (err) setLocationError(true);
      },
      { enableHighAccuracy: true },
    );
  };

  useEffect(() => getGeoPosition(), []);

  return (
    <>
      <Layout>
        <div>
          <h3>Sign Up to Tribe</h3>

          {locationError && <p>Location is not available</p>}

          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={handleNameChange}
          />

          <button
            type="submit"
            className={locationError ? 'disabled' : ''}
            onClick={handleSubmit}
            disabled={locationError}
          >
            Enter chat
          </button>
        </div>
      </Layout>
    </>
  );
};

export default Register;
