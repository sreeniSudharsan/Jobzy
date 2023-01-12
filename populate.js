require('dotenv').config();


const mockData = require('./MOCK_DATA (1).json')

const Job = require('./models/Job')
const connectDB = require('./db/connect');


const start = async()=> {
   try {
        await connectDB(process.env.MONGO_URI)

        await Job.create(mockData);
        console.log('Success!!')
        process.exit(0);

   } catch (error) {
    console.log(error);
    process.exit(1)
   } 
}

start()