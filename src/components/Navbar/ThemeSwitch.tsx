import { useState, useEffect, FC } from 'react'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'

const ThemeSwitch: FC = () => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  const toggled_theme = () => {
    return resolvedTheme === 'light' ? 'dark' : 'light';
  }

  const cap_first_letter = (s: string) => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
      
  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button className="mx-3 my-1 flex flex-1 justify-center items-center" title="Toggle Theme" onClick={() => { setTheme(toggled_theme()) }}>
      { resolvedTheme === 'light' ? <MoonIcon height="32px" /> : <SunIcon height="32px" /> }
    </button>
  )
}

export default ThemeSwitch