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
    data: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
    columns: string[]
    queryExecutionTime: number
    onExport: (format: 'csv' | 'json') => void
}

export const DataTable: React.FC<DataTableProps> = ({
    data,
    columns,
    queryExecutionTime,
    onExport,
}) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [sortColumn, setSortColumn] = useState<string | null>(null)
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(50)

    const filteredAndSortedData = useMemo(() => {
        const filtered = data.filter(row =>
            columns.some(col =>
                String(row[col])
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            )
        )

        if (sortColumn) {
            filtered.sort((a, b) => {
                const aVal = a[sortColumn]
                const bVal = b[sortColumn]

                if (typeof aVal === 'number' && typeof bVal === 'number') {
                    return sortDirection === 'asc' ? aVal - bVal : bVal - aVal
                }

                const aStr = String(aVal).toLowerCase()
                const bStr = String(bVal).toLowerCase()

                if (sortDirection === 'asc') {
                    return aStr.localeCompare(bStr)
                } else {
                    return bStr.localeCompare(aStr)
                }
            })
        }

        return filtered
    }, [data, columns, searchTerm, sortColumn, sortDirection])

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize
        return filteredAndSortedData.slice(startIndex, startIndex + pageSize)
    }, [filteredAndSortedData, currentPage, pageSize])

    const totalPages = Math.ceil(filteredAndSortedData.length / pageSize)

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
                        >
                            <Download className="h-4 w-4" />
                            CSV
                        </Button>
                        <Button
                            onClick={() => onExport('json')}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2"
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
                        <div className="overflow-auto max-h-[500px] border rounded dark:border-slate-600">
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
