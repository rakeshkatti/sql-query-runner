import React, { useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Play, Save, Maximize2, Minimize2 } from 'lucide-react'
import Editor from '@monaco-editor/react'
import { useTheme } from 'next-themes'

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
    const editorRef = useRef<any>(null)
    const { theme } = useTheme()
    const [isFullscreen, setIsFullscreen] = React.useState(false)

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

    // Determine the theme - fallback to system preference if theme is not detected
    const getEditorTheme = () => {
        if (theme === 'dark') return 'vs-dark'
        if (theme === 'light') return 'vs'

        // Fallback: check system preference
        if (typeof window !== 'undefined') {
            const systemPrefersDark = window.matchMedia(
                '(prefers-color-scheme: dark)'
            ).matches
            return systemPrefersDark ? 'vs-dark' : 'vs'
        }

        return 'vs' // Default fallback
    }

    const handleEditorDidMount = (editor: any, monaco: any) => {
        editorRef.current = editor

        // Configure SQL language features
        monaco.languages.setLanguageConfiguration('sql', {
            comments: {
                lineComment: '--',
                blockComment: ['/*', '*/'],
            },
            brackets: [
                ['(', ')'],
                ['[', ']'],
            ],
            autoClosingPairs: [
                { open: '(', close: ')' },
                { open: '[', close: ']' },
                { open: "'", close: "'" },
                { open: '"', close: '"' },
            ],
        })

        // Add SQL keywords for better syntax highlighting
        monaco.languages.setMonarchTokensProvider('sql', {
            tokenizer: {
                root: [
                    [
                        /\b(?:SELECT|FROM|WHERE|JOIN|INNER|LEFT|RIGHT|OUTER|ON|GROUP|BY|ORDER|HAVING|UNION|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER|TABLE|INDEX|VIEW|DATABASE|SCHEMA|GRANT|REVOKE|COMMIT|ROLLBACK|TRANSACTION|BEGIN|END|IF|ELSE|CASE|WHEN|THEN|AS|AND|OR|NOT|IN|EXISTS|BETWEEN|LIKE|IS|NULL|TRUE|FALSE|DISTINCT|ALL|ANY|SOME|COUNT|SUM|AVG|MIN|MAX|CAST|CONVERT|SUBSTRING|TRIM|UPPER|LOWER|LENGTH|COALESCE|ISNULL|DUMP)\b/i,
                        'keyword',
                    ],
                    [
                        /\b(?:INT|INTEGER|BIGINT|SMALLINT|TINYINT|DECIMAL|NUMERIC|FLOAT|REAL|DOUBLE|CHAR|VARCHAR|TEXT|NCHAR|NVARCHAR|NTEXT|DATE|TIME|DATETIME|TIMESTAMP|BOOLEAN|BOOL|BINARY|VARBINARY|BLOB|CLOB|UUID)\b/i,
                        'type',
                    ],
                    [/'([^'\\]|\\.)*'/, 'string'],
                    [/"([^"\\]|\\.)*"/, 'string'],
                    [/--.*$/, 'comment'],
                    [/\/\*/, 'comment', '@comment'],
                    [/\d+/, 'number'],
                    [/[;,.]/, 'delimiter'],
                    [/[()[\]]/, 'bracket'],
                ],
                comment: [
                    [/[^/*]+/, 'comment'],
                    [/\*\//, 'comment', '@pop'],
                    [/[/*]/, 'comment'],
                ],
            },
        })

        // Add keyboard shortcuts using actions (more reliable than commands)
        editor.addAction({
            id: 'run-query',
            label: 'Run Query',
            keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter],
            run: () => {
                console.log(
                    'Action: Run Query triggered, currentQuery:',
                    currentQuery
                )
                if (currentQuery.trim()) {
                    console.log('Calling onRunQuery')
                    onRunQuery(currentQuery)
                } else {
                    console.log('Query is empty')
                }
            },
        })

        editor.addAction({
            id: 'save-query',
            label: 'Save Query',
            keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
            run: () => {
                console.log(
                    'Action: Save Query triggered, currentQuery:',
                    currentQuery
                )
                if (currentQuery.trim()) {
                    console.log('Calling onSaveQuery')
                    onSaveQuery(currentQuery)
                } else {
                    console.log('Query is empty')
                }
            },
        })

        // Focus the editor
        editor.focus()
    }

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen)
    }

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isFullscreen) {
                setIsFullscreen(false)
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isFullscreen])

    const editorOptions = {
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on' as const,
        roundedSelection: false,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
        insertSpaces: true,
        wordWrap: 'on' as const,
        lineHeight: 20,
        suggestOnTriggerCharacters: true,
        acceptSuggestionOnEnter: 'on' as const,
        snippetSuggestions: 'top' as const,
        quickSuggestions: true,
        folding: true,
        foldingHighlight: true,
        showFoldingControls: 'always' as const,
        bracketPairColorization: { enabled: true },
        guides: {
            bracketPairs: true,
            indentation: true,
        },
    }

    const cardClassName = isFullscreen
        ? 'fixed inset-0 z-50 h-screen w-screen dark:bg-slate-800 dark:border-slate-700'
        : 'h-fit dark:bg-slate-800 dark:border-slate-700'

    const editorHeight = isFullscreen ? 'calc(100vh - 120px)' : '200px'

    return (
        <Card className={cardClassName}>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
                        SQL Query Editor
                    </CardTitle>
                    <div className="flex gap-2">
                        <Button
                            onClick={toggleFullscreen}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2"
                        >
                            {isFullscreen ? (
                                <Minimize2 className="h-4 w-4" />
                            ) : (
                                <Maximize2 className="h-4 w-4" />
                            )}
                            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                        </Button>
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
                <div className="border rounded-md overflow-hidden dark:border-slate-600">
                    <Editor
                        height={editorHeight}
                        defaultLanguage="sql"
                        value={currentQuery}
                        onChange={value => setCurrentQuery(value || '')}
                        onMount={handleEditorDidMount}
                        theme={getEditorTheme()}
                        options={editorOptions}
                        loading={
                            <div className="flex items-center justify-center h-48 text-gray-500">
                                Loading editor...
                            </div>
                        }
                    />
                </div>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex justify-between">
                    <span>
                        Tip: Press{' '}
                        {typeof window !== 'undefined' &&
                        navigator.platform.includes('Mac')
                            ? 'Cmd'
                            : 'Ctrl'}
                        +Enter to run query,{' '}
                        {typeof window !== 'undefined' &&
                        navigator.platform.includes('Mac')
                            ? 'Cmd'
                            : 'Ctrl'}
                        +S to save
                    </span>
                    {isFullscreen && (
                        <span>Press Escape to exit fullscreen</span>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
