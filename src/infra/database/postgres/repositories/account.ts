import { AddAccountRepository, CheckAccountByEmailRepository, LoadAccountByEmailRepository } from '@/domain/contracts/database/repositories/account'
import { prisma } from '@/infra/database/postgres/helpers'

export class AccountRepository implements CheckAccountByEmailRepository, AddAccountRepository, LoadAccountByEmailRepository {
  async checkByEmail ({ email }: CheckAccountByEmailRepository.Input): Promise<CheckAccountByEmailRepository.Output> {
    const isValid = await prisma.user.findFirst({ where: { email } })

    return isValid != null
  }

  async create ({ email, name, password }: AddAccountRepository.Input): Promise<AddAccountRepository.Output> {
    await prisma.user.create({ data: { name, email, password } })
  }

  async loadByEmail ({ email }: LoadAccountByEmailRepository.Input): Promise<LoadAccountByEmailRepository.Output> {
    return await prisma.user.findFirst({ where: { email } })
  }
}
