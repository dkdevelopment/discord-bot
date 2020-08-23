import getDb from '../../helpers/mongo'
import { Marriage } from './model'

const marriageCollection = () => getDb().collection<Marriage>('marriages')

export const createMarriage = async (
  firstUserId: string,
  secondUserId: string
): Promise<void> => {
  const marriage: Marriage = {
    user: {
      id: firstUserId
    },
    secondUser: {
      id: secondUserId
    },
    created: new Date(),
    status: 'active'
  }

  await marriageCollection().insertOne(marriage)
}

export const isInMarriage = async (userId: string): Promise<boolean> => {
  const result = await marriageCollection().findOne({
    ...createUserMarriageExpression(userId), status: 'active'
  })

  return !!result
}

export const getAllMarriages = () => marriageCollection().find({ status: 'active' }).toArray()

export const divorceMarriage = async (firstUserId: string): Promise<boolean> => {
  const result = await marriageCollection().findOneAndUpdate({
    ...createUserMarriageExpression(firstUserId),
    status: 'active'
  }, { $set: { status: 'divorced' } })

  return !!(result.ok && result.value)
}

const createUserMarriageExpression = (userId: string) => ({
  $or: [{ 'user.id': userId }, { 'secondUser.id': userId }]
})