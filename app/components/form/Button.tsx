import { MouseEventHandler } from "react"

type FormButtonProps = {
  buttonClass?: string
  disabled?: boolean
  label: string
  tabIndex: number
  onClick: MouseEventHandler<HTMLButtonElement>
}

export const primaryButtonClass = 'text-white m-auto bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-xs px-2 py-2 text-center mr-1 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
export const disabledButtonClass = `${primaryButtonClass} opacity-50 cursor-not-allowed`
export const alternativeButtonClass = 'py-2 px-6 mr-2 mb-2 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'

export default function FormButton(props: FormButtonProps) {
  const { buttonClass, disabled, label, tabIndex, onClick } = props

  const localButtonClass = disabled
    ? disabledButtonClass
    : buttonClass || primaryButtonClass

  return (
    <>
      <button
        type="button"
        disabled={disabled}
        tabIndex={tabIndex}
        className={localButtonClass}
        onClick={onClick}>
        {label}
      </button>
    </>
  )
}