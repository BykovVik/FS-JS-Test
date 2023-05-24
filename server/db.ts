import { connect } from 'mongoose';

const dbConnect = async () => {

    try {

        await connect(process.env.DB_CONN_STRING);
        console.log('Successfully connected to MongoDB');

    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);

    }

};

export default dbConnect