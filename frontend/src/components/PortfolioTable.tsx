import { FC } from 'react'
import { Table } from 'antd'
import type { TableColumnsType, TableProps } from 'antd'
import { useCrypto } from '@/hooks/useCrypto'

interface PortfolioTableProps {}

interface DataType {
	key: React.Key
	name: string
	price: number
	amount: number
}

const PortfolioTable: FC<PortfolioTableProps> = () => {
	const { assets } = useCrypto()

	const data: DataType[] = assets.map(asset => ({
		key: asset.id,
		name: asset.name,
		price: Number(asset.price.toFixed(2)),
		amount: asset.amount
	}))

	const columns: TableColumnsType<DataType> = [
		{
			title: 'Name',
			dataIndex: 'name',
			showSorterTooltip: { target: 'full-header' },
			sorter: (a, b) => a.name.localeCompare(b.name),
			sortDirections: ['descend'],
		},
		{
			title: 'Price, $',
			dataIndex: 'price',
			defaultSortOrder: 'descend',
			sorter: (a, b) => a.price - b.price,
		},
		{
			title: 'Amount',
			dataIndex: 'amount',
			defaultSortOrder: 'descend',
			sorter: (a, b) => a.amount - b.amount,
		},
	]

	return (
		<Table
			dataSource={data}
			columns={columns}
			pagination={false}
			showSorterTooltip={{ target: 'sorter-icon' }}
		/>
	)
}

export default PortfolioTable
