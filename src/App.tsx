import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/sonner'
import Layout from '@/components/Layout'
import Index from '@/pages/Index'
import UIComponents from '@/pages/UIComponents'
import { DatasetProvider } from './contexts/DatasetContext'
import { StatsProvider } from './contexts/StatsContext'

function App() {
    return (
        <TooltipProvider>
            <Router>
                <DatasetProvider>
                    <StatsProvider>
                        <Layout>
                            <Routes>
                                <Route path="/" element={<Index />} />
                                <Route path="/ui" element={<UIComponents />} />
                                <Route
                                    path="*"
                                    element={<div>Not Found</div>}
                                />
                            </Routes>
                        </Layout>
                    </StatsProvider>
                    <Toaster />
                </DatasetProvider>
            </Router>
        </TooltipProvider>
    )
}

export default App
