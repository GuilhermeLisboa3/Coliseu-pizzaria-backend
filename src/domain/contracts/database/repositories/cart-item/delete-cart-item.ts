export interface DeleteCartItemRepository {
  delete: (input: DeleteCartItemRepository.Input) => Promise<DeleteCartItemRepository.Output>
}

export namespace DeleteCartItemRepository {
  export type Input = { id: string }

  export type Output = void
}
