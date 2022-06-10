export function to(strings: TemplateStringsArray) {
  const template = `[class$='_']`
  const input = strings.reduce((acc, next) => acc + next, String())

  return template.replace('_', input)
}
