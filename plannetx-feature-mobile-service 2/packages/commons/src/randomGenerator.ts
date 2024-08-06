import { customAlphabet } from 'nanoid'

export const generateRandomString = customAlphabet('abcdefghijklnmopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', 6) // default 6 for approval_code
export const generateRandomNumber = customAlphabet('0123456789', 1)
