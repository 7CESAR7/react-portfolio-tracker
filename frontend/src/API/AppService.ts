import { cryptoAssets } from '@/data/data'
import { ICryptoAsset, ICryptoData } from '@/types/types'

export class AppService {
	static async getCryptoData(): Promise<ICryptoData> {
		const options = {
			headers: {
				accept: 'application/json',
				'X-API-KEY': 'xeTrzGM5aExlCdgoxfOKIiwv0f/Sy4CBNs75R3Nf62U='
			}
		}

		const response = await fetch('https://openapiv1.coinstats.app/coins', options)

		return await response.json()
	}

	static async getOwnedAssets(): Promise<ICryptoAsset[]> {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve(cryptoAssets)
			}, 1)
		})
	}
}



// import { cryptoData, cryptoAssets } from '@/data/data'

// export function fetchCryptoData() {
// 	return new Promise(resolve => {
// 		setTimeout(() => {
// 			resolve(cryptoData)
// 		}, 2000)
// 	})
// }

// export function fetchAssets() {
// 	return new Promise(resolve => {
// 		setTimeout(() => {
// 			resolve(cryptoAssets)
// 		}, 2000)
// 	})
// }