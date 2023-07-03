export interface LoadAddressRepository {
  load: (input: LoadAddressRepository.Input) => Promise<LoadAddressRepository.Output>
}

export namespace LoadAddressRepository {
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
