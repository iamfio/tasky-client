import { useState } from 'react'

export default function useSelect(initialValue) {
    const [value, setValue] = useState(initialValue)

    const data = {
        value,
        onChange: e => {
            setValue(e.target.value)
        }
    }

    return [value, data]
}