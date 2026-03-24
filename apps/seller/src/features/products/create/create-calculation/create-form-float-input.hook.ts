import { useEffect, useState } from 'react'

export function useFloatInput(
  value: number | null,
  onChange: (value: number | null) => void,
) {
  const [inputValue, setInputValue] = useState<string>(
    value !== null ? String(value) : '',
  )

  useEffect(() => {
    const stringVal = value !== null ? String(value) : ''

    if (value !== null && Number(inputValue) !== value) {
      setInputValue(stringVal)
    } else if (value === null && inputValue !== '') {
      setInputValue(stringVal)
    }

    // if (Number(stringVal) !== Number(inputValue)) {
    //   setInputValue(stringVal)
    // }
  }, [value, inputValue])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/[^0-9.]/g, '')
    const parts = val.split('.')
    if (parts.length > 2) val = parts[0] + '.' + parts.slice(1).join('')

    setInputValue(val)

    if (val === '' || val === '.') {
      onChange(null)
    } else {
      const num = Number(val)
      if (!isNaN(num)) onChange(num)
    }
  }

  const handleNull = () => {
    setInputValue('')
    onChange(null)
  }

  return { displayValue: inputValue, handleChange, handleNull }
}
