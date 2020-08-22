import { listener } from '../discord'
import { Message } from 'discord.js'
import getLogger from '../helpers/logger'

const log = getLogger('commands-core')

export const commandsListener = () => {
  listener('message', messageHandler)
}

const messageHandler = (message: Message) => {
  /* We don't want bot messages to be handled in any way */
  if (message.author.bot) {
    return
  }

  const content = message.content.trim()

  if (!content.startsWith(process.env.CMD_INVOKER!)) {
    log.trace('Ignoring message -> %o', content)
    return
  }

  
}