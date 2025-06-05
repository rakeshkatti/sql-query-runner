/* eslint-disable no-case-declarations */
import { type Dataset, datasets } from '@/data/sampleData'

export interface QueryResult {
    data: any[]
    columns: string[]
    executionTime: number
    rowCount: number
    operationType?:
        | 'SELECT'
        | 'CREATE'
        | 'INSERT'
        | 'UPDATE'
        | 'DELETE'
        | 'DROP'
        | 'DUMP'
    message?: string
}

export const simulateQueryExecution = (query: string): Promise<QueryResult> => {
    return new Promise(resolve => {
        // Simulate network delay
        const executionTime = Math.floor(Math.random() * 300) + 50 // 50-350ms

        setTimeout(() => {
            const result = parseAndExecuteQuery(query)
            resolve({
                ...result,
                executionTime,
            })
        }, executionTime)
    })
}

const getQueryType = (
    query: string
): 'SELECT' | 'CREATE' | 'INSERT' | 'UPDATE' | 'DELETE' | 'DROP' | 'DUMP' => {
    const normalizedQuery = query.toLowerCase().trim()

    if (normalizedQuery.startsWith('create')) return 'CREATE'
    if (normalizedQuery.startsWith('insert')) return 'INSERT'
    if (normalizedQuery.startsWith('update')) return 'UPDATE'
    if (normalizedQuery.startsWith('delete')) return 'DELETE'
    if (normalizedQuery.startsWith('drop')) return 'DROP'
    if (normalizedQuery.startsWith('dump')) return 'DUMP'
    return 'SELECT'
}

const parseAndExecuteQuery = (
    query: string
): Omit<QueryResult, 'executionTime'> => {
    const normalizedQuery = query.toLowerCase().trim()
    const operationType = getQueryType(query)

    // Handle non-SELECT operations
    if (operationType !== 'SELECT') {
        return handleNonSelectOperation(query, operationType)
    }

    // Handle SELECT operations (existing logic)
    return handleSelectOperation(normalizedQuery)
}

const handleNonSelectOperation = (
    query: string,
    operationType: 'CREATE' | 'INSERT' | 'UPDATE' | 'DELETE' | 'DROP' | 'DUMP'
): Omit<QueryResult, 'executionTime'> => {
    const normalizedQuery = query.toLowerCase().trim()

    switch (operationType) {
        case 'CREATE':
            const tableName = extractTableName(normalizedQuery, 'create')
            return {
                data: [],
                columns: ['Result'],
                rowCount: 0,
                operationType,
                message: `Table '${tableName}' created successfully`,
            }

        case 'INSERT':
            const insertTable = extractTableName(normalizedQuery, 'insert')
            const insertCount = Math.floor(Math.random() * 5) + 1 // Simulate 1-5 rows inserted
            return {
                data: [],
                columns: ['Result'],
                rowCount: insertCount,
                operationType,
                message: `${insertCount} row(s) inserted into '${insertTable}'`,
            }

        case 'UPDATE':
            const updateTable = extractTableName(normalizedQuery, 'update')
            const updateCount = Math.floor(Math.random() * 20) + 1 // Simulate 1-20 rows updated
            return {
                data: [],
                columns: ['Result'],
                rowCount: updateCount,
                operationType,
                message: `${updateCount} row(s) updated in '${updateTable}'`,
            }

        case 'DELETE':
            const deleteTable = extractTableName(normalizedQuery, 'delete')
            const deleteCount = Math.floor(Math.random() * 10) + 1 // Simulate 1-10 rows deleted
            return {
                data: [],
                columns: ['Result'],
                rowCount: deleteCount,
                operationType,
                message: `${deleteCount} row(s) deleted from '${deleteTable}'`,
            }

        case 'DROP':
            const dropTable = extractTableName(normalizedQuery, 'drop')
            return {
                data: [],
                columns: ['Result'],
                rowCount: 0,
                operationType,
                message: `Table '${dropTable}' dropped successfully`,
            }

        case 'DUMP':
            const dumpTable = extractTableName(normalizedQuery, 'dump')
            const dumpPath = extractDumpPath(normalizedQuery)
            return {
                data: [],
                columns: ['Result'],
                rowCount: 0,
                operationType,
                message: `Table '${dumpTable}' dumped to '${dumpPath}' successfully`,
            }

        default:
            return {
                data: [],
                columns: ['Result'],
                rowCount: 0,
                operationType,
                message: 'Operation completed successfully',
            }
    }
}

const extractTableName = (query: string, operation: string): string => {
    const patterns = {
        create: /create\s+table\s+(\w+)/i,
        insert: /insert\s+into\s+(\w+)/i,
        update: /update\s+(\w+)/i,
        delete: /delete\s+from\s+(\w+)/i,
        drop: /drop\s+table\s+(\w+)/i,
        dump: /dump\s+(\w+)/i,
    }

    const match = query.match(patterns[operation as keyof typeof patterns])
    return match ? match[1] : 'unknown_table'
}

