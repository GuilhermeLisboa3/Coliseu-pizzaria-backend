export interface SearchAddressByZipCode {
  search: (input: SearchAddressByZipCode.Input) => Promise<SearchAddressByZipCode.Output>
}

export namespace SearchAddressByZipCode {
  export type Input = { zipCode: string }
  export type Output = { neighborhood: string, street: string } | undefined
}
