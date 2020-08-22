import { User } from 'discord.js'
import getClient from '../../discord'

/* expects arg <@!294237760888242176> */
const getUserFromId = async (userId: string): Promise<User | undefined> => {
  const matchResult = userId.match(/<@!(.*)>/)
  const extractedId = matchResult?.[1]

  if (!matchResult || !extractedId) {
    return
  }

  const client = getClient()

  return client.users.fetch(extractedId)
}

export default getUserFromId