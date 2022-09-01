import { FC } from "react"

const Button: FC<JSX.IntrinsicElements['button']> = (props) => {
    return (
        <button {...props} className={`inline-flex items-center py-2 px-6 text-sm font-medium text-center text-black focus:ring-4 focus:outline-none bg-[#FF9DD0] rounded-md ${props.className}`}>
        </button>
    )
}
export default Button;