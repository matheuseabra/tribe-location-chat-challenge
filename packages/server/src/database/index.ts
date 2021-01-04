import mongoose from 'mongoose';

if (process.env.NODE_ENV === 'test') {
  mongoose.connect('mongodb+srv://tribe:tribe@cluster0.gnsia.mongodb.net/chat-test-db?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
} else {
  mongoose.connect(`${process.env.MONGO_CONNECT}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
}
