import { FC } from 'react'
import { Flex, Typography } from 'antd'
import { ICryptoCoin } from '@/types/types'

interface CoinInfoProps {
	coin: ICryptoCoin,
	withSymbol?: boolean
}

const CoinInfo: FC<CoinInfoProps> = ({ coin, withSymbol }) => {
	if (coin.symbol === coin.name) withSymbol = false

	return (
		<Flex align='center'>
			<img
				src={coin.icon}
				alt={coin.name}
				style={{ width: 40, marginRight: 15 }}
			/>
			<Typography.Title level={2} style={{ marginBottom: 0 }}>
				{withSymbol && (
					`(${coin.symbol})`
				)}
				{' '}
				{coin.name}
			</Typography.Title>
		</Flex>
	)
}

export default CoinInfo
