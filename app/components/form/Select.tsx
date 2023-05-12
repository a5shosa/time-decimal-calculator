import { ChangeEventHandler } from "react"

export interface FormSelectOption {
  [name: string]: string
}

type FormSelectProps = {
  label: string
  name: string
  options: Array<FormSelectOption>
  tabIndex: number
  value: string
  onChange: ChangeEventHandler<HTMLSelectElement>
}

export const selectLabelClass = 'block mb-2 text-sm font-medium text-gray-900 dark:text-white'
export const selectClass = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'

export default function FormSelect(props: FormSelectProps) {
  const { label, name, tabIndex, value, options, onChange } = props

  return (
    <>
      <label 
        htmlFor={name}
        className={selectLabelClass}>
        {label}
      </label>
      <select
        name={name}
        id={name}
        tabIndex={tabIndex}
        value={value}
        className={selectClass}
        onChange={onChange}>
        {options.map((o: FormSelectOption, i: number) => {
          return <option key={i} value={o['value']}>{o['label']}</option>
        })}
      </select>
    </>
  )
}