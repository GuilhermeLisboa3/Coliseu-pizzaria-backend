export interface AddAccountRepository {
  create: (account: AddAccountRepository.Input) => Promise<AddAccountRepository.Output>
}

export namespace AddAccountRepository {
  export type Input = {
    name: string
    email: string
    password: string
  }

  export type Output = void
}
