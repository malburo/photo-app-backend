import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Mongoose is connected!!!');
  } catch (error) {
    console.log('Connect failure!!!');
  }
};
