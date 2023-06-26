import { productParams, categoryParams } from '@/tests/mocks'
import { CheckProductByNameRepository, AddProductRepository } from '@/domain/contracts/database/repositories/product'
import { CheckCategoryByIdRepository } from '@/domain/contracts/database/repositories/category'
import { UUIDGenerator, UploadFile, DeleteFile } from '@/domain/contracts/gateways'
import { AddProduct, addProductUseCase } from '@/domain/use-cases/product'

import { mock } from 'jest-mock-extended'
import { FieldInUseError, FieldNotFoundError } from '@/domain/error'

describe('AddProductUseCase', () => {
  const { name, error, key, file, description, price, picture } = productParams
  const { id } = categoryParams
  const makeParams = { name, categoryId: id, description, price, file }

  const productRepository = mock<CheckProductByNameRepository & AddProductRepository>()
  const categoryRepository = mock<CheckCategoryByIdRepository>()
  const uuid = mock<UUIDGenerator>()
  const fileStorage = mock<UploadFile & DeleteFile>()

  let sut: AddProduct

  beforeAll(() => {
    categoryRepository.checkById.mockResolvedValue(true)
    uuid.generate.mockReturnValue(key)
    fileStorage.upload.mockResolvedValue(picture)
  })

  beforeEach(() => {
    sut = addProductUseCase(productRepository, categoryRepository, uuid, fileStorage)
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

  it('should throw FieldNotFoundError if CheckCategoryByIdRepository return true', async () => {
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

  it('should call AddProductRepository with correct values', async () => {
    await sut(makeParams)

    expect(productRepository.create).toHaveBeenCalledWith({ name, description, price, picture, categoryId: id })
    expect(productRepository.create).toHaveBeenCalledTimes(1)
  })

  it('should call DeleteFile when file exists and AddProductRepository throws', async () => {
    productRepository.create.mockRejectedValueOnce(error)

    const promise = sut(makeParams)

    promise.catch(() => {
      expect(fileStorage.delete).toHaveBeenCalledWith({ fileName: `${key}.${file.mimeType.split('/')[1]}` })
      expect(fileStorage.delete).toHaveBeenCalledTimes(1)
    })
  })

  it('should not call DeleteFile when file does not exists and AddProductRepository throws', async () => {
    productRepository.create.mockRejectedValueOnce(error)

    const promise = sut({ categoryId: id, name, description, price })

    promise.catch(() => {
      expect(fileStorage.delete).not.toHaveBeenCalled()
    })
  })
})
