export function parseOptionQuantity(option) {
  if (typeof option === 'string') {
    const firstNumber = parseInt(option.charAt(0))
    return isNaN(firstNumber) ? 1 : firstNumber
  }

  return 1
}
