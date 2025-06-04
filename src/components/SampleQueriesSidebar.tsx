import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Dataset } from '@/data/sampleData'
import { Code } from 'lucide-react'

interface SampleQueriesSidebarProps {
    currentDataset: Dataset | undefined
    onSelectQuery: (query: string) => void
}

export const SampleQueriesSidebar: React.FC<SampleQueriesSidebarProps> = ({
    currentDataset,
    onSelectQuery,
}) => {
    if (!currentDataset) return null

    return (
        <div className="h-1/2 max-h-[50vh] flex flex-col overflow-hidden">
            <div className="p-6 pb-3 flex-shrink-0">
                <div className="flex items-center gap-3 mb-4">
                    <Code className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Sample Queries
                    </h2>
                </div>
            </div>

            <div className="flex-1 px-6 pb-6 min-h-0">
                <Card className="dark:bg-slate-800 dark:border-slate-700 h-full flex flex-col">
                    <CardHeader className="pb-3 flex-shrink-0">
                        <CardTitle className="text-base font-medium text-gray-800 dark:text-white">
                            {currentDataset.name}
                        </CardTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            {currentDataset.description}
                        </p>
                    </CardHeader>
                    <CardContent className="flex-1 min-h-0 p-0">
                        <div className="h-full overflow-y-auto custom-scrollbar max-h-80">
                            <div className="space-y-2 p-6 pt-0">
                                {currentDataset.sampleQueries.map(
                                    (query, index) => (
                                        <Button
                                            key={index}
                                            variant="ghost"
                                            className="w-full justify-start text-left font-mono text-xs h-auto p-3 whitespace-pre-wrap bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600"
                                            onClick={() => onSelectQuery(query)}
                                        >
                                            {query}
                                        </Button>
                                    )
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
