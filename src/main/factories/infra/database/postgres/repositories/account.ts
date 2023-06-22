import { AccountRepository } from '@/infra/database/postgres/repositories'
export const makeAccountRepository = (): AccountRepository => {
  return new AccountRepository()
}
