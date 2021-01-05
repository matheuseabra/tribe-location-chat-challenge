import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useLocation } from 'react-router';
import { MdSend } from 'react-icons/md';
import socketio from 'socket.io-client';
import ReactMapboxGl, { Popup } from 'react-mapbox-gl';
import api from '../../services/api';
import 'mapbox-gl/dist/mapbox-gl.css';
import { AvatarCircle, InputContainer } from './styles';

interface IMessage {
  _id: string;
  name: string;
  text: string;
  location: {
    type: string;
    coordinates: Array<number>;
  };
  createdAt: Date;
  updatedAt: Date;
}

interface ILocation {
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoibWF0aGV1c2VhYnJhIiwiYSI6ImNqcWQ3MWFhMjRmank0MnVsZXh2M2x2aXAifQ.ecFLtH3EITIcIztT2xYaSA',
});

const ChatMap: React.FC = () => {
  const location = useLocation<ILocation>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const inputRefMessage = useRef<HTMLTextAreaElement>(null);
  const [currentUsername, setCurrentUsername] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Array<number> | null>(
    [],
  );
  const {
    name,
    coordinates: { longitude, latitude },
  } = location.state;

  useEffect(() => {
    setCurrentUsername(name);
    setCurrentLocation([longitude, latitude]);
  }, [location]);

  const socket = useMemo(() => {
    return socketio('http://localhost:3333');
  }, []);

  const fetchMessages = useCallback(() => {
    api.get(`/messages?long=${longitude}&latt=${latitude}`).then(response => {
      setMessages(response.data);
    });
  }, [location]);

  const handleSubmitMessage = useCallback(() => {
    if (!inputRefMessage.current?.value) {
      return;
    }

    try {
      api
        .post('/messages', {
          name: currentUsername,
          text: inputRefMessage.current?.value,
          location: {
            type: 'Point',
            coordinates: currentLocation,
          },
        })
        .then(() => fetchMessages());

      inputRefMessage.current.value = '';
    } catch (error) {
      console.error('An error occurred while sending message.');
    }
  }, [currentUsername, currentLocation, fetchMessages]);

  useEffect(() => fetchMessages(), [fetchMessages]);

  useEffect(() => {
    socket.on('new-message', (data: IMessage) => {
      setMessages(state => [...state, data]);
    });
  }, [socket]);

  return (
    <>
      <Map
        // eslint-disable-next-line react/style-prop-object
        style="mapbox://styles/mapbox/streets-v10"
        center={[longitude, latitude]}
        zoom={[11]}
        containerStyle={{
          height: '100vh',
          width: '100vw',
        }}
      >
        {messages.map(
          ({ _id: id, location: { coordinates }, ...message }: IMessage) => (
            <Popup
              key={id}
              style={{ maxWidth: '150px' }}
              coordinates={coordinates}
              anchor="center"
            >
              <AvatarCircle />
              <p className="text">{message.text}</p>
              <p className="name">
                <b>{message.name}</b>
              </p>
            </Popup>
          ),
        )}
      </Map>
      <InputContainer>
        <textarea ref={inputRefMessage} placeholder="Type your message" />
        <button type="submit" onClick={handleSubmitMessage}>
          <MdSend />
        </button>
      </InputContainer>
    </>
  );
};

export default ChatMap;
