# discord-bot
For one guild bot

## Environment variables
The required environments are listed in `helpers/envChecker.ts`

Documented environment variables and their use case:
- `CMD_INVOKER`: (Default: `db`) <br />
Many of the common bots require some sort of invokation, e.g. `!play some music` the `CMD_INVOKER` in such case would be just the exclamation mark `!`.

## Commands format
Example command: `db kick @User`
It consists of `CMD_INVOKER` + `OPERATION` + `ARGUMENTS OF THE OPERATION`