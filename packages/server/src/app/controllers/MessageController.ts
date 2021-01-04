import { Response, Request } from 'express';
import Message from '../schemas/MessageSchema';
import { emitMessage } from '../../web-socket';

export default {
  async index(request: Request, response: Response): Promise<Response> {
    const { long, latt } = request.query;
    const messages = await Message.find({
      location: {
        $near: {
          $maxDistance: 15000,
          $geometry: {
            type: 'Point',
            coordinates: [long, latt],
          },
        },
      },
    });

    return response.json(messages);
  },

  async store(request: Request, response: Response): Promise<Response> {
    const { name, text, location } = request.body;

    try {
      const message = await Message.create({
        name,
        text,
        location,
      });

      emitMessage('user', 'new-message', message);

      return response.json(message);
    } catch (error) {
      return response.status(400).json({
        error: `A error happened while creating a message: ${error}`,
      });
    }
  },
};
