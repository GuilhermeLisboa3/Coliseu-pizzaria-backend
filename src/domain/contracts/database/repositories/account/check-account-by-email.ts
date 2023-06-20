export interface CheckAccountByEmailRepository {
  checkByEmail: (input: { email: string }) => Promise<boolean>
}

export namespace CheckAccountByEmailRepository {
  export type Input = { email: string }
  export type Output = boolean
}
