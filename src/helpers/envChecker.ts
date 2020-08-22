const REQUIRED_ENVS = ['DISCORD_TOKEN']

const envChecker = () => {
  const missingEnvs = REQUIRED_ENVS.filter(env => !!process.env[env])

  if (!missingEnvs.length) {
    throw new Error(`envs: ${missingEnvs.join(', ')} are required`)
  }
}

export default envChecker