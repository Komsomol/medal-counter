import { useEffect, useState } from 'react';

// Basic types for medal data
export type SortType = 'gold' | 'silver' | 'bronze' | 'total';

export interface MedalData {
	code: string;
	gold: number;
	silver: number;
	bronze: number;
	total?: number;
}

// Cache for the medal data to avoid refetching
let medalDataCache: MedalData[] | null = null;

/**
 * Fetch medal data from API and cache it
 */
export const fetchMedalData = async (): Promise<MedalData[]> => {
	try {
		// Return cached data if available
		if (medalDataCache) {
			return medalDataCache;
		}

		// Fetch from API
		const response = await fetch('/api/medals');

		if (!response.ok) {
			throw new Error(`Failed to fetch medal data: ${response.status}`);
		}

		const data: MedalData[] = await response.json();

		// Calculate total for each country
		const dataWithTotals = data.map((country) => ({
			...country,
			total: country.gold + country.silver + country.bronze,
		}));

		// Cache the data
		medalDataCache = dataWithTotals;

		return dataWithTotals;
	} catch (error) {
		console.error('Error fetching medal data:', error);
		throw error;
	}
};

/**
 * Sort medal data with appropriate tiebreakers
 */
export const sortMedalData = (
	data: MedalData[],
	sortType: SortType
): MedalData[] => {
	// Deep clone the array to avoid modifying the cache
	return [...data].sort((a, b) => {
		// Primary sort by the requested medal type
		if (a[sortType] !== b[sortType]) {
			return b[sortType] - a[sortType];
		}

		// Apply tiebreakers based on sort type
		switch (sortType) {
			case 'total':
				return b.gold - a.gold;
			case 'gold':
				return b.silver - a.silver;
			case 'silver':
				return b.gold - a.gold;
			case 'bronze':
				return b.gold - a.gold;
			default:
				return 0;
		}
	});
};

/**
 * Hook to manage medal data
 */
export const useMedalData = (initialSort: SortType = 'gold') => {
	const [data, setData] = useState<MedalData[]>([]);
	const [sortType, setSortType] = useState<SortType>(initialSort);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	// Fetch data on initial load
	useEffect(() => {
		const getData = async () => {
			try {
				setIsLoading(true);
				const medalData = await fetchMedalData();
				setData(sortMedalData(medalData, sortType).slice(0, 10));
				setIsLoading(false);
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: 'Failed to load medal data'
				);
				setIsLoading(false);
			}
		};

		getData();
	}, []);

	// Update sorting when sort type changes
	useEffect(() => {
		if (medalDataCache) {
			setData(sortMedalData(medalDataCache, sortType).slice(0, 10));
		}
	}, [sortType]);

	return {
		data,
		sortType,
		setSortType,
		isLoading,
		error,
	};
};
