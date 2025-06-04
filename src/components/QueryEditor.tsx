import React from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Play, Save } from 'lucide-react'

interface QueryEditorProps {
    onRunQuery: (query: string) => void
    onSaveQuery: (query: string) => void
    currentQuery: string
    setCurrentQuery: (query: string) => void
    isLoading: boolean
}

export const QueryEditor: React.FC<QueryEditorProps> = ({
    onRunQuery,
    onSaveQuery,
    currentQuery,
    setCurrentQuery,
    isLoading,
}) => {
    const handleRunQuery = () => {
        if (currentQuery.trim()) {
            onRunQuery(currentQuery)
        }
    }

    const handleSaveQuery = () => {
        if (currentQuery.trim()) {
            onSaveQuery(currentQuery)
        }
    }

    return (
        <Card className="h-fit dark:bg-slate-800 dark:border-slate-700">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
                        SQL Query Editor
                    </CardTitle>
                    <div className="flex gap-2">
                        <Button
                            onClick={handleSaveQuery}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2"
                        >
                            <Save className="h-4 w-4" />
                            Save
                        </Button>
                        <Button
                            onClick={handleRunQuery}
                            disabled={!currentQuery.trim() || isLoading}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                        >
                            <Play className="h-4 w-4" />
                            {isLoading ? 'Running...' : 'Run Query'}
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pb-3">
                <Textarea
                    placeholder="Enter your SQL query here..."
                    value={currentQuery}
                    onChange={e => setCurrentQuery(e.target.value)}
                    className="min-h-[150px] font-mono text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                    style={{
                        fontFamily:
                            'Monaco, Consolas, "Lucida Console", monospace',
                    }}
                />
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Tip: Press Ctrl+Enter to run the query quickly
                </div>
            </CardContent>
        </Card>
    )
}
