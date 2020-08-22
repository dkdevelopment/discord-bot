import { GuildMember } from 'discord.js'
import getClient from '../../discord'

/**
 * 
 * @param guildId  in other words server
 * @param memberLikeId  id in format like <&#64;!2945377308328242176>
 */
const getMemberFromId = async (guildId: string, memberLikeId: string): Promise<GuildMember | undefined> => {
  const matchResult = memberLikeId.match(/<@!(.*)>/)
  const extractedId = matchResult?.[1]

  if (!matchResult || !extractedId) {
    return
  }

  const guild = await getClient().guilds.fetch(guildId)

  return guild.member(extractedId) ?? undefined
}

export default getMemberFromId