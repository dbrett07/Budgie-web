import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); 

const databaseUrl = process.env.DATABASE_URL; 
if ( !databaseUrl ) { 
    throw new Error("env:DATABASE_URL is missing.")
}

export const sequelize = new Sequelize(databaseUrl, {
    host : "localhost",
    dialect : "postgres", 
    logging : console.log, 
    pool : {
        max : 5, 
        min : 0, 
        acquire : 30_000, 
        idle : 10_000
    },
});