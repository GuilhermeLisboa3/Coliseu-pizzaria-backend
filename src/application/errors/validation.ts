export class RequiredFieldError extends Error {
  constructor (fieldName: string) {
    super(`The field ${fieldName} is required`)
    this.name = 'RequiredFieldError'
  }
}

export class InvalidFieldError extends Error {
  constructor (fieldName: string) {
    super(`Invalid field: ${fieldName}`)
    this.name = 'InvalidFieldError'
  }
}

export class MinSizeError extends Error {
  constructor (minSize: number) {
    super(`minimum size is ${minSize}`)
    this.name = 'MinSizeError'
  }
}
