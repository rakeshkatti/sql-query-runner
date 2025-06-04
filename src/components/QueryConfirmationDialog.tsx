import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface QueryConfirmationDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    query: string
    onConfirm: () => void
    type: 'create' | 'delete' | 'dump'
}

export const QueryConfirmationDialog: React.FC<
    QueryConfirmationDialogProps
> = ({ open, onOpenChange, query, onConfirm, type }) => {
    const [confirmationText, setConfirmationText] = useState('')
    const requiredText = type === 'dump' ? 'CONFIRM DUMP' : ''

    const getDialogContent = () => {
        switch (type) {
            case 'create':
                return {
                    title: 'Confirm Create Operation',
                    description:
                        'Are you sure you want to execute this CREATE query?',
                    actionClass: 'bg-blue-600 hover:bg-blue-700',
                    actionText: 'Create',
                }
            case 'delete':
                return {
                    title: 'Confirm Delete Operation',
                    description:
                        'Are you sure you want to execute this DELETE query? This action cannot be undone and will permanently remove data.',
                    actionClass: 'bg-red-600 hover:bg-red-700',
                    actionText: 'Delete',
                }
            case 'dump':
                return {
                    title: 'Confirm Dump Operation',
                    description: `Are you sure you want to execute this DUMP query? This will export database data. Type "${requiredText}" to confirm.`,
                    actionClass: 'bg-orange-600 hover:bg-orange-700',
                    actionText: 'Dump',
                }
        }
    }

    const content = getDialogContent()
    const canConfirm =
        type === 'dump' ? confirmationText === requiredText : true

    const handleConfirm = () => {
        if (canConfirm) {
            onConfirm()
            setConfirmationText('')
            onOpenChange(false)
        }
    }

    const handleCancel = () => {
        setConfirmationText('')
        onOpenChange(false)
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle
                        className={type === 'delete' ? 'text-red-600' : ''}
                    >
                        {content.title}
                    </AlertDialogTitle>
                    <AlertDialogDescription className="space-y-3">
                        <p>{content.description}</p>
                        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                            <code className="text-sm font-mono">{query}</code>
                        </div>
                        {type === 'dump' && (
                            <div className="space-y-2">
                                <Label htmlFor="confirmation">
                                    Confirmation Text
                                </Label>
                                <Input
                                    id="confirmation"
                                    value={confirmationText}
                                    onChange={e =>
                                        setConfirmationText(e.target.value)
                                    }
                                    placeholder={`Type "${requiredText}" to confirm`}
                                />
                            </div>
                        )}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleCancel}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleConfirm}
                        className={content.actionClass}
                        disabled={!canConfirm}
                    >
                        {content.actionText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
