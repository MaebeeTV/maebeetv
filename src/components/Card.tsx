import { FC } from "react"

const Card: FC<{children: React.ReactNode, title?: string, className?: string}> = ({ children, title, className }) => {
  return (
    <div className={`block p-6 rounded-lg shadow-lg dark:backdrop-brightness-200 max-w-sm ${className}`}>
      <h5 className="text-gray-900 dark:text-gray-200 text-xl leading-tight font-medium mb-2">{title}</h5>
      <p className="text-gray-700 dark:text-gray-400 text-base">
        {children}
      </p>
    </div>
  )
}

export default Card