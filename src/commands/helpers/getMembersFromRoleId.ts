import { GuildMember } from 'discord.js'
import getClient from '../../discord'

/**
 * 
 * @param guildId 
 * @param roleId role id with format like <&#64;&416335152100426300>
 */
const getMembersFromRoleId = async (guildId: string, roleId: string): Promise<GuildMember[] | undefined> => {
  const matchResult = roleId.match(/<@&(.*)>/)
  const extractedId = matchResult?.[1]

  if (!matchResult || !extractedId) {
    return
  }

  const guild = await getClient().guilds.fetch(guildId)

  const members = await guild.members.fetch()

  return members.array()
}

export default getMembersFromRoleId