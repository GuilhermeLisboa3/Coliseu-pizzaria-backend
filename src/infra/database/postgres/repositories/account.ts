import { AddAccountRepository, CheckAccountByEmailRepository, LoadAccountByEmailRepository, CheckAccountByRole } from '@/domain/contracts/database/repositories/account'
import { prisma } from '@/infra/database/postgres/helpers'

export class AccountRepository implements CheckAccountByEmailRepository, AddAccountRepository, LoadAccountByEmailRepository, CheckAccountByRole {
  async checkByEmail ({ email }: CheckAccountByEmailRepository.Input): Promise<CheckAccountByEmailRepository.Output> {
    const isValid = await prisma.user.findFirst({ where: { email } })

    return isValid != null
  }

  async create ({ email, name, password }: AddAccountRepository.Input): Promise<AddAccountRepository.Output> {
    const { id } = await prisma.user.create({ data: { name, email, password } })
    return { id }
  }

  async loadByEmail ({ email }: LoadAccountByEmailRepository.Input): Promise<LoadAccountByEmailRepository.Output> {
    return await prisma.user.findFirst({ where: { email } })
  }

  async checkByRole ({ accountId, role }: CheckAccountByRole.Input): Promise<CheckAccountByRole.Output> {
    return !!await prisma.user.findFirst({ where: { id: accountId, OR: [{ role: role ?? 'user' }, { role: 'admin' }] } })
  }
}
