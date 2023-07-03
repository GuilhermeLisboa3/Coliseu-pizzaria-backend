import { ListAddressRepository } from '@/domain/contracts/database/repositories/address'
import { prisma, PrismaHelper } from '@/infra/database/postgres/helpers'

export class AddressRepository implements ListAddressRepository {
  async list ({ accountId }: ListAddressRepository.Input): Promise<ListAddressRepository.Output> {
    const address = await prisma.address.findMany({ where: { user_id: accountId } })

    return address.map(address => PrismaHelper.addressMap(address))
  }
}
