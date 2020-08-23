import { Db, MongoClient } from 'mongodb'

let db: Db

const dbName = process.env.MONGODB_DB || 'discord_bot'

export const connect = async () => {
  const client = await MongoClient.connect(process.env.MONGODB_URI!)

  db = client.db(dbName)
}

const getDb = () => db

export default getDb