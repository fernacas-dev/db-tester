import {
    Logger
} from './src/logger.js'
import DbTester from './src/dbTester.js'
import {config} from 'dotenv'
import fs from 'fs'

//Setup enviroment variables
config()

const writeLog = (content) => {
    fs.writeFile(process.env.FILENAME, content, err => {
        if (err) {
          console.error(err)
        }
    });
}

const main = async() => {
    const clientConfig = {
        host: process.env.HOST,
        user: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DB,
    }

    const dbTester = new DbTester(clientConfig)
    const sql = process.env.QUERY

    try{
        const startConnectionTime = Logger.startTimer("CONNECT_TO_DATABASE: ")
        const isConnected = await dbTester.connectToDatabase()
        Logger.stopTimer(startConnectionTime)
    
        let result = ""
        if(sql !== ""){
            const queryTime = Logger.startTimer("RUN_QUERY: ")
            result = await dbTester.runQuery(sql)
            Logger.stopTimer(queryTime)    
        }
        
        const closeConnectionTime = Logger.startTimer("CLOSE_CONNECTION: ")
        const isClosed = await dbTester.closeConnection()
        Logger.stopTimer(closeConnectionTime)
    
        const out = {
            isConnected: isConnected,
            result: result,
            isClosed: isClosed,
        }

        writeLog(JSON.stringify(out))

    }catch(err){
        console.log(err)
    }
}

main()