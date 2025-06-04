import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookmarkIcon, Play, Trash2 } from 'lucide-react'

interface SavedQuery {
    id: string
    name: string
    query: string
    savedAt: Date
}

interface SavedQueriesProps {
    savedQueries: SavedQuery[]
    onSelectQuery: (query: string) => void
    onDeleteQuery: (id: string) => void
}

export const SavedQueries: React.FC<SavedQueriesProps> = ({
    savedQueries,
    onSelectQuery,
    onDeleteQuery,
}) => {
    const truncateQuery = (query: string, maxLength: number = 50) => {
        return query.length > maxLength
            ? query.substring(0, maxLength) + '...'
            : query
    }

    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="pb-3 flex-shrink-0">
                <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
                    Saved Queries
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 min-h-0 p-0">
                <div className="h-full overflow-y-auto custom-scrollbar max-h-80 p-6 pt-0">
                    {savedQueries.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            <BookmarkIcon className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                            <p>No saved queries</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {savedQueries.map(query => (
                                <div
                                    key={query.id}
                                    className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 group"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-sm text-gray-900 dark:text-white">
                                                {query.name}
                                            </p>
                                            <p className="font-mono text-xs text-gray-600 dark:text-gray-300 mt-1 truncate">
                                                {truncateQuery(query.query)}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                Saved{' '}
                                                {query.savedAt.toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button
                                                onClick={() =>
                                                    onSelectQuery(query.query)
                                                }
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0"
                                            >
                                                <Play className="h-3 w-3" />
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    onDeleteQuery(query.id)
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
