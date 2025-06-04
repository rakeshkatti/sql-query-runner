import { useTheme } from 'next-themes'
import { Toaster as Sonner } from 'sonner'
import type { ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = 'system' } = useTheme()

    return (
        <Sonner
            theme={theme as ToasterProps['theme']}
            className="toaster group"
            style={
                {
                    '--normal-bg': 'var(--popover)',
                    '--normal-text': 'var(--popover-foreground)',
                    '--normal-border': 'var(--border)',
                    '--success-bg': 'var(--popover)',
                    '--success-text': 'var(--popover-foreground)',
                    '--success-border': 'var(--border)',
                    '--error-bg': 'var(--popover)',
                    '--error-text': 'var(--popover-foreground)',
                    '--error-border': 'var(--border)',
                    '--warning-bg': 'var(--popover)',
                    '--warning-text': 'var(--popover-foreground)',
                    '--warning-border': 'var(--border)',
                } as React.CSSProperties
            }
            toastOptions={{
                style: {
                    background: 'var(--popover)',
                    color: 'var(--popover-foreground)',
                    border: '1px solid var(--border)',
                },
                className:
                    'group toast group-[.toaster]:bg-popover group-[.toaster]:text-popover-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
                descriptionClassName:
                    'group-[.toast]:text-muted-foreground group-[.toast]:opacity-90',
            }}
            {...props}
        />
    )
}

export { Toaster }
