import bcrypt from 'bcrypt';

export const generateHash = async (pin: string) => { 
  try {
    const hashData = await bcrypt.hash(pin, 10)
    return hashData
  } catch (error) {
    throw new Error('Error hash')
  }
}

export const compareHash = async (data: string, hash: string) => {
  try {
    const match = await bcrypt.compare(data, hash);

    return match
  } catch (error) {
    throw new Error('Error comparing PIN');
  }
}