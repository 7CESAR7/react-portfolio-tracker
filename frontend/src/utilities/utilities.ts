export function calculatePercentDifference(a: number, b: number) {
	return +(100 * Math.abs( (a - b) / ((a + b) / 2) )).toFixed(2)
}

export function capitalize(word: string) {
	return word.charAt(0).toUpperCase() + word.substring(1)
}