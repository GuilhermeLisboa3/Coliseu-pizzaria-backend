type Input = { accountId: string }
type Output = Array<{
  id: string
  surname: string
  zipCode: string
  neighborhood: string
  street: string
  number: number
  complement?: string
  accountId: string
  active: boolean
}>
export type ListAddresses = (input: Input) => Promise<Output>
