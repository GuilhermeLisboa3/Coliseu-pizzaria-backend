import { MinSizeError } from '@/application/errors'
import { Validator } from '@/application/validation'

export class MinSizeValidation implements Validator {
  constructor (private readonly value: string, private readonly minSize: number) {}

  validate (): Error | undefined {
    if (this.value.length < this.minSize) return new MinSizeError(this.minSize)
  }
}
