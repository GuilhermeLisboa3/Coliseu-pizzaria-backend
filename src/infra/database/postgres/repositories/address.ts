import { ListAddressRepository, AddAddressRepository } from '@/domain/contracts/database/repositories/address'
import { prisma, PrismaHelper } from '@/infra/database/postgres/helpers'

export class AddressRepository implements ListAddressRepository, AddAddressRepository {
  async list ({ accountId }: ListAddressRepository.Input): Promise<ListAddressRepository.Output> {
    const addresses = await prisma.address.findMany({ where: { user_id: accountId } })

    return addresses.map(address => PrismaHelper.addressMap(address))
  }

  async create ({ accountId, ...input }: AddAddressRepository.Input): Promise<AddAddressRepository.Output> {
    const address = await prisma.address.create({ data: { user_id: accountId, ...input } })

    return PrismaHelper.addressMap(address)
  }
}
