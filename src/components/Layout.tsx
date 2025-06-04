import { useState } from 'react'
import { Database, Settings, Moon, Sun } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { getAllDatasetNames } from '@/data/sampleData'

interface LayoutProps {
    children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    const [selectedDataset, setSelectedDataset] = useState('')
    const [showSettings, setShowSettings] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [showStats, setShowStats] = useState(false)

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
                            <Select
                                value={selectedDataset}
                                onValueChange={setSelectedDataset}
                            >
                                <SelectTrigger className="w-32 lg:w-48">
                                    <SelectValue placeholder="Select dataset" />
                                </SelectTrigger>
                                <SelectContent>
                                    {getAllDatasetNames().map(name => (
                                        <SelectItem key={name} value={name}>
                                            {name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <div className="relative">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        setShowSettings(!showSettings)
                                    }
                                    className="flex items-center gap-2"
                                >
                                    <Settings className="h-4 w-4" />
                                    <span className="hidden lg:inline">
                                        Settings
                                    </span>
                                </Button>
                                {showSettings && (
                                    <div className="absolute right-0 top-12 z-50 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg shadow-lg p-4 min-w-[200px]">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    {isDarkMode ? (
                                                        <Moon className="h-4 w-4" />
                                                    ) : (
                                                        <Sun className="h-4 w-4" />
                                                    )}
                                                    <span className="text-sm font-medium">
                                                        Dark Mode
                                                    </span>
                                                </div>
                                                <Switch
                                                    checked={isDarkMode}
                                                    onCheckedChange={
                                                        setIsDarkMode
                                                    }
                                                />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium">
                                                    Show Stats
                                                </span>
                                                <Switch
                                                    checked={showStats}
                                                    onCheckedChange={
                                                        setShowStats
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
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
