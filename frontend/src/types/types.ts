export interface ICryptoData {
	result: ICryptoCoin[]
	meta: IMetaInfo
}

export interface ICryptoCoin {
	id: string
	icon: string
	name: string
	symbol: string
	rank: number
	price: number
	priceBtc: number
	volume: number
	marketCap: number
	availableSupply: number
	totalSupply: number
	priceChange1h: number
	priceChange1d: number
	priceChange1w: number
	redditUrl: string
	websiteUrl: string
	twitterUrl: string
	contractAddress?: string
	decimals?: number
	explorers: string[]
}

export interface IMetaInfo {
	page: number
	limit: number
	itemCount: number
	pageCount: number
	hasPreviousPage: boolean
	hasNextPage: boolean
}

export interface ICryptoAsset {
	id: string
	name: string,
	amount: number
	price: number
	date?: Date
	grow?: boolean
	growPercent?: number
	totalAmount?: number
	totalProfit?: number
}