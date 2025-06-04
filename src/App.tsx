import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import Layout from "@/components/Layout"
import Index from "@/pages/Index"
import UIComponents from "@/pages/UIComponents"

function App() {
	return (
		<TooltipProvider>
			<Router>
				<Layout>
					<Routes>
						<Route path="/" element={<Index />} />
						<Route path="/ui" element={<UIComponents />} />
						<Route path="*" element={<div>Not Found</div>} />
					</Routes>
				</Layout>
				<Toaster />
			</Router>
		</TooltipProvider>
	)
}

export default App
