import { ICryptoAsset, ICryptoCoin } from '@/types/types'
import { useState, useEffect, createContext, ReactNode } from 'react'
import { AppService } from '@/API/AppService'
import { calculatePercentDifference } from '@/utilities/utilities'

interface ICryptoContext {
	assets: ICryptoAsset[]
	crypto: ICryptoCoin[]
	isLoading: boolean
	addAsset: (asset: ICryptoAsset) => void
}

const CryptoContext = createContext<ICryptoContext>({
	assets: [],
	crypto: [],
	isLoading: true,
	addAsset: () => {}
})

export function CryptoContextProvider({ children }: { children: ReactNode }) {
	const [isLoading, setIsLoading] = useState(true)
	const [crypto, setCrypto] = useState<ICryptoCoin[]>([])
	const [assets, setAssets] = useState<ICryptoAsset[]>([])

	function addAsset(purchasedAsset: ICryptoAsset) {
		setAssets(mapAssets([...assets, purchasedAsset], crypto))
	}

	function mapAssets(assets: ICryptoAsset[], crypto: ICryptoCoin[]) {
		return assets.map(asset => {
			const coin = crypto.find(c => c.id === asset.id)

			return {
				grow: asset.price < coin.price,
				growPercent: calculatePercentDifference(asset.price, coin.price),
				totalAmount: asset.amount * coin.price,
				totalProfit: asset.amount * coin.price - asset.amount * asset.price,
				name: coin.name,
				...asset,
			}
		})
	}

	useEffect(() => {
		async function preloadData() {
			const { result } = await AppService.getCryptoData()
			const assets = await AppService.getOwnedAssets()

			setAssets(mapAssets(assets, result))
			setCrypto(result)
			setIsLoading(false)
		}
		preloadData()
	}, [])

	return (
		<CryptoContext.Provider value={{ assets, crypto, isLoading, addAsset }}>
			{children}
		</CryptoContext.Provider>
	)
}

export default CryptoContext
