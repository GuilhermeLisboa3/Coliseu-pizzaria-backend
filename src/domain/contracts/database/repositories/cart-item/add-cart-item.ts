export interface AddCartItemRepository {
  create: (input: AddCartItemRepository.Input) => Promise<AddCartItemRepository.Output>
}

export namespace AddCartItemRepository {
  export type Input = { cartId: string, productId: string }

  export type Output = { id: string, cartId: string, productId: string, quantity: number }
}
