import { ChangeEventHandler } from "react"

type FormInputTextProps = {
  label: string
  name: string
  placeholder: string
  tabIndex: number
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

export const inputLabelClass = 'block mb-2 text-sm font-medium text-gray-900 dark:text-white'
export const inputTextClass = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'

export default function FormInputText(props: FormInputTextProps) {
  const { label, name, placeholder, tabIndex, value, onChange } = props

  return (
    <>
      <label 
        htmlFor={name}
        className={inputLabelClass}>
        {label}
      </label>
      <input
        type="text"
        name={name}
        id={name}
        tabIndex={tabIndex}
        placeholder={placeholder}
        value={value}
        className={inputTextClass}
        onChange={onChange} />
    </>
  )
}