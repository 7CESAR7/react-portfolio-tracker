import { FC } from 'react'
import { ICryptoCoin } from '@/types/types'
import { Divider, Tag, Typography } from 'antd'
import CoinInfo from '@/components/CoinInfo'

interface ModalContentProps {
	coin: ICryptoCoin
}

const ModalContent: FC<ModalContentProps> = ({ coin }) => {
	return (
		<>
			<CoinInfo coin={coin} withSymbol />
			{/* <Flex align='center'>
				<img
					src={coin.icon}
					alt={coin.name}
					style={{ width: 40, marginRight: 15 }}
				/>
				<Typography.Title level={2} style={{ marginBottom: 0 }}>
					{coin.symbol === coin.name ? coin.name : `${coin.symbol} ${coin.name}`}
				</Typography.Title>
			</Flex> */}

			<Divider />

			<Typography.Paragraph>

				<Typography.Text strong>1 hour: </Typography.Text>
				<Tag color={coin.priceChange1h > 0 ? 'green' : 'red'}>
					{coin.priceChange1h}%
				</Tag>
				<Typography.Text strong>1 day: </Typography.Text>
				<Tag color={coin.priceChange1d > 0 ? 'green' : 'red'}>
					{coin.priceChange1d}%
				</Tag>
				<Typography.Text strong>1 week: </Typography.Text>
				<Tag color={coin.priceChange1w > 0 ? 'green' : 'red'}>
					{coin.priceChange1w}%
				</Tag>

			</Typography.Paragraph>
			<Typography.Paragraph>

				<Typography.Text strong>Price: </Typography.Text>
				{coin.price.toFixed(2)}$

			</Typography.Paragraph>
			<Typography.Paragraph>

				<Typography.Text strong>PriceBTC: </Typography.Text>
				{coin.priceBtc}

			</Typography.Paragraph>
			<Typography.Paragraph>

				<Typography.Text strong>Market Cap: </Typography.Text>
				{coin.marketCap.toFixed(2)}$

			</Typography.Paragraph>

			{coin.contractAddress && (
				<Typography.Paragraph>
					<Typography.Text strong>Contract Address: </Typography.Text>
					{coin.contractAddress}
				</Typography.Paragraph>
			)}
		</>
	)
}

export default ModalContent
