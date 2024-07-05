import CryptoContext from '@/context/CryptoContext'
import { useContext } from 'react'

export function useCrypto() {
	return useContext(CryptoContext)
}