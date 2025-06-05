import { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { QueryEditor } from '@/components/QueryEditor'
import { DataTable } from '@/components/DataTable'
import { QueryHistory } from '@/components/QueryHistory'
import { SavedQueries } from '@/components/SavedQueries'
import { SampleQueriesSidebar } from '@/components/SampleQueriesSidebar'
import { useDataset } from '@/contexts/DatasetContext'
import { toast } from 'sonner'
import {
    exportToCSV,
    exportToJSON,
    simulateQueryExecution,
} from '@/utils/querySimulator'
import { QueryConfirmationDialog } from '@/components/QueryConfirmationDialog'
import { StatsCards } from '@/components/StatsCards'
import { useStats } from '@/contexts/StatsContext'

interface QueryHistoryItem {
    id: string
    query: string
    timestamp: Date
    executionTime: number
}

interface SavedQuery {
    id: string
    name: string
    query: string
    savedAt: Date
}

const Index = () => {
    const [currentQuery, setCurrentQuery] = useState('')
    const [queryResult, setQueryResult] = useState<{
        data: any[]
        columns: string[]
        executionTime: number
        operationType?:
            | 'SELECT'
            | 'CREATE'
            | 'INSERT'
            | 'UPDATE'
            | 'DELETE'
            | 'DROP'
            | 'DUMP'
        message?: string
    }>({
        data: [],
        columns: [],
        executionTime: 0,
    })
    const [isLoading, setIsLoading] = useState(false)
    const [queryHistory, setQueryHistory] = useState<QueryHistoryItem[]>([])
    const [savedQueries, setSavedQueries] = useState<SavedQuery[]>([])
    const [totalResultRows, setTotalResultRows] = useState(0)
    const [confirmationDialog, setConfirmationDialog] = useState<{
        open: boolean
        query: string
        type: 'create' | 'delete' | 'dump'
    }>({
        open: false,
        query: '',
        type: 'create',
    })
    const { currentDataset } = useDataset()
    const { showStats } = useStats()

    // Load sample queries from the selected dataset
    useEffect(() => {
        if (currentDataset && currentDataset.sampleQueries.length > 0) {
            setCurrentQuery(currentDataset.sampleQueries[0])
        }
    }, [currentDataset])

    const getQueryType = (
        query: string
    ): 'create' | 'delete' | 'dump' | 'normal' => {
        const upperQuery = query.toUpperCase().trim()
        if (
            upperQuery.startsWith('CREATE') ||
            upperQuery.startsWith('INSERT') ||
            upperQuery.startsWith('ALTER')
        ) {
            return 'create'
        }
        if (upperQuery.startsWith('DELETE') || upperQuery.startsWith('DROP')) {
            return 'delete'
        }
        if (upperQuery.startsWith('DUMP')) {
            return 'dump'
        }
        return 'normal'
    }

    const handleRunQuery = async (query: string) => {
        if (!query.trim()) {
            toast.error('Please enter a query to execute')
            return
        }

        const queryType = getQueryType(query)

        // If it's a dangerous query type, show confirmation dialog
        if (queryType !== 'normal') {
            setConfirmationDialog({
                open: true,
                query,
                type: queryType,
            })
            return
        }

        // Execute normal queries directly
        await executeQuery(query)
    }

    const executeQuery = async (query: string) => {
        setIsLoading(true)
        try {
            const result = await simulateQueryExecution(query)
            setQueryResult({
                data: result.data,
                columns: result.columns,
                executionTime: result.executionTime,
                operationType: result.operationType,
                message: result.message,
            })

            // Add to history
            const historyItem: QueryHistoryItem = {
                id: Date.now().toString(),
                query,
                timestamp: new Date(),
                executionTime: result.executionTime,
            }
            setQueryHistory(prev => [historyItem, ...prev.slice(0, 19)]) // Keep last 20

            // Update total result rows
            setTotalResultRows(prev => prev + result.data.length)

            toast.success('Query executed successfully', {
                description: `Found ${result.rowCount} rows in ${result.executionTime}ms`,
            })
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message)
            }
            toast.error('Query execution failed', {
                description: 'An error occurred while executing the query',
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleConfirmQuery = () => {
        executeQuery(confirmationDialog.query)
        setConfirmationDialog({ ...confirmationDialog, open: false })
    }

    const handleSaveQuery = (query: string) => {
        const name = prompt('Enter a name for this query:')
        if (name) {
            const savedQuery: SavedQuery = {
                id: Date.now().toString(),
                name,
                query,
                savedAt: new Date(),
            }
            setSavedQueries(prev => [savedQuery, ...prev])
            toast.success(`Query saved as "${name}"`)
        }
    }

    const handleExport = (format: 'csv' | 'json') => {
        if (queryResult.data.length === 0) {
            toast.error('No data to export', {
                description: 'Please run a query first',
            })
            return
        }

        if (format === 'csv') {
            exportToCSV(queryResult.data, queryResult.columns)
        } else {
            exportToJSON(queryResult.data)
        }

        toast.success('Export successful', {
            description: `Data exported as ${format.toUpperCase()}`,
        })
    }

    const handleDeleteHistoryItem = (id: string) => {
        setQueryHistory(prev => prev.filter(item => item.id !== id))
    }

    const handleClearHistory = () => {
        setQueryHistory([])
        toast.success('History cleared', {
            description: 'Query history has been cleared',
        })
    }

    const handleDeleteSavedQuery = (id: string) => {
        setSavedQueries(prev => prev.filter(query => query.id !== id))
    }

    return (
        <div className="flex min-h-[calc(100vh-4rem)] w-full">
            {/* Left Sidebar - Hidden on mobile */}
            <div className="flex-col hidden md:flex w-80 bg-white border-r dark:bg-slate-900 border-slate-200 dark:border-slate-700">
                <SampleQueriesSidebar
                    currentDataset={currentDataset}
                    onSelectQuery={setCurrentQuery}
                />
                <div className="flex-1 flex flex-col min-h-0">
                    <Tabs
                        defaultValue="history"
                        className="w-full flex flex-col h-full"
                    >
                        <TabsList className="grid w-full grid-cols-2 flex-shrink-0">
                            <TabsTrigger value="history">History</TabsTrigger>
                            <TabsTrigger value="saved">Saved</TabsTrigger>
                        </TabsList>
                        <TabsContent
                            className="flex-1 min-h-0 m-0 p-0"
                            value="history"
                        >
                            <QueryHistory
                                history={queryHistory}
                                onSelectQuery={setCurrentQuery}
                                onDeleteQuery={handleDeleteHistoryItem}
                                onClearHistory={handleClearHistory}
                            />
                        </TabsContent>
                        <TabsContent
                            className="flex-1 min-h-0 m-0 p-0"
                            value="saved"
                        >
                            <SavedQueries
                                savedQueries={savedQueries}
                                onSelectQuery={setCurrentQuery}
                                onDeleteQuery={handleDeleteSavedQuery}
                            />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex min-w-0">
                {/* Center Content */}
                <div className="flex-1 p-4 space-y-4 min-w-0">
                    {showStats && (
                        <StatsCards
                            queryHistory={queryHistory}
                            totalResultRows={totalResultRows}
                        />
                    )}
                    {/* Query Editor */}
                    <QueryEditor
                        onRunQuery={handleRunQuery}
                        onSaveQuery={handleSaveQuery}
                        currentQuery={currentQuery}
                        setCurrentQuery={setCurrentQuery}
                        isLoading={isLoading}
                    />

                    {/* Results Table */}
                    <DataTable
                        data={queryResult.data}
                        columns={queryResult.columns}
                        queryExecutionTime={queryResult.executionTime}
                        onExport={handleExport}
                        operationType={queryResult.operationType}
                        message={queryResult.message}
                    />
                </div>
            </div>
            <QueryConfirmationDialog
                open={confirmationDialog.open}
                onOpenChange={open =>
                    setConfirmationDialog({ ...confirmationDialog, open })
                }
                query={confirmationDialog.query}
                type={confirmationDialog.type}
                onConfirm={handleConfirmQuery}
            />
        </div>
    )
}

export default Index
