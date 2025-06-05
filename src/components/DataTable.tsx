import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    Download,
    Search,
    ArrowUpDown,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react'

interface DataTableProps {
    data: any[]
    columns: string[]
    queryExecutionTime: number
    operationType?:
        | 'SELECT'
        | 'CREATE'
        | 'INSERT'
        | 'UPDATE'
        | 'DELETE'
        | 'DROP'
        | 'DUMP'
    message?: string
    onExport: (format: 'csv' | 'json') => void
}

export const DataTable: React.FC<DataTableProps> = ({
    data,
    columns,
    queryExecutionTime,
    operationType,
    message,
    onExport,
}) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [sortColumn, setSortColumn] = useState<string | null>(null)
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(25)

    // Rest of the existing SELECT operation logic
    const filteredAndSortedData = useMemo(() => {
        let filtered = data.filter(row =>
            Object.values(row).some(value =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
        )

        if (sortColumn) {
            filtered.sort((a, b) => {
                const aVal = a[sortColumn]
                const bVal = b[sortColumn]

                if (aVal === null || aVal === undefined) return 1
                if (bVal === null || bVal === undefined) return -1

                if (typeof aVal === 'number' && typeof bVal === 'number') {
                    return sortDirection === 'asc' ? aVal - bVal : bVal - aVal
                }

                const aStr = String(aVal).toLowerCase()
                const bStr = String(bVal).toLowerCase()
                const comparison = aStr.localeCompare(bStr)
                return sortDirection === 'asc' ? comparison : -comparison
            })
        }

        return filtered
    }, [data, searchTerm, sortColumn, sortDirection])

    const totalPages = Math.ceil(filteredAndSortedData.length / pageSize)
    const startIndex = (currentPage - 1) * pageSize
    const paginatedData = filteredAndSortedData.slice(
        startIndex,
        startIndex + pageSize
    )

    const handleSort = (column: string) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortColumn(column)
            setSortDirection('asc')
        }
        setCurrentPage(1)
    }

    const handlePageSizeChange = (newPageSize: number) => {
        setPageSize(newPageSize)
        setCurrentPage(1)
    }

    // For non-SELECT operations, show a simple success message
    if (operationType && operationType !== 'SELECT') {
        return (
            <Card className="dark:bg-slate-800 dark:border-slate-700">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-xl font-bold text-gray-800 dark:text-white">
                                {operationType} Operation Result
                            </CardTitle>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                Executed in {queryExecutionTime}ms
                            </p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                                <svg
                                    className="w-8 h-8 text-green-600 dark:text-green-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                Operation Successful
                            </h3>
                            <div className="text-gray-600 dark:text-gray-300 mb-4">
                                {message ||
                                    `${operationType} operation completed successfully`}
                            </div>
                            {data.length > 0 && (
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    Rows affected: {data.length}
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-xl font-bold text-gray-800 dark:text-white">
                            Query Results
                        </CardTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            {filteredAndSortedData.length} rows • Executed in{' '}
                            {queryExecutionTime}ms
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            onClick={() => onExport('csv')}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2"
                            disabled={data.length === 0}
                        >
                            <Download className="h-4 w-4" />
                            CSV
                        </Button>
                        <Button
                            onClick={() => onExport('json')}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2"
                            disabled={data.length === 0}
                        >
                            <Download className="h-4 w-4" />
                            JSON
                        </Button>
                    </div>
                </div>
                <div className="mt-4 flex gap-4 items-center">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search in results..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                            Rows per page:
                        </span>
                        <select
                            value={pageSize}
                            onChange={e =>
                                handlePageSizeChange(Number(e.target.value))
                            }
                            className="px-2 py-1 border rounded text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                        >
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                            <option value={500}>500</option>
                        </select>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {data.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                        <div className="text-lg font-medium mb-2">
                            No data to display
                        </div>
                        <div className="text-sm">
                            Run a query to see results here
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="overflow-auto custom-scrollbar max-h-[500px] border rounded dark:border-slate-600">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-50 dark:bg-slate-700">
                                        {columns.map(column => (
                                            <TableHead
                                                key={column}
                                                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600 sticky top-0 bg-gray-50 dark:bg-slate-700 font-semibold"
                                                onClick={() =>
                                                    handleSort(column)
                                                }
                                            >
                                                <div className="flex items-center gap-2">
                                                    {column}
                                                    <ArrowUpDown className="h-4 w-4 text-gray-400" />
                                                </div>
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginatedData.map((row, index) => (
                                        <TableRow
                                            key={index}
                                            className={`hover:bg-gray-50 dark:hover:bg-slate-700 ${
                                                index % 2 === 0
                                                    ? 'bg-white dark:bg-slate-800'
                                                    : 'bg-gray-25 dark:bg-slate-750'
                                            }`}
                                        >
                                            {columns.map(column => (
                                                <TableCell
                                                    key={column}
                                                    className="font-mono text-sm py-3"
                                                >
                                                    {String(row[column])}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        {totalPages > 1 && (
                            <div className="flex items-center justify-between mt-4">
                                <div className="text-sm text-gray-600 dark:text-gray-300">
                                    Showing {(currentPage - 1) * pageSize + 1}{' '}
                                    to{' '}
                                    {Math.min(
                                        currentPage * pageSize,
                                        filteredAndSortedData.length
                                    )}{' '}
                                    of {filteredAndSortedData.length} results
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        onClick={() =>
                                            setCurrentPage(
                                                Math.max(1, currentPage - 1)
                                            )
                                        }
                                        disabled={currentPage === 1}
                                        variant="outline"
                                        size="sm"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                        Previous
                                    </Button>
                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                        Page {currentPage} of {totalPages}
                                    </span>
                                    <Button
                                        onClick={() =>
                                            setCurrentPage(
                                                Math.min(
                                                    totalPages,
                                                    currentPage + 1
                                                )
                                            )
                                        }
                                        disabled={currentPage === totalPages}
                                        variant="outline"
                                        size="sm"
                                    >
                                        Next
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    )
}
