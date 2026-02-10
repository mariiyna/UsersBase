export const login = (login: string, password: string): Promise<string> => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (login === 'admin' && password === 'admin') {
        res('fake-token-12345')
      } else {
        rej(new Error('Неверный логин или пароль'))
      }
    }, 2000)
  })
}

export const logout = (): Promise<string> => {
  return new Promise((res) => {
    setTimeout(() => {
      res('Success')
    }, 1500)
  })
}