const extractDumpPath = (query: string): string => {
    const match = query.match(/to\s+['"]([^'"]+)['"]/i)
    return match ? match[1] : '/backup/dump.sql'
}

const handleSelectOperation = (
    normalizedQuery: string
): Omit<QueryResult, 'executionTime'> => {
    // Simple query parsing to determine which dataset to use
    let targetDataset: Dataset | undefined

    for (const dataset of datasets) {
        if (normalizedQuery.includes(dataset.name.toLowerCase())) {
            targetDataset = dataset
            break
        }
    }

    // If no specific dataset is mentioned, use a default one
    if (!targetDataset) {
        targetDataset = datasets[0] // Default to employees
    }

    let resultData = [...targetDataset.data]
    let resultColumns = [...targetDataset.columns]

    // Simple WHERE clause simulation
    if (normalizedQuery.includes('where')) {
        const whereIndex = normalizedQuery.indexOf('where')
        const whereClause = normalizedQuery.substring(whereIndex + 5).trim()

        // Simple filtering based on common patterns
        if (whereClause.includes('salary >')) {
            const salaryThreshold = parseInt(
                whereClause.match(/salary\s*>\s*(\d+)/)?.[1] || '0'
            )
            resultData = resultData.filter(
                row => row.salary && row.salary > salaryThreshold
            )
        } else if (whereClause.includes('amount >')) {
            const amountThreshold = parseFloat(
                whereClause.match(/amount\s*>\s*(\d+\.?\d*)/)?.[1] || '0'
            )
            resultData = resultData.filter(
                row => row.amount && row.amount > amountThreshold
            )
        } else if (whereClause.includes('stock_quantity <')) {
            const stockThreshold = parseInt(
                whereClause.match(/stock_quantity\s*<\s*(\d+)/)?.[1] || '999'
            )
            resultData = resultData.filter(
                row => row.stock_quantity && row.stock_quantity < stockThreshold
            )
        } else if (whereClause.includes("department = 'engineering'")) {
            resultData = resultData.filter(
                row =>
                    row.department &&
                    row.department.toLowerCase() === 'engineering'
            )
        }
    }

    // Simple SELECT column filtering
    if (
        normalizedQuery.includes('select') &&
        !normalizedQuery.includes('select *')
    ) {
        const selectIndex = normalizedQuery.indexOf('select')
        const fromIndex = normalizedQuery.indexOf('from')

        if (fromIndex > selectIndex) {
            const selectClause = normalizedQuery
                .substring(selectIndex + 6, fromIndex)
                .trim()
            const selectedColumns = selectClause
                .split(',')
                .map(col => col.trim())

            // Filter columns
            resultColumns = resultColumns.filter(col =>
                selectedColumns.some(
                    selectedCol =>
                        selectedCol === col || selectedCol.includes(col)
                )
            )

            // Filter data to only include selected columns
            resultData = resultData.map(row => {
                const filteredRow: any = {}
                resultColumns.forEach(col => {
                    if (row[col] !== undefined) {
                        filteredRow[col] = row[col]
                    }
                })
                return filteredRow
            })
        }
    }

    // Simple ORDER BY simulation
    if (normalizedQuery.includes('order by')) {
        const orderIndex = normalizedQuery.indexOf('order by')
        const orderClause = normalizedQuery.substring(orderIndex + 8).trim()

        if (orderClause.includes('salary desc')) {
            resultData.sort((a, b) => (b.salary || 0) - (a.salary || 0))
        } else if (orderClause.includes('amount desc')) {
            resultData.sort((a, b) => (b.amount || 0) - (a.amount || 0))
        } else if (orderClause.includes('name')) {
            resultData.sort((a, b) =>
                (a.name || '').localeCompare(b.name || '')
            )
        }
    }

    // Limit results for performance (simulate LIMIT clause)
    if (resultData.length > 100) {
        resultData = resultData.slice(0, 100)
    }

    return {
        data: resultData,
        columns: resultColumns,
        rowCount: resultData.length,
        operationType: 'SELECT',
    }
}

export const exportToCSV = (data: any[], columns: string[]): void => {
    const csvContent = [
        columns.join(','),
        ...data.map(row => columns.map(col => `"${row[col]}"`).join(',')),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'query_results.csv'
    a.click()
    window.URL.revokeObjectURL(url)
}

export const exportToJSON = (data: any[]): void => {
    const jsonContent = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonContent], { type: 'application/json' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'query_results.json'
    a.click()
    window.URL.revokeObjectURL(url)
}
