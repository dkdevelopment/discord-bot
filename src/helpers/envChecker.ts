const REQUIRED_ENVS = ['DISCORD_TOKEN', 'DISCORD_CHANNEL_ID']

const envChecker = () => {
  const missingEnvs = REQUIRED_ENVS.filter(env => !!process.env[env])

  if (!missingEnvs.length) {
    throw new Error(`envs: ${missingEnvs.join(', ')} are required`)
  }
}

export default envChecker