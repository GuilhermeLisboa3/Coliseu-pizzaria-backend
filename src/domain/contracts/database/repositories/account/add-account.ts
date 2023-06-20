export interface AddAccount {
  add: (account: AddAccount.Input) => Promise<void>
}

export namespace AddAccount {
  export type Input = {
    name: string
    email: string
    password: string
  }
}
