import getClient, { listener, sendMessageWithMention, sendMessage } from '../../discord'
import getLocale from '../../locale'
import { CommandOptions } from '../model'
import { isInMarriage, createMarriage } from './storage'
import sleep from '../../helpers/sleep'
import createUserMention from '../helpers/createUserMention'
import getUserFromId from '../helpers/getUserFromId'

const locale = getLocale()

const marry = async (maybeUserId: string, options: CommandOptions) => {
  const user = await getUserFromId(maybeUserId)

  if (!user) {
    await sendMessage('nie ma kogoś takiego???', options.sourceChannelId)
    return
  }

  const userId = user.id

  if (userId === options.invokerId) {
    await sendMessageWithMention(options.invokerId, locale.CANT_MARRY_YOURSELF, options.sourceChannelId)
    return
  }

  if (userId === getClient().user?.id) {
    await sendMessageWithMention(options.invokerId, locale.CANT_MARRY_ME, options.sourceChannelId)
    return
  }

  if (user.bot) {
    await sendMessageWithMention(options.invokerId, locale.CANT_MARRY_BOT, options.sourceChannelId)
    return
  }

  if (await isInMarriage(userId)) {
    await sendMessageWithMention(
      options.invokerId,
      locale.OTHER_PERSON_IN_MARRIAGE,
      options.sourceChannelId
    )
    return
  }

  if (await isInMarriage(options.invokerId)) {
    await sendMessageWithMention(
      options.invokerId,
      locale.YOU_IN_MARRIAGE,
      options.sourceChannelId
    )
    return
  }

  await sendMessageWithMention(
    userId,
    `${locale.DO_YOU_WANT_TO_MARRY} ${createUserMention(options.invokerId)} (${
      locale.YES
    }/${locale.NO})`,
    options.sourceChannelId
  )

  // waits for 30 seconds for an answer to the marriage
  const decision = await Promise.race([marryDecision(userId), sleep(30000)])

  if (!decision) {
    await sendMessageWithMention(
      options.invokerId,
      locale.DID_NOT_ACCEPT_YOUR_MARRIAGE,
      options.sourceChannelId
    )
    return
  }

  if (await isInMarriage(userId)) {
    await sendMessageWithMention(
      options.invokerId,
      locale.OTHER_PERSON_IN_MARRIAGE,
      options.sourceChannelId
    )
    return
  }

  if (await isInMarriage(options.invokerId)) {
    await sendMessageWithMention(
      options.invokerId,
      locale.YOU_IN_MARRIAGE,
      options.sourceChannelId
    )
    return
  }

  await createMarriage(options.invokerId, userId)

  await sendMessageWithMention(options.invokerId, locale.MARRIAGE_SUCCESSFUL, options.sourceChannelId)
}

export default marry

const marryDecision = (expectedUserId: string): Promise<boolean> =>
  new Promise((resolve) => {
    listener('message', (message) => {
      if (message.author.id !== expectedUserId) {
        return
      }

      if ([locale.YES, locale.NO].includes(message.content.trim())) {
        resolve(message.content.trim() === locale.YES)
      }
    })
  })
