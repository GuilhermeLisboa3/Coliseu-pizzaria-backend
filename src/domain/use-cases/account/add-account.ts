import { AddAccountRepository, CheckAccountByEmailRepository } from '@/domain/contracts/database/repositories/account'
import { AddCartRepository } from '@/domain/contracts/database/repositories/cart'
import { HashGenerator } from '@/domain/contracts/gateways'
import { FieldInUseError } from '@/domain/error'

type Setup = (accountRepository: CheckAccountByEmailRepository & AddAccountRepository, hash: HashGenerator, cartRepository: AddCartRepository) => AddAccount
type Input = { name: string, email: string, password: string }
type Output = void
export type AddAccount = (input: Input) => Promise<Output>

export const addAccountUseCase: Setup = (accountRepository, hash, cartRepository) => async ({ name, email, password }) => {
  const emailExists = await accountRepository.checkByEmail({ email })
  if (emailExists) throw new FieldInUseError('email')
  const hashPassword = await hash.generate({ plaintext: password })
  const { id } = await accountRepository.create({ name, email, password: hashPassword })
  await cartRepository.create({ accountId: id })
}
