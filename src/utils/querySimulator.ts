/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Dataset, datasets } from '@/data/sampleData'

export interface QueryResult {
    data: any[]
    columns: string[]
    executionTime: number
    rowCount: number
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

const parseAndExecuteQuery = (
    query: string
): Omit<QueryResult, 'executionTime'> => {
    const normalizedQuery = query.toLowerCase().trim()

    // Simple query parsing to determine which dataset to use
    let targetDataset: Dataset | undefined

    for (const dataset of datasets) {
        if (normalizedQuery.includes(dataset.name)) {
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
