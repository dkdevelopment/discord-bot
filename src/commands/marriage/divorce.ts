import { CommandOptions } from '../model'
import { isInMarriage, divorceMarriage } from './storage'
import { sendMessageWithMention } from '../../discord'
import getLocale from '../../locale'

const locale = getLocale()

const divorce = async (options: CommandOptions) => {
  if (!await isInMarriage(options.invokerId)) {
    await sendMessageWithMention(options.invokerId, locale.NOT_IN_MARRIAGE, options.sourceChannelId)
    return
  }

  const wasDivorceGood = await divorceMarriage(options.invokerId)

  if (!wasDivorceGood) {
    await sendMessageWithMention(options.invokerId, locale.COULD_NOT_DIVORCE, options.sourceChannelId)
    return
  }

  await sendMessageWithMention(options.invokerId, locale.DIVORCE_SUCCESS, options.sourceChannelId)
}

export default divorce