import React, { useState, useMemo, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
    type SortingState,
    type ColumnFiltersState,
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import { Download, Search, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'

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

    // All hooks must be declared after the early return
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [globalFilter, setGlobalFilter] = useState('')
    const [pageSize, setPageSize] = useState(25)

    // Create column definitions for TanStack Table
    const tableColumns = useMemo<ColumnDef<any>[]>(
        () =>
            columns.map(column => ({
                accessorKey: column,
                header: ({ column: col }) => {
                    return (
                        <Button
                            variant="ghost"
                            onClick={() =>
                                col.toggleSorting(col.getIsSorted() === 'asc')
                            }
                            className="h-auto p-1 font-semibold hover:bg-gray-100 dark:hover:bg-slate-600 text-xs w-full justify-start"
                        >
                            <span className="truncate">{column}</span>
                            {col.getIsSorted() === 'asc' ? (
                                <ArrowUp className="ml-1 h-3 w-3 flex-shrink-0" />
                            ) : col.getIsSorted() === 'desc' ? (
                                <ArrowDown className="ml-1 h-3 w-3 flex-shrink-0" />
                            ) : (
                                <ArrowUpDown className="ml-1 h-3 w-3 flex-shrink-0" />
                            )}
                        </Button>
                    )
                },
                cell: ({ getValue }) => {
                    const value = getValue()
                    return (
                        <div className="font-mono text-xs py-2 truncate w-full">
                            {String(value)}
                        </div>
                    )
                },
                size: 150, // Default column width
                minSize: 120, // Minimum column width
                maxSize: 300, // Maximum column width
            })),
        [columns]
    )

    const table = useReactTable({
        data,
        columns: tableColumns,
        state: {
            sorting,
            columnFilters,
            globalFilter,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        columnResizeMode: 'onChange',
    })

    const { rows } = table.getRowModel()

    // Apply page size limit to virtualized rows
    const displayRows = rows.slice(0, pageSize)

    // Virtualization setup
    const parentRef = useRef<HTMLDivElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)

    const virtualizer = useVirtualizer({
        count: displayRows.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 45, // Slightly smaller row height
        overscan: 10, // Render extra rows for smooth scrolling
    })

    // Sync horizontal scrolling between header and body
    const handleBodyScroll = (e: React.UIEvent<HTMLDivElement>) => {
        if (headerRef.current) {
            headerRef.current.scrollLeft = e.currentTarget.scrollLeft
        }
    }

    const handleHeaderScroll = (e: React.UIEvent<HTMLDivElement>) => {
        if (parentRef.current) {
            parentRef.current.scrollLeft = e.currentTarget.scrollLeft
        }
    }

    // Calculate total table width for consistent sizing
    const totalWidth =
        table
            .getHeaderGroups()[0]
            ?.headers.reduce((sum, header) => sum + header.getSize(), 0) || 0

    return (
        <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-xl font-bold text-gray-800 dark:text-white">
                            Query Results
                        </CardTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            {displayRows.length} of {rows.length} rows •
                            Executed in {queryExecutionTime}ms
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
                <div className="mt-4 flex gap-4 items-center flex-wrap">
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search in results..."
                            value={globalFilter ?? ''}
                            onChange={e => setGlobalFilter(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
                            Show:
                        </span>
                        <select
                            value={pageSize}
                            onChange={e => setPageSize(Number(e.target.value))}
                            className="px-2 py-1 border rounded text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                        >
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                            <option value={500}>500</option>
                            <option value={1000}>1000</option>
                            <option value={rows.length}>
                                All ({rows.length})
                            </option>
                        </select>
                        <span className="text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
                            rows
                        </span>
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
                    <div className="border rounded-md dark:border-slate-600 overflow-hidden">
                        {/* Synchronized Table Header */}
                        <div
                            ref={headerRef}
                            className="overflow-x-auto scrollbar-hide"
                            onScroll={handleHeaderScroll}
                        >
                            <div
                                className="bg-gray-50 dark:bg-slate-700 border-b dark:border-slate-600"
                                style={{ width: `${totalWidth}px` }}
                            >
                                {table.getHeaderGroups().map(headerGroup => (
                                    <div key={headerGroup.id} className="flex">
                                        {headerGroup.headers.map(header => (
                                            <div
                                                key={header.id}
                                                className="px-3 py-2 text-left font-semibold border-r dark:border-slate-600 last:border-r-0 flex-shrink-0"
                                                style={{
                                                    width: `${header.getSize()}px`,
                                                }}
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext()
                                                      )}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Synchronized Virtualized Table Body */}
                        <div
                            ref={parentRef}
                            className="h-[500px] overflow-auto custom-scrollbar"
                            onScroll={handleBodyScroll}
                        >
                            <div style={{ width: `${totalWidth}px` }}>
                                <div
                                    style={{
                                        height: `${virtualizer.getTotalSize()}px`,
                                        width: '100%',
                                        position: 'relative',
                                    }}
                                >
                                    {virtualizer
                                        .getVirtualItems()
                                        .map(virtualRow => {
                                            const row =
                                                displayRows[virtualRow.index]
                                            return (
                                                <div
                                                    key={row.id}
                                                    className={`absolute top-0 left-0 flex hover:bg-gray-50 dark:hover:bg-slate-700 ${
                                                        virtualRow.index % 2 ===
                                                        0
                                                            ? 'bg-white dark:bg-slate-800'
                                                            : 'bg-gray-25 dark:bg-slate-750'
                                                    }`}
                                                    style={{
                                                        height: `${virtualRow.size}px`,
                                                        transform: `translateY(${virtualRow.start}px)`,
                                                        width: `${totalWidth}px`,
                                                    }}
                                                >
                                                    {row
                                                        .getVisibleCells()
                                                        .map(cell => (
                                                            <div
                                                                key={cell.id}
                                                                className="px-3 py-1 border-r dark:border-slate-600 last:border-r-0 flex-shrink-0"
                                                                style={{
                                                                    width: `${cell.column.getSize()}px`,
                                                                }}
                                                            >
                                                                {flexRender(
                                                                    cell.column
                                                                        .columnDef
                                                                        .cell,
                                                                    cell.getContext()
                                                                )}
                                                            </div>
                                                        ))}
                                                </div>
                                            )
                                        })}
                                </div>
                            </div>
                        </div>

                        {/* Table Footer with Stats */}
                        <div className="bg-gray-50 dark:bg-slate-700 border-t dark:border-slate-600 px-4 py-2">
                            <div className="text-sm text-gray-600 dark:text-gray-300">
                                Showing {displayRows.length} of {rows.length}{' '}
                                filtered rows
                                {globalFilter && ` (${data.length} total)`}
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
