import { FC, useEffect, useState } from 'react'
import { Layout, Button, Modal, Drawer } from 'antd'
import { CSSProperties } from 'react'
import { useCrypto } from '@/hooks/useCrypto'
import ModalContent from '@/components/ModalContent'
import { ICryptoCoin } from '@/types/types'
import AssetForm from '@/components/AssetForm'
import SelectCoin from '@/components/SelectCoin'

const AppHeader: FC = () => {
	const { crypto } = useCrypto()
	const [isSelected, setIsSelected] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
	const [coin, setCoin] = useState<ICryptoCoin>(null)

	useEffect(() => {
		function handleKeyPress(event: KeyboardEvent) {
			if (event.key === '/') setIsSelected(prevState => !prevState)
		}

		document.addEventListener('keypress', handleKeyPress)

		return () => {
			document.removeEventListener('keypress', handleKeyPress)
		}
	}, [])

	const headerStyle: CSSProperties = {
		width: '100%',
		textAlign: 'center',
		height: 60,
		padding: '1rem',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	}

	function handleSelect(value: string) {
		const selectedCoin = crypto.find(c => c.id === value)
		setCoin(selectedCoin)
		setIsModalOpen(true)
	}

	return (
		<Layout.Header style={headerStyle}>
			<SelectCoin
				style={{ width: 250 }}
				open={isSelected}
				handleSelect={handleSelect}
				handleClick={() => setIsSelected(prevState => !prevState)}
				value='press / to open'
			/>

			<Button type='primary' onClick={() => setIsDrawerOpen(true)}>
				Add an Asset
			</Button>

			<Modal
				open={isModalOpen}
				onCancel={() => setIsModalOpen(false)}
				footer={null}
			>
				<ModalContent coin={coin} />
			</Modal>

			<Drawer
				title='Adding an Asset'
				width={600}
				onClose={() => setIsDrawerOpen(false)}
				open={isDrawerOpen}
				destroyOnClose
			>
				<AssetForm closeDrawer={() => setIsDrawerOpen(false)} />
			</Drawer>
		</Layout.Header>
	)
}

export default AppHeader
