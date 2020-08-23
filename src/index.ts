import dotenv from 'dotenv'
dotenv.config()
import envChecker from './helpers/envChecker'
envChecker()
import { connect } from './discord'
import { commandsListener } from './commands'
import { connect as databaseConnect } from './helpers/mongo'

Promise.resolve().then(async () => {
  await databaseConnect()
  await connect()
  commandsListener()
})
