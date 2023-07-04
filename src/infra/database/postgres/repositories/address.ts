import { ListAddressRepository, AddAddressRepository, CheckAddressByIdRepository, DeleteAddressRepository, UpdateAddressRepository } from '@/domain/contracts/database/repositories/address'
import { prisma, PrismaHelper } from '@/infra/database/postgres/helpers'

export class AddressRepository implements ListAddressRepository, AddAddressRepository, CheckAddressByIdRepository, DeleteAddressRepository, UpdateAddressRepository {
  async list ({ accountId }: ListAddressRepository.Input): Promise<ListAddressRepository.Output> {
    const addresses = await prisma.address.findMany({ where: { user_id: accountId } })

    return addresses.map(address => PrismaHelper.addressMap(address))
  }

  async create ({ accountId, ...input }: AddAddressRepository.Input): Promise<AddAddressRepository.Output> {
    const address = await prisma.address.create({ data: { user_id: accountId, ...input } })

    return PrismaHelper.addressMap(address)
  }

  async checkById ({ id }: CheckAddressByIdRepository.Input): Promise<CheckAddressByIdRepository.Output> {
    const address = await prisma.address.findFirst({ where: { id } })

    return address != null
  }

  async delete ({ id }: DeleteAddressRepository.Input): Promise<DeleteAddressRepository.Output> {
    await prisma.address.delete({ where: { id } })
  }

  async update ({ id, active, complement, number, surname }: UpdateAddressRepository.Input): Promise<UpdateAddressRepository.Output> {
    await prisma.address.update({ where: { id }, data: { active, complement, number, surname } })
  }
}
