import { productParams } from '@/tests/mocks'
import { DeleteProductRepository, LoadProductRepository } from '@/domain/contracts/database/repositories/product'
import { DeleteProduct, deleteProductUseCase } from '@/domain/use-cases/product'

import { mock } from 'jest-mock-extended'
import { FieldNotFoundError } from '@/domain/error'
import { DeleteFile } from '@/domain/contracts/gateways'

describe('deleteProductUseCase', () => {
  const { id, name, description, price, available, picture, error } = productParams
  const makeParams = { id }

  const productRepository = mock<LoadProductRepository & DeleteProductRepository>()
  const fileStorage = mock<DeleteFile>()

  let sut: DeleteProduct

  beforeAll(() => {
    productRepository.load.mockResolvedValue({ id, name, description, price, categoryId: id, available, picture })
  })

  beforeEach(() => {
    sut = deleteProductUseCase(productRepository, fileStorage)
  })

  it('should call CheckProductByIdRepository with correct value', async () => {
    await sut(makeParams)

    expect(productRepository.load).toHaveBeenCalledWith({ id })
    expect(productRepository.load).toHaveBeenCalledTimes(1)
  })

  it('should throw FieldNotFoundError if LoadProductRepository return null', async () => {
    productRepository.load.mockResolvedValueOnce(null)

    const promise = sut(makeParams)

    await expect(promise).rejects.toThrow(new FieldNotFoundError('id'))
  })

  it('should rethrow if LoadProductRepository throws', async () => {
    productRepository.load.mockRejectedValueOnce(error)

    const promise = sut(makeParams)

    await expect(promise).rejects.toThrow(error)
  })

  it('should call DeleteFile if product has picture', async () => {
    await sut(makeParams)

    expect(fileStorage.delete).toHaveBeenCalledWith({ fileName: picture })
    expect(fileStorage.delete).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if DeleteFile throws', async () => {
    fileStorage.delete.mockRejectedValueOnce(error)

    const promise = sut(makeParams)

    await expect(promise).rejects.toThrow(error)
  })

  it('should call DeleteProductRepository with correct value', async () => {
    await sut(makeParams)

    expect(productRepository.delete).toHaveBeenCalledWith({ id })
    expect(productRepository.delete).toHaveBeenCalledTimes(1)
  })
})
