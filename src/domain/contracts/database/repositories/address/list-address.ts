export interface ListAddressRepository {
  list: (input: ListAddressRepository.Input) => Promise<ListAddressRepository.Output>
}

export namespace ListAddressRepository {
  export type Input = {
    accountId: string
  }

  export type Output = Array<{
    id: string
    accountId: string
    surname: string
    zipCode: string
    neighborhood: string
    street: string
    number: number
    complement?: string
    active: boolean
  }>
}
