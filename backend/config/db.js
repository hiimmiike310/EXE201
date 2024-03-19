import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    // const conn = await mongoose.connect("mongodb+srv://trandinhkhanhtoan31:DAqWYWsshe7f0AVs@cluster0.tbndbnu.mongodb.net/Project");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
