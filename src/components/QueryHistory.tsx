import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, Trash2, Play } from 'lucide-react'

interface QueryHistoryItem {
    id: string
    query: string
    timestamp: Date
    executionTime: number
}

interface QueryHistoryProps {
    history: QueryHistoryItem[]
    onSelectQuery: (query: string) => void
    onDeleteQuery: (id: string) => void
    onClearHistory: () => void
}

export const QueryHistory: React.FC<QueryHistoryProps> = ({
    history,
    onSelectQuery,
    onDeleteQuery,
    onClearHistory,
}) => {
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString()
    }

    const truncateQuery = (query: string, maxLength: number = 60) => {
        return query.length > maxLength
            ? query.substring(0, maxLength) + '...'
            : query
    }

    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="pb-3 flex-shrink-0">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
                        Query History
                    </CardTitle>
                    {history.length > 0 && (
                        <Button
                            onClick={onClearHistory}
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                        >
                            Clear All
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent className="flex-1 min-h-0 p-0">
                <div className="h-full overflow-y-auto custom-scrollbar max-h-80 p-6 pt-0">
                    {history.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            <Clock className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                            <p>No queries executed yet</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {history.map(item => (
                                <div
                                    key={item.id}
                                    className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 group"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <p className="font-mono text-sm text-gray-900 dark:text-white truncate">
                                                {truncateQuery(item.query)}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                {formatTime(item.timestamp)} •{' '}
                                                {item.executionTime}ms
                                            </p>
                                        </div>
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button
                                                onClick={() =>
                                                    onSelectQuery(item.query)
                                                }
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0"
                                            >
                                                <Play className="h-3 w-3" />
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    onDeleteQuery(item.id)
                                                }
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                                            >
                                                <Trash2 className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
