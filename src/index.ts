import dotenv from 'dotenv'
dotenv.config()
import envChecker from './helpers/envChecker'
envChecker()
import { connect } from './discord'
import { commandsListener } from './commands'

Promise.resolve().then(async () => {
  await connect()
  commandsListener()
})
