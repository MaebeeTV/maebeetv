import { FC } from "react";

export interface SpinnerProps {
    className?: string
}

const Spinner: FC<SpinnerProps> = ({ className }) => {
    return (
        <div className={`spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full ${className}`} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}

export default Spinner;