import api from '../src/api';
import request from 'supertest';
import mongoose from 'mongoose';
import Message from '../src/app/schemas/MessageSchema';

describe('Message Routes', () => {
  const mongoMockURI = `mongodb+srv://tribe:tribe@cluster0.gnsia.mongodb.net/chat-test-db?retryWrites=true&w=majority`
  const mockedURI= `/messages?long=-40.266684&latt=-20.262613`;

  const messageMock = {
    name: "Test",
    text: "Test",
    location: {
      type: "Point",
      coordinates: [-40.270222, -20.246713]
    },
  };

  beforeAll(() => {
    mongoose.createConnection(mongoMockURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    Message.create(messageMock);
    Message.create(messageMock);
    Message.create(messageMock);
  });

  afterAll(async () => {
    await Message.deleteMany({});
    mongoose.disconnect();
  });

  it('GET /messages should return a list of messages', async () => {
    const response = await request(api.api).get(mockedURI).send();
    expect(response.status).toEqual(200);
    expect(response.body).toHaveLength(3);
  });

  it('POST /messages should create a message', async () => {
    const response = await request(api.api).post('/messages').send(messageMock);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('text');
    expect(response.body).toHaveProperty('location');
  });
});
