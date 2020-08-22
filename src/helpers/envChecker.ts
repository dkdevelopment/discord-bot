import getLogger from './logger'

const REQUIRED_ENVS = ['DISCORD_TOKEN', 'DISCORD_CHANNEL_ID', 'CMD_INVOKER']

const log = getLogger('env')

const envChecker = () => {
  const missingEnvs = REQUIRED_ENVS.filter(env => !!process.env[env])

  if (!missingEnvs.length) {
    throw new Error(`envs: ${missingEnvs.join(', ')} are required`)
  }
}

export default envChecker