import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useDataset } from '@/contexts/DatasetContext'
import {
    Database,
    FileText,
    Clock,
    Zap,
    Settings,
    BarChart3,
    Timer,
    Activity,
} from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu'

interface QueryHistoryItem {
    id: string
    query: string
    timestamp: Date
    executionTime: number
    resultCount?: number
}

interface StatCard {
    id: string
    title: string
    icon: React.ComponentType<{ className?: string }>
    color: string
    getValue: (data: StatsData) => string | number
    visible: boolean
}

interface StatsData {
    selectedDataset: string
    totalResultRows: number
    queryHistory: QueryHistoryItem[]
}

interface StatsCardsProps {
    queryHistory: QueryHistoryItem[]
    totalResultRows?: number
}

const defaultCards: StatCard[] = [
    {
        id: 'dataset',
        title: 'Dataset',
        icon: Database,
        color: 'text-blue-600 dark:text-blue-400',
        getValue: data => data.selectedDataset,
        visible: true,
    },
    {
        id: 'records',
        title: 'Total Records',
        icon: FileText,
        color: 'text-green-600 dark:text-green-400',
        getValue: data => data.totalResultRows.toLocaleString(),
        visible: true,
    },
    {
        id: 'queries',
        title: 'Queries',
        icon: Clock,
        color: 'text-purple-600 dark:text-purple-400',
        getValue: data => data.queryHistory.length,
        visible: true,
    },
    {
        id: 'avgSpeed',
        title: 'Avg Speed',
        icon: Zap,
        color: 'text-orange-600 dark:text-orange-400',
        getValue: data => {
            if (data.queryHistory.length === 0) return '0ms'
            const avg = Math.round(
                data.queryHistory.reduce((acc, q) => acc + q.executionTime, 0) /
                    data.queryHistory.length
            )
            return `${avg}ms`
        },
        visible: true,
    },
    {
        id: 'totalTime',
        title: 'Total Time',
        icon: Timer,
        color: 'text-red-600 dark:text-red-400',
        getValue: data => {
            const total = data.queryHistory.reduce(
                (acc, q) => acc + q.executionTime,
                0
            )
            return `${total}ms`
        },
        visible: false,
    },
    {
        id: 'maxSpeed',
        title: 'Max Speed',
        icon: Activity,
        color: 'text-indigo-600 dark:text-indigo-400',
        getValue: data => {
            if (data.queryHistory.length === 0) return '0ms'
            const max = Math.max(...data.queryHistory.map(q => q.executionTime))
            return `${max}ms`
        },
        visible: false,
    },
]

export const StatsCards: React.FC<StatsCardsProps> = ({
    queryHistory,
    totalResultRows = 0,
}) => {
    const { selectedDataset } = useDataset()
    const [cards, setCards] = useState<StatCard[]>(defaultCards)
    // const [isCustomizing, setIsCustomizing] = useState(false)

    const statsData: StatsData = {
        selectedDataset,
        totalResultRows,
        queryHistory,
    }

    const visibleCards = cards.filter(card => card.visible)

    const toggleCardVisibility = (cardId: string) => {
        setCards(prev =>
            prev.map(card =>
                card.id === cardId ? { ...card, visible: !card.visible } : card
            )
        )
    }

    // const moveCard = (cardId: string, direction: 'up' | 'down') => {
    //     setCards(prev => {
    //         const currentIndex = prev.findIndex(card => card.id === cardId)
    //         if (currentIndex === -1) return prev

    //         const newIndex =
    //             direction === 'up' ? currentIndex - 1 : currentIndex + 1
    //         if (newIndex < 0 || newIndex >= prev.length) return prev

    //         const newCards = [...prev]
    //         const [movedCard] = newCards.splice(currentIndex, 1)
    //         newCards.splice(newIndex, 0, movedCard)
    //         return newCards
    //     })
    // }

    const resetToDefault = () => {
        setCards(defaultCards)
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Statistics
                </h3>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                        >
                            <Settings className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>Customize Cards</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {cards.map(card => (
                            <DropdownMenuCheckboxItem
                                key={card.id}
                                checked={card.visible}
                                onCheckedChange={() =>
                                    toggleCardVisibility(card.id)
                                }
                            >
                                <card.icon
                                    className={`h-4 w-4 mr-2 ${card.color}`}
                                />
                                {card.title}
                            </DropdownMenuCheckboxItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={resetToDefault}>
                            Reset to Default
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div
                className={`grid gap-2 ${
                    visibleCards.length === 1
                        ? 'grid-cols-1'
                        : visibleCards.length === 2
                          ? 'grid-cols-2'
                          : visibleCards.length === 3
                            ? 'grid-cols-3'
                            : 'grid-cols-2 lg:grid-cols-4'
                }`}
            >
                {visibleCards.map(card => {
                    const IconComponent = card.icon
                    const value = card.getValue(statsData)

                    return (
                        <Card
                            key={card.id}
                            className="dark:bg-slate-800 dark:border-slate-700"
                        >
                            <CardContent className="p-3">
                                <div className="flex items-center">
                                    <IconComponent
                                        className={`h-5 w-5 ${card.color} flex-shrink-0`}
                                    />
                                    <div className="ml-2 min-w-0 flex-1">
                                        <p className="text-xs font-medium text-gray-600 dark:text-gray-300 truncate">
                                            {card.title}
                                        </p>
                                        <p className="text-lg font-bold text-gray-900 dark:text-white truncate">
                                            {value}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {visibleCards.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <BarChart3 className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No statistics cards selected</p>
                    <p className="text-xs">
                        Use the settings menu to show cards
                    </p>
                </div>
            )}
        </div>
    )
}
