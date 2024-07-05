import { FC } from 'react'
import AppLayout from '@/components/Layout/AppLayout'
import { CryptoContextProvider } from '@/context/CryptoContext'

const App: FC = () => {
	return (
		<CryptoContextProvider>
			<AppLayout />
		</CryptoContextProvider>
	)
}

export default App
