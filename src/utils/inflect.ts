export function inflect([single, plural]: [single: string, plural: string], length: number) {
  return length === 1 ? single : plural
}
