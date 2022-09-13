function isObject(item: unknown): boolean {
  return !!item && typeof item === 'object' && !Array.isArray(item)
}

function hasOwn(target: object, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(target, key)
}

export function merge<U>(target: any, source: any): U {
  const output = { ...target }

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!hasOwn(target, key)) {
          Object.assign(output, {
            [key]: source[key]
          })
        } else {
          Object.assign(output[key], merge(target[key], source[key]))
        }
      } else {
        Object.assign(output, {
          [key]: source[key]
        })
      }
    })
  }

  return output as U
}
