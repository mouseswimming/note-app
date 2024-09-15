import { ComponentProps, useState } from 'react'

import { LuMoon, LuSun } from 'react-icons/lu'

export const ThemeToggle = ({ ...props }: ComponentProps<'div'>) => {
  const [isDarkMode, setDarkMode] = useState(false)
  const toggleTheme = async () => {
    const _isDarkMode = await window.context.toggle()
    setDarkMode(_isDarkMode)
  }

  return (
    <div className="absolute top-0 h-12 right-2 flex items-center" {...props}>
      <button
        className="border p-2 rounded-full dark:text-white border-zinc-400/50 hover:bg-zinc-200/50 hover:dark:bg-zinc-400/50 transition-colors duration-100"
        onClick={toggleTheme}
      >
        {isDarkMode ? <LuSun /> : <LuMoon />}
      </button>
    </div>
  )
}
