import { CSSProperties, FC, MouseEvent } from 'react'
import { Select, Space } from 'antd'
import { useCrypto } from '@/hooks/useCrypto'

interface SelectCoinProps {
	handleSelect: (value: string) => void
	style?: CSSProperties
	value?: string
	placeholder?: string
	open?: boolean,
	handleClick?: (event: MouseEvent) => void
}

const SelectCoin: FC<SelectCoinProps> = ({
	handleSelect,
	handleClick,
	style,
	open,
	placeholder,
	value
}) => {
	const { crypto } = useCrypto()

	return (
		<Select
			style={style}
			onSelect={handleSelect}
			onClick={handleClick}
			placeholder={placeholder}
			open={open}
			value={value}
			options={crypto.map(coin => ({
				label: coin.name,
				value: coin.id,
				icon: coin.icon,
			}))}
			optionRender={option => (
				<Space>
					<img
						style={{ width: 20 }}
						src={option.data.icon}
						alt={option.data.label}
					/>{' '}
					{option.data.label}
				</Space>
			)}
		/>
	)
}

export default SelectCoin
