import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { toast } from 'sonner'
import { ChevronDown, MoreHorizontal, Info } from 'lucide-react'

const ComponentsShowcase = () => {
    const tableData = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
        {
            id: 4,
            name: 'Alice Brown',
            email: 'alice@example.com',
            role: 'Moderator',
        },
        {
            id: 5,
            name: 'Charlie Wilson',
            email: 'charlie@example.com',
            role: 'User',
        },
    ]

    const handleToast = () => {
        toast.success('Component showcase loaded!', {
            description: 'All shadcn/ui components are working correctly.',
        })
    }

    return (
        <TooltipProvider>
            <div className="min-h-screen bg-background p-8">
                <div className="max-w-6xl mx-auto space-y-8">
                    <div className="text-center space-y-2">
                        <h1 className="text-4xl font-bold">
                            shadcn/ui Components Showcase
                        </h1>
                        <p className="text-muted-foreground">
                            A comprehensive example of all the components you
                            requested
                        </p>
                        <Button onClick={handleToast} className="mt-4">
                            Show Toast Notification
                        </Button>
                    </div>

                    <Tabs defaultValue="forms" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="forms">Forms</TabsTrigger>
                            <TabsTrigger value="data">Data Display</TabsTrigger>
                            <TabsTrigger value="layout">Layout</TabsTrigger>
                            <TabsTrigger value="navigation">
                                Navigation
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="forms" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        Form Components
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Info className="h-4 w-4 text-muted-foreground" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>
                                                    Input, Textarea, and Select
                                                    components
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </CardTitle>
                                    <CardDescription>
                                        Examples of input, textarea, and select
                                        components
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">
                                                Email Input
                                            </label>
                                            <Input
                                                type="email"
                                                placeholder="Enter your email"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">
                                                Select Option
                                            </label>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a role" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="admin">
                                                        Admin
                                                    </SelectItem>
                                                    <SelectItem value="user">
                                                        User
                                                    </SelectItem>
                                                    <SelectItem value="moderator">
                                                        Moderator
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Message
                                        </label>
                                        <Textarea
                                            placeholder="Type your message here..."
                                            className="min-h-[100px]"
                                        />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button className="ml-auto">
                                        Submit Form
                                    </Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>

                        <TabsContent value="data" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Data Table</CardTitle>
                                    <CardDescription>
                                        Example of a data table with user
                                        information
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Name</TableHead>
                                                <TableHead>Email</TableHead>
                                                <TableHead>Role</TableHead>
                                                <TableHead className="text-right">
                                                    Actions
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {tableData.map(user => (
                                                <TableRow key={user.id}>
                                                    <TableCell className="font-medium">
                                                        {user.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {user.email}
                                                    </TableCell>
                                                    <TableCell>
                                                        {user.role}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger
                                                                asChild
                                                            >
                                                                <Button
                                                                    variant="ghost"
                                                                    className="h-8 w-8 p-0"
                                                                >
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuLabel>
                                                                    Actions
                                                                </DropdownMenuLabel>
                                                                <DropdownMenuItem>
                                                                    View profile
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    Edit user
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem className="text-destructive">
                                                                    Delete user
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="layout" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            Scroll Area Example
                                        </CardTitle>
                                        <CardDescription>
                                            A scrollable area with fixed height
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                                            <div className="space-y-2">
                                                {Array.from(
                                                    { length: 50 },
                                                    (_, i) => (
                                                        <div
                                                            key={i}
                                                            className="text-sm"
                                                        >
                                                            This is scroll item
                                                            #{i + 1}. You can
                                                            scroll through all
                                                            of these items.
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </ScrollArea>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Card Layout</CardTitle>
                                        <CardDescription>
                                            Example of card with header,
                                            content, and footer
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">
                                            This is the card content area. You
                                            can put any content here including
                                            text, images, forms, or other
                                            components.
                                        </p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button
                                            variant="outline"
                                            className="mr-2"
                                        >
                                            Cancel
                                        </Button>
                                        <Button>Confirm</Button>
                                    </CardFooter>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="navigation" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Navigation Components</CardTitle>
                                    <CardDescription>
                                        Examples of dropdown menus and tooltips
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline">
                                                    Menu Options
                                                    <ChevronDown className="ml-2 h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuLabel>
                                                    My Account
                                                </DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>
                                                    Profile
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    Settings
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    Billing
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>
                                                    Logout
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>

                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="outline">
                                                    Hover for tooltip
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>
                                                    This is a helpful tooltip!
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </TooltipProvider>
    )
}

export default ComponentsShowcase
