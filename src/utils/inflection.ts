/**
 * A simple utility function to inflect (English) words or whole phrases based on the given length.
 */
export function inflect([single, plural]: [single: string, plural: string], length: number) {
  return length === 1 ? single : plural
}
