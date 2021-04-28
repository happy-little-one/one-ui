export { default as http } from './http'

interface OptionItem {
  label: string
  value: string | number
}

export const OptionsToJson = (options: OptionItem[]): object =>
  options.reduce((acc, it) => ({ [it.value]: it.label, ...acc }), {})
