import dotenv from 'dotenv'
dotenv.config()
import envChecker from './helpers/envChecker'
envChecker()
import { connect } from './discord'

Promise.resolve().then(async () => {
  await connect()
})
