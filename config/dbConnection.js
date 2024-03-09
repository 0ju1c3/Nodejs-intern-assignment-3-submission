import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const connectionDb = async()=>{
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log("connection established")
        console.log('Database connected:', connect.connection.host,connect.connection.name)
    } catch(error){
        console.log(error)
    }

}
export default connectionDb
