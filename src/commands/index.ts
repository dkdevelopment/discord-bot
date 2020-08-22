import { listener } from '../discord'
import { Message } from 'discord.js'
import getLogger from '../helpers/logger'
import poke from './poke'
import { CommandOptions } from './model'

const log = getLogger('commands-core')

export const commandsListener = () => {
  listener('message', messageHandler)
}

const messageHandler = (message: Message) => {
  /* We don't want bot messages to be handled in any way */
  if (message.author.bot) {
    return
  }

  messageLogger(message)

  const content = message.content.trim()

  if (!content.startsWith(process.env.CMD_INVOKER!)) {
    log.trace('Ignoring message -> %o', content)
    return
  }

  const options: CommandOptions = {
    sourceChannelId: message.channel.id,
    guildId: message.guild!.id,
    invokerId: message.author.id
  }

  const [, command, ...args] = content.split(" ")

  switch (command) {
    case 'poke':
      return poke(args[0], options)
  }
}

const messageLogger = (message: Message) => {
  log.trace('[msg][%o] - %o', message.author.username, message.content)
}