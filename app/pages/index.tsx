import FormButton, { alternativeButtonClass } from '@/components/form/Button';
import FormInputText from '@/components/form/InputText';
import FormSelect from '@/components/form/Select';
import MainHeader from '@/components/main/Header';
import { Inter } from 'next/font/google'
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [formData, setFormData] = useState({
    timeFrom: "",
    timeLogic: "diff",
    timeTo: "",
    decimalFrom: "",
    decimalLogic: "diff",
    decimalTo: "",
    log: ""
  })

  const logics = [
    { value: 'diff', label: '差（Δ)', operator: 'Δ' },
    { value: 'plus', label: '加算（+）', operator: '+' },
    { value: 'minus', label: '減算（-）', operator: '-' },
  ]

  const convertTimeToDecimal = (hhMM: string): number => {
    if (hhMM.length != 5) return 0
    if (hhMM.split(':').length != 2) return 0

    const hourAndMinute = hhMM.split(':')
    const hour = parseInt(hourAndMinute[0])
    const minute = parseInt(hourAndMinute[1])
    const minuteDecimal = minute / 60

    return parseFloat((hour + minuteDecimal).toFixed(3))
  }

  const convertDecimalToTime = (decimal: number): string => {
    if (!decimal) return ''

    const decimalString = decimal.toString()
    const hourAndMinute = decimalString.split('.')
    const hour = parseInt(hourAndMinute[0])
    const minute = parseFloat(`0.${hourAndMinute[1]}`)
    const minutesDecimal = minute * 60

    return `${('00' + hour).slice(-2)}:${('00' + minutesDecimal.toFixed(0)).slice(-2)}`
  }

  const calcAndResultText = (a: number, logic: string, b:number): string => {
    let result

    if (logic === 'diff') {
      result = b > a ? (b - a) : (a - b)
    } else if (logic === 'plus') {
      result = a + b
    } else if (logic === 'minus') {
      result = a - b
    }

    if (result === 0) return '0'
    return !!result ? result.toFixed(3).toString() : 'FAILED'
  }

  const isValidForCalcDecimal = () => {
    const a: number = parseFloat(formData.decimalFrom)
    const b: number = parseFloat(formData.decimalTo)

    return (a && b) ? true : false
  }

  const isValidForCalcTime = () => {
    const a: number = convertTimeToDecimal(formData.timeFrom)
    const b: number = convertTimeToDecimal(formData.timeTo)

    return (a && b) ? true : false
  }

  const labelLogic = (logic: string) => logics.find((l) => l.value === logic)?.operator

  const handleInput = (e: any) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({...prevState, [fieldName]: fieldValue}))
  }

  const handleClickTimeCalc = () => {
    const a: number = convertTimeToDecimal(formData.timeFrom)
    const b: number = convertTimeToDecimal(formData.timeTo)

    if (a && b) {
      const result = calcAndResultText(a, formData.timeLogic, b)
      const now = new Date().toLocaleString('ja-JP')
      const append = `[${now}] HH:MMの計算 `
        + `${a}(${formData.timeFrom}) `
        + `${labelLogic(formData.timeLogic)} `
        + `${b}(${formData.timeTo}) `
        + `= ${result}(${convertDecimalToTime(parseFloat(result))})`

      setFormData((prevState) => ({...prevState, ['log']: `${append}\n${formData.log}`}))
    }
  }

  const handleClickDecimalCalc = () => {
    const a: number = parseFloat(formData.decimalFrom)
    const b: number = parseFloat(formData.decimalTo)

    if (a && b) {
      const result = calcAndResultText(a, formData.decimalLogic, b)
      const now = new Date().toLocaleString('ja-JP')
      const append = `[${now}] 10進数の計算 `
        + `${formData.decimalFrom}(${convertDecimalToTime(a)}) `
        + `${labelLogic(formData.decimalLogic)} `
        + `${formData.decimalTo}(${convertDecimalToTime(b)}) `
        + `= ${parseFloat(result)}(${convertDecimalToTime(parseFloat(result))})`

      setFormData((prevState) => ({...prevState, ['log']: `${append}\n${formData.log}`}))
    }
  }

  const handleConvertTimeToDecimal = () => {
    const a: number = convertTimeToDecimal(formData.timeFrom)
    const b: number = convertTimeToDecimal(formData.timeTo)

    setFormData((prevState) => ({...prevState, ['decimalFrom']: `${a}`, ['decimalTo']: `${b}`,}))
  }

  const handleConvertDecimalToTime = () => {
    const a: string = convertDecimalToTime(parseFloat(formData.decimalFrom))
    const b: string = convertDecimalToTime(parseFloat(formData.decimalTo))

    setFormData((prevState) => ({...prevState, ['timeFrom']: `${a}`, ['timeTo']: `${b}`}))
  }

  const handleFlushLog = () => setFormData((prevState) => ({...prevState, ['log']: ''}))

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between minismartphone:p-3 minismartphone:pb-12 smartphone:p-4 smartphone:pb-12 tablet:p-6 laptop:p-16 ${inter.className}`}>
      <div
        className="container z-10 w-full max-w-5xl items-center justify-between font-mono text-sm grid grid-cols-3 gap-1">
        <div className="col-span-3 mb-6">
          <MainHeader />
        </div>

        <div className="col-span-3">
          <div className="grid grid-cols-3">
            <div className="col-span-1">
              <div className="mb-6">
                <FormInputText
                  label={'時刻(HH:MM)'}
                  name={'timeFrom'}
                  tabIndex={1}
                  placeholder={'09:00'}
                  value={formData.timeFrom}
                  onChange={handleInput} />
              </div>
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-1">
              <div className="mb-6">
                <FormInputText
                  label={'時刻(10進数)'}
                  name={'decimalFrom'}
                  tabIndex={7}
                  placeholder={'9.5'}
                  value={formData.decimalFrom}
                  onChange={handleInput} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-3">
          <div className="grid grid-cols-3">
            <div className="col-span-1">
              <div className="mb-6">
                <FormSelect
                  label={'計算方法'}
                  name={'timeLogic'}
                  options={logics}
                  tabIndex={2}
                  value={formData.timeLogic}
                  onChange={handleInput} />
              </div>
            </div>
            <div className="col-span-1 text-center">
              <div className="grid grid-cols-1">
                <div className="col-span-1">
                  <FormButton
                    label='10進数に変換→'
                    tabIndex={5}
                    onClick={handleConvertTimeToDecimal} />
                </div>
                <div className="col-span-1">
                  <FormButton
                    label='←HH:MMに変換'
                    tabIndex={6}
                    onClick={handleConvertDecimalToTime} />
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="mb-6">
                <FormSelect
                  label={'計算方法'}
                  name={'decimalLogic'}
                  options={logics}
                  tabIndex={8}
                  value={formData.decimalLogic}
                  onChange={handleInput} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-3">
          <div className="grid grid-cols-3">
            <div className="col-span-1">
              <div className="mb-6">
                <FormInputText
                  label={'時刻(HH:MM)'}
                  name={'timeTo'}
                  tabIndex={3}
                  placeholder={'12:00'}
                  value={formData.timeTo}
                  onChange={handleInput} />
              </div>
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-1">
              <div className="mb-6">
                <FormInputText
                  label={'時刻(10進数)'}
                  name={'decimalTo'}
                  tabIndex={9}
                  placeholder={'12.0'}
                  value={formData.decimalTo}
                  onChange={handleInput} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-3">
          <div className="grid grid-cols-3">
            <div className="col-span-1">
              <div className="mb-6 text-center">
                <FormButton
                  disabled={!isValidForCalcTime()}
                  label='HH:MM計算'
                  tabIndex={4}
                  onClick={handleClickTimeCalc} />
              </div>
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-1">
              <div className="mb-6 text-center">
                <FormButton
                  disabled={!isValidForCalcDecimal()}
                  label='10進数計算'
                  tabIndex={10}
                  onClick={handleClickDecimalCalc} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-3">
          <h2 className="mb-2">計算ログ</h2>
          <div
            className="w-full p-0 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-6">
            <textarea
              tabIndex={11}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              style={{ height: '170px' }}
              readOnly
              value={formData.log}>
            </textarea>
          </div>
          <FormButton
            buttonClass={alternativeButtonClass}
            label='計算ログを削除'
            tabIndex={12}
            onClick={handleFlushLog} />
        </div>
        <div className="col-span-3 grid-cols-12">
          <div className="col-span-8 text-left">
            <small className="text-slate-400">
              ※ 計算ログはサーバやcookieで収集・保存していません。 ※ ブラウザのリロードでも、計算ログが消去されます。
            </small>
          </div>
          <div className="col-span-4 text-right minismartphone:mt-2">
            <small className="text-slate-400">
              <Link target="_blank" href="https://github.com/a5shosa/time-decimal-calculator/issues">send feedback</Link>
              &nbsp;/&nbsp;
              <Link target="_blank" href="https://www.a5shosa.com/">a5shosa.com</Link>
            </small>
          </div>
        </div>
      </div>
    </main>
  )
}