export const validatePin = async (pin: string) => {
  // ตรวจสอบว่า PIN มีความยาว 6 หลัก
  const pinLength = /^\d{6}$/
  if (!pinLength.test(pin)) {
    return false
  }

  // ตรวจสอบว่า PIN ไม่มีตัวเลขเรียงติดกัน
  const sequential = /(?:012345|123456|234567|345678|456789|567890|678901|789012|890123|901234|098765|987654|876543|765432|654321|543210|432109|321098|210987|109876)/
  if (sequential.test(pin)) {
    return false
  }

  // ตรวจสอบว่า PIN ไม่มีตัวเลขซ้ำกันมากกว่า 2 ตัว
  const repeated = /(\d)\1{2,}/
  if (repeated.test(pin)) {
    return false
  }

  return true
}
