import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { useDataset } from '@/contexts/DatasetContext'
import { Database, FileText, Clock, Zap } from 'lucide-react'

interface QueryHistoryItem {
    id: string
    query: string
    timestamp: Date
    executionTime: number
    resultCount?: number
}

interface StatsCardsProps {
    queryHistory: QueryHistoryItem[]
    totalResultRows?: number
}

export const StatsCards: React.FC<StatsCardsProps> = ({
    queryHistory,
    totalResultRows = 0,
}) => {
    const { selectedDataset } = useDataset()

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
            <Card className="dark:bg-slate-800 dark:border-slate-700">
                <CardContent className="p-4 lg:p-6">
                    <div className="flex items-center">
                        <Database className="h-6 w-6 lg:h-8 lg:w-8 text-blue-600 dark:text-blue-400" />
                        <div className="ml-3 lg:ml-4 min-w-0">
                            <p className="text-xs lg:text-sm font-medium text-gray-600 dark:text-gray-300">
                                Dataset
                            </p>
                            <p className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white truncate">
                                {selectedDataset}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="dark:bg-slate-800 dark:border-slate-700">
                <CardContent className="p-4 lg:p-6">
                    <div className="flex items-center">
                        <FileText className="h-6 w-6 lg:h-8 lg:w-8 text-green-600 dark:text-green-400" />
                        <div className="ml-3 lg:ml-4">
                            <p className="text-xs lg:text-sm font-medium text-gray-600 dark:text-gray-300">
                                Total Records
                            </p>
                            <p className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                                {totalResultRows.toLocaleString()}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="dark:bg-slate-800 dark:border-slate-700">
                <CardContent className="p-4 lg:p-6">
                    <div className="flex items-center">
                        <Clock className="h-6 w-6 lg:h-8 lg:w-8 text-purple-600 dark:text-purple-400" />
                        <div className="ml-3 lg:ml-4">
                            <p className="text-xs lg:text-sm font-medium text-gray-600 dark:text-gray-300">
                                Queries
                            </p>
                            <p className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                                {queryHistory.length}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="dark:bg-slate-800 dark:border-slate-700">
                <CardContent className="p-4 lg:p-6">
                    <div className="flex items-center">
                        <Zap className="h-6 w-6 lg:h-8 lg:w-8 text-orange-600 dark:text-orange-400" />
                        <div className="ml-3 lg:ml-4">
                            <p className="text-xs lg:text-sm font-medium text-gray-600 dark:text-gray-300">
                                Avg Speed
                            </p>
                            <p className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                                {queryHistory.length > 0
                                    ? Math.round(
                                          queryHistory.reduce(
                                              (acc, q) => acc + q.executionTime,
                                              0
                                          ) / queryHistory.length
                                      )
                                    : 0}
                                ms
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
