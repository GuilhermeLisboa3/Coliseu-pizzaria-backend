export interface LoadCartRepository {
  load: (input: LoadCartRepository.Input) => Promise<LoadCartRepository.Output>
}

export namespace LoadCartRepository {
  export type Input = { accountId: string }

  export type Output = { id: string, accountId: string } | null
}
