import discord from 'discord.js'
import getLogger from './helpers/logger'

const client = new discord.Client()
const log = getLogger('discord-core')

export const connect = () => new Promise((resolve, reject) => {
  client.login(process.env.DISCORD_TOKEN)

  client.once('ready', () => {
    log.info(`Bot %o connected`, client.user?.username)
    resolve()
  })

  client.once('error', (error) => {
    log.error(`Error at connect -> %o`, error.message)
    reject(error)
  })
})

const assertConnected = () => {
  if (!client.readyAt) {
    throw new Error('Not connected')
  }
}