export interface AddAccountRepository {
  create: (account: AddAccountRepository.Input) => Promise<void>
}

export namespace AddAccountRepository {
  export type Input = {
    name: string
    email: string
    password: string
  }
}
