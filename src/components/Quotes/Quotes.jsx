import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

export default function Quotes() {
  const [quote, setQuote] = useState(null)

  const getRandomQuote = async () => {
    const { data } = await axios.get('https://api.goprogram.ai/inspiration')
    setQuote(data)
  }

  useEffect(() => {
    getRandomQuote()
  }, [])

  return (
    <>
      {quote && (
        <div className="border rounded-lg w-full text-center text-sm px-1 py-2 mt-4 cursor-wait select-none">
          <div className="font-mono antialiased mb-1 px-2">{quote?.quote}</div>
          <div className="font-mono text-xs antialiased mt-2">
            - {quote?.author}
          </div>
        </div>
      )}
    </>
  )
}
