declare global {
  interface Window {
    context: {
      locale: string
    }
  }
}
// below makes this is treated as a module, so we can access it from outside.
export {}
