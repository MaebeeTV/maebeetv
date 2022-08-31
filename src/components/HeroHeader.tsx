import { FC } from "react";
export interface HeroHeaderProps {
    className?: string,
    children?: React.ReactNode
}

const HeroHeader: FC<HeroHeaderProps> = ({ className, children }) => {
    return (
        <div className={`py-32 px-8 text-black font-bold text-5xl text-center bg-[#FF9DD0] ${className}`}>
            <h1>
                {children}
            </h1>
        </div>
    )
}

export default HeroHeader;