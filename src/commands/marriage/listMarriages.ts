import { CommandOptions } from '../model'
import { getAllMarriages } from './storage'
import { sendMessageWithMention } from '../../discord'
import getLocale from '../../locale'
import createUserMention from '../helpers/createUserMention'

const locale = getLocale()

const listMarriages = async (options: CommandOptions) => {
  const marriages = await getAllMarriages()

  const formattedMarriages = marriages.map((marriage) => {
    return `${createUserMention(marriage.user.id)} - ${createUserMention(
      marriage.secondUser.id
    )} (${locale.FROM} ${formatDate(marriage.created)})`
  })

  await sendMessageWithMention(options.invokerId, `${locale.ALL_MARRIAGES}:
${formattedMarriages.join('\n')}`, options.sourceChannelId)
}

export default listMarriages

const formatDate = (d: Date | string | number) => {
  const date = new Date(d)

  return `${pad(date.getFullYear())}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

const pad = (str: number | string) => `${str}`.padStart(2, '0')
