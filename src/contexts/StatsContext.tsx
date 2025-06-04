import { createContext, useContext, useState, type ReactNode } from 'react'

interface StatsContextType {
    showStats: boolean
    setShowStats: (showStats: boolean) => void
}

const StatsContext = createContext<StatsContextType | undefined>(undefined)

export const StatsProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [showStats, setShowStats] = useState(true)

    return (
        <StatsContext.Provider value={{ showStats, setShowStats }}>
            {children}
        </StatsContext.Provider>
    )
}

export const useStats = () => {
    const context = useContext(StatsContext)
    if (context === undefined) {
        throw new Error('useStats must be used within a StatsProvider')
    }
    return context
}
