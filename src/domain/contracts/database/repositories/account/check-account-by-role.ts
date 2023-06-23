export interface CheckAccountByRole {
  checkByRole: (input: CheckAccountByRole.Input) => Promise<CheckAccountByRole.Output>
}

export namespace CheckAccountByRole {
  export type Input = { accountId: string, role?: string }
  export type Output = boolean
}
