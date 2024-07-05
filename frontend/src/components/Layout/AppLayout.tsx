import { FC } from 'react'
import { Layout, Spin } from 'antd'
import AppHeader from '@/components/Layout/AppHeader'
import AppSider from '@/components/Layout/AppSider'
import AppContent from '@/components/Layout/AppContent'
import { useCrypto } from '@/hooks/useCrypto'

const AppLayout: FC = () => {
	const { isLoading } = useCrypto()

	if (isLoading) return <Spin fullscreen />

	return (
		<Layout>
			<AppHeader />
			<Layout>
				<AppSider />
				<AppContent />
			</Layout>
		</Layout>
	)
}

export default AppLayout
