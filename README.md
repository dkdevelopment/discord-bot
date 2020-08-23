# discord-bot
For one guild bot

## Environment variables
The required environments are listed in `helpers/envChecker.ts`

Documented environment variables and their use case:
- `CMD_INVOKER`: (Default: `db`) <br />
Many of the common bots require some sort of invokation, e.g. `!play some music` the `CMD_INVOKER` in such case would be just the exclamation mark `!`.
- `MONGODB_URI`: Uri to the mongodb (e.g. `mongodb://localhost:27017`)
- `MONGODB_DB`: (Default: `discord_bot`) <br />
Database in which all the data will be stored

## Commands format
Example command: `db kick @User`
It consists of `CMD_INVOKER` + `OPERATION` + `ARGUMENTS OF THE OPERATION`