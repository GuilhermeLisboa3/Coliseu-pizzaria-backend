import { CheckAccountByEmailRepository } from '@/domain/contracts/database/repositories/account'
import { prisma } from '@/infra/database/postgres/helpers'

export class AccountRepository implements CheckAccountByEmailRepository {
  async checkByEmail ({ email }: CheckAccountByEmailRepository.Input): Promise<CheckAccountByEmailRepository.Output> {
    const isValid = await prisma.user.findFirst({ where: { email } })

    return isValid != null
  }
}
