export class PermissionError extends Error {
  constructor () {
    super('Permission denied to perform this action')
    this.name = 'PermissionError'
  }
}
