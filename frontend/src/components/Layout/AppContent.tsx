import { FC, CSSProperties } from 'react'
import { Layout, Typography } from 'antd'
import { useCrypto } from '@/hooks/useCrypto'
import PortfolioChart from '@/components/PortfolioChart'
import PortfolioTable from '@/components/PortfolioTable'

const AppContent: FC = () => {
	const { crypto, assets } = useCrypto()

	interface ICryptoPriceMap {
		[coinName: string]: number
	}

	const cryptoPriceMap = crypto.reduce((accum: ICryptoPriceMap, coin) => {
		accum[coin.id] = coin.price
		return accum
	}, {})

	const contentStyle: CSSProperties = {
		textAlign: 'center',
		minHeight: 'calc(100vh - 60px)',
		color: '#fff',
		backgroundColor: '#001529',
		padding: '1rem',
	}

	function getTotalPortfolioCost() {
		return assets
			.map(asset => asset.amount * cryptoPriceMap[asset.id])
			.reduce((accum, current) => accum + current, 0)
			.toFixed(2)
	}

	return (
		<Layout.Content style={contentStyle}>
			<Typography.Title level={3} style={{ textAlign: 'left', color: '#FFF' }}>
				Portfolio: {getTotalPortfolioCost()}$
			</Typography.Title>
			<PortfolioChart />
			<PortfolioTable />

		</Layout.Content>
	)
}

export default AppContent
