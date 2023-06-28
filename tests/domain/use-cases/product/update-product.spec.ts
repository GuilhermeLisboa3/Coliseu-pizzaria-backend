import { productParams, categoryParams } from '@/tests/mocks'
import { LoadProductRepository, CheckProductByNameRepository, UpdateProductRepository } from '@/domain/contracts/database/repositories/product'
import { CheckCategoryByIdRepository } from '@/domain/contracts/database/repositories/category'
import { UpdateProduct, updateProductUseCase } from '@/domain/use-cases/product'
import { UUIDGenerator, DeleteFile, UploadFile } from '@/domain/contracts/gateways'

import { mock } from 'jest-mock-extended'
import { FieldNotFoundError, FieldInUseError } from '@/domain/error'

describe('updateProductUseCase', () => {
  const { name, file, description, price, available, picture, error, key } = productParams
  const { id } = categoryParams
  const makeParams = { id, name, categoryId: id, description, price, file, available }

  const productRepository = mock<LoadProductRepository & CheckProductByNameRepository & UpdateProductRepository>()
  const categoryRepository = mock<CheckCategoryByIdRepository>()
  const uuid = mock<UUIDGenerator>()
  const fileStorage = mock<DeleteFile & UploadFile>()

  let sut: UpdateProduct

  beforeAll(() => {
    productRepository.load.mockResolvedValue({ id, name, description, price, categoryId: id, available, picture })
    productRepository.checkByName.mockResolvedValue(false)
    categoryRepository.checkById.mockResolvedValue(true)
    uuid.generate.mockReturnValue(key)
    fileStorage.upload.mockResolvedValue(picture)
  })

  beforeEach(() => {
    sut = updateProductUseCase(productRepository, categoryRepository, uuid, fileStorage)
  })

  it('should call LoadProductRepository with correct id', async () => {
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

  it('should call CheckProductByNameRepository with correct value', async () => {
    await sut(makeParams)

    expect(productRepository.checkByName).toHaveBeenCalledWith({ name })
    expect(productRepository.checkByName).toHaveBeenCalledTimes(1)
  })

  it('should throw FieldInUseError if CheckProductByNameRepository return true', async () => {
    productRepository.checkByName.mockResolvedValueOnce(true)

    const promise = sut(makeParams)

    await expect(promise).rejects.toThrow(new FieldInUseError('name'))
  })

  it('should rethrow if CheckProductByNameRepository throws', async () => {
    productRepository.checkByName.mockRejectedValueOnce(error)

    const promise = sut(makeParams)

    await expect(promise).rejects.toThrow(error)
  })

  it('should call CheckCategoryByIdRepository with correct value', async () => {
    await sut(makeParams)

    expect(categoryRepository.checkById).toHaveBeenCalledWith({ id })
    expect(categoryRepository.checkById).toHaveBeenCalledTimes(1)
  })

  it('should throw FieldNotFoundError if CheckCategoryByIdRepository return false', async () => {
    categoryRepository.checkById.mockResolvedValueOnce(false)

    const promise = sut(makeParams)

    await expect(promise).rejects.toThrow(new FieldNotFoundError('categoryId'))
  })

  it('should rethrow if CheckCategoryByIdRepository throws', async () => {
    categoryRepository.checkById.mockRejectedValueOnce(error)

    const promise = sut(makeParams)

    await expect(promise).rejects.toThrow(error)
  })

  it('should call UUIDGenerator', async () => {
    await sut(makeParams)

    expect(uuid.generate).toHaveBeenCalled()
    expect(uuid.generate).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if UUIDGenerator throws', async () => {
    uuid.generate.mockImplementationOnce(() => { throw error })

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

  it('should call UploadFile with correct values', async () => {
    await sut(makeParams)

    expect(fileStorage.upload).toHaveBeenCalledWith({ file: file.buffer, fileName: `${key}.${file.mimeType.split('/')[1]}` })
    expect(fileStorage.upload).toHaveBeenCalledTimes(1)
  })

  it('should rethrow if UploadFile throws', async () => {
    fileStorage.upload.mockRejectedValueOnce(error)

    const promise = sut(makeParams)

    await expect(promise).rejects.toThrow(error)
  })

  it('should call UpdateProductRepository with correct values', async () => {
    await sut(makeParams)

    expect(productRepository.update).toHaveBeenCalledWith({ id, name, description, price, categoryId: id, available, picture })
    expect(productRepository.update).toHaveBeenCalledTimes(1)
  })

  it('should call DeleteFile when file exists and AddProductRepository throws', async () => {
    productRepository.update.mockRejectedValueOnce(error)

    const promise = sut(makeParams)

    promise.catch(() => {
      expect(fileStorage.delete).toHaveBeenCalledWith({ fileName: `${key}.${file.mimeType.split('/')[1]}` })
      expect(fileStorage.delete).toHaveBeenCalledTimes(1)
    })
  })

  it('should not call DeleteFile when file does not exists and AddProductRepository throws', async () => {
    productRepository.update.mockRejectedValueOnce(error)

    const promise = sut({ id })

    promise.catch(() => {
      expect(fileStorage.delete).not.toHaveBeenCalled()
    })
  })
})
