import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import '@/main.scss'
import App from '@/components/App'

const root = document.getElementById('root')

if (!root) {
	throw new Error("root hasn't been found")
}

const router = createBrowserRouter([
	{
		path: '*',
		element: <App />,
		children: [

		],
	},
])

createRoot(root).render(<RouterProvider router={router} />)
