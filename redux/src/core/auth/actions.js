export const authActions = {
  BOOT_AUTH: "BOOT_AUTH",
  AUTHENTICATE_START: "AUTHENTICATE_START",
  AUTHENTICATE_COMPLETE: "AUTHENTICATE_COMPLETE",
  AUTHENTICATE_ERROR: "AUTHENTICATE_ERROR",
  CLOSE_AUTH: "CLOSE_AUTH",

  bootAuth: (type) => {
    return {
      type: authActions.BOOT_AUTH,
      payload: { type }
    }
  },

  closeAuth: () => {
    return { type: authActions.CLOSE_AUTH };
  }
}
