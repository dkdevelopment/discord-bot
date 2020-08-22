import getClient, { sendMessage, sendMessageWithMention } from '../discord'
import getMemberFromId from './helpers/getMemberFromId'
import getMembersFromRoleId from './helpers/getMembersFromRoleId'
import { GuildMember, Channel, VoiceChannel } from 'discord.js'
import getLogger from '../helpers/logger'
import getLocale from '../locale'
import createUserMention from './helpers/createUserMention'
import { CommandOptions } from './model'
import { maxBy } from 'lodash'

const log = getLogger('poke')
const locale = getLocale()

const poke = async (maybeUserOrRole: string, options: CommandOptions) => {
  const client = getClient()
  const member = await getMemberFromId(options.guildId, maybeUserOrRole)
  const channels = client.channels.cache.array().filter((chan): chan is VoiceChannel => chan.type === 'voice')

  if (!member) {
    const members = await getMembersFromRoleId(options.guildId, maybeUserOrRole)

    if (!members) {
      log.debug('No members in such role')
      return
    }
    /* todo limit threads */
    await Promise.all(members.map(member => moveMember(channels, member, options)))
    return
  }

  await moveMember(channels, member, options)
}

export default poke

const moveMember = async (voiceChannels: VoiceChannel[], member: GuildMember, options: CommandOptions) => {
  if (member.id === getClient().user?.id) {
    await sendMessageWithMention(options.invokerId, locale.WONT_POKE_BOT_ITSELF, options.sourceChannelId)
    return
  }

  if (member.user.bot) {
    await sendMessageWithMention(options.invokerId, locale.WONT_POKE_BOT, options.sourceChannelId)
    return
  }

  const userChannel = voiceChannels.find((channel) => channel.members.has(member.id))
  
  if (!userChannel) {
    log.debug('User %o not on voice channel', member.nickname)
    await sendMessageWithMention(member.id, locale.USER_NOT_ON_VOICE_CHANNEL, options.sourceChannelId)
    return
  }

  if (voiceChannels.length === 1) {
    await sendMessageWithMention(options.invokerId, locale.ONLY_ONE_VOICE_CHANNEL, options.sourceChannelId)
  }

  const bestDestination = maxBy(voiceChannels, (channel) => {
    const channelMembers = channel.members.array()

    return 1000 / channelMembers.length ?? 0.0001
  })

  if (!bestDestination) {
    log.error('Did not find best destination')
    return
  }

  await member.edit({ channel: bestDestination.id })
  await member.edit({ channel: userChannel.id })
}