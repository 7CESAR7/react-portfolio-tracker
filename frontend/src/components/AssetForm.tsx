import { FC, useRef, useState } from 'react'
import {
	Divider,
	Form,
	Button,
	FormProps,
	InputNumber,
	DatePicker,
	Result,
} from 'antd'
import { ICryptoAsset, ICryptoCoin } from '@/types/types'
import { useCrypto } from '@/hooks/useCrypto'
import CoinInfo from '@/components/CoinInfo'
import SelectCoin from '@/components/SelectCoin'

interface AssetFormProps {
	closeDrawer: () => void
}

const AssetForm: FC<AssetFormProps> = ({ closeDrawer }) => {
	const [form] = Form.useForm<HTMLFormElement>()
	const { crypto, addAsset } = useCrypto()
	const [coin, setCoin] = useState<ICryptoCoin>(null)
	const [isFormSubmitted, setIsFormSubmitted] = useState(false)
	const assetRef = useRef<ICryptoAsset>()

	const validateMessages = {
		required: '${label} is required!',
		types: {
			number: '${label} is not valid number',
		},
		number: {
			range: '${label} must be between ${min} and ${max}',
		},
	}

	function handleAmountChange(value: number) {
		const price: number = form.getFieldValue('price')
		form.setFieldsValue({
			total: (value * price).toFixed(2),
		})
	}

	function handlePriceChange(value: number) {
		const amount: number = form.getFieldValue('amount')
		form.setFieldsValue({
			total: (amount * value).toFixed(2),
		})
	}

	const handleFinish: FormProps['onFinish'] = (formData: ICryptoAsset) => {
		console.log(formData.date)
		const purchasedAsset: ICryptoAsset = {
			id: coin.id,
			name: coin.name,
			amount: formData.amount,
			price: formData.price,
			date: new Date(),
		}
		assetRef.current = purchasedAsset
		setIsFormSubmitted(true)
		addAsset(purchasedAsset)
	}

	if (isFormSubmitted) {
		return (
			<Result
				status='success'
				title='The purchased asset has been added to your portfolio!'
				subTitle={`Added ${assetRef.current.amount} ${coin.name} at a price of ${assetRef.current.price}$`}
				extra={[
					<Button type='primary' key='console' onClick={closeDrawer}>
						Close
					</Button>,
				]}
			/>
		)
	}

	if (!coin) {
		return (
			<SelectCoin
				style={{ width: '100%' }}
				handleSelect={value => setCoin(crypto.find(c => c.id === value))}
				placeholder='Select coin'
			/>
		)
	}

	return (
		<Form
			form={form}
			name='basic'
			labelCol={{ span: 4 }}
			wrapperCol={{ span: 10 }}
			style={{ maxWidth: 600 }}
			initialValues={{
				price: Number(coin.price.toFixed(2)),
			}}
			onFinish={handleFinish}
			validateMessages={validateMessages}
		>
			<CoinInfo coin={coin} />

			<Divider />

			<Form.Item
				label='Amount'
				name='amount'
				rules={[
					{
						required: true,
						type: 'number',
						min: 0,
					},
				]}
			>
				<InputNumber
					onChange={handleAmountChange}
					placeholder='Enter coin amount'
					style={{ width: '100%' }}
				/>
			</Form.Item>

			<Form.Item label='Price' name='price'>
				<InputNumber onChange={handlePriceChange} style={{ width: '100%' }} />
			</Form.Item>

			<Form.Item label='Date & Time' name='date'>
				<DatePicker showTime />
			</Form.Item>

			<Form.Item label='Total' name='total'>
				<InputNumber disabled style={{ width: '100%' }} />
			</Form.Item>

			<Form.Item>
				<Button type='primary' htmlType='submit'>
					Add an Asset
				</Button>
			</Form.Item>
		</Form>
	)
}

export default AssetForm
