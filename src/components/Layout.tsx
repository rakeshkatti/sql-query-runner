import { Database, Moon, Sun, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DatasetSelector } from './DatasetSelector'
import { useStats } from '@/contexts/StatsContext'
import { useTheme } from 'next-themes'

interface LayoutProps {
    children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    const { theme, setTheme } = useTheme()
    const { showStats, setShowStats } = useStats()

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
            <div className="bg-white dark:bg-slate-900 shadow-sm border-b dark:border-slate-700">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <Database className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                            <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                                SQL Query Runner
                            </h1>
                        </div>
                        <div className="flex items-center gap-2 lg:gap-4">
                            <DatasetSelector />
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setShowStats(!showStats)}
                                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                                >
                                    <BarChart3 className="h-5 w-5" />
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={toggleTheme}
                                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                                >
                                    {theme === 'dark' ? (
                                        <Sun className="h-5 w-5" />
                                    ) : (
                                        <Moon className="h-5 w-5" />
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex min-h-[calc(100vh-4rem)]">{children}</div>
        </div>
    )
}

export default Layout
