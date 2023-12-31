import { AllowedMimeTypesValidation, EmailValidation, Extension, MaxFileSizeValidation, MinSizeValidation, RequiredValidation, Validator } from '@/application/validation'

export class ValidationBuilder {
  private constructor (
    private readonly value: any,
    private readonly fieldName: string,
    private readonly validators: Validator[] = []
  ) {}

  static of (value: any, fieldName: string): ValidationBuilder {
    return new ValidationBuilder(value, fieldName)
  }

  required (): ValidationBuilder {
    this.validators.push(new RequiredValidation(this.value, this.fieldName))
    return this
  }

  email (): ValidationBuilder {
    this.validators.push(new EmailValidation(this.value, this.fieldName))
    return this
  }

  min (length: number): ValidationBuilder {
    this.validators.push(new MinSizeValidation(this.value, length))
    return this
  }

  image ({ AllowedMimeTypes, maxSizeInMb }: { AllowedMimeTypes: Extension[], maxSizeInMb: number }): ValidationBuilder {
    if (this.value?.mimeType) this.validators.push(new AllowedMimeTypesValidation(AllowedMimeTypes, this.value.mimeType))
    if (this.value?.buffer) this.validators.push(new MaxFileSizeValidation(maxSizeInMb, this.value.buffer))
    return this
  }

  build (): Validator [] {
    return this.validators
  }
}
