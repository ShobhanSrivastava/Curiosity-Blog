import mongoose from 'mongoose';
// import { DB_CONN } from './';
import dotenv from 'dotenv';
dotenv.config();

function connect() {
    // Connect to mongoDB 
    mongoose.connect(process.env.DB_CONN, {});
    const connection = mongoose.connection;

    // On error
    connection.on('error', console.error.bind(console, 'connection error: '));
    // Once the connection is open
    connection.once('open', () => console.log('Successfully connected to database'));

    return connection;
}

export default connect;