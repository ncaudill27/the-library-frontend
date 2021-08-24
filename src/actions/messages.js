const flashMessage = message => ({
  type: "FLASH_MESSAGE",
  message,
})

const removeFlash = () => ({
  type: "REMOVE_FLASH",
})

export { flashMessage, removeFlash }
