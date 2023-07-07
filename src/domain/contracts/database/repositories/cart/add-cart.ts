export interface AddCartRepository {
  create: (input: AddCartRepository.Input) => Promise<AddCartRepository.Output>
}

export namespace AddCartRepository {
  export type Input = { accountId: string }

  export type Output = { id: string, accountId: string }
}
