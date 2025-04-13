import { useRouter } from 'next/router';
import Head from 'next/head';
import { useEffect } from 'react';
import { SortType, useMedalData } from '../utils/medalUtils';

export default function MedalCountApp() {
	const router = useRouter();

	// Get sort param from URL or use default
	const sortParam = router.query.sort as SortType | undefined;
	const validSorts: SortType[] = ['gold', 'silver', 'bronze', 'total'];
	const initialSort = validSorts.includes(sortParam as SortType)
		? (sortParam as SortType)
		: 'gold';

	// Use our custom hook for data management
	const { data, sortType, setSortType, isLoading, error } =
		useMedalData(initialSort);

	// Update URL when sort changes
	useEffect(() => {
		if (sortType !== sortParam) {
			// Update URL without page refresh
			router.push(
				{
					pathname: '/',
					query: sortType === 'gold' ? {} : { sort: sortType },
				},
				undefined,
				{ shallow: true }
			);
		}
	}, [sortType, sortParam, router]);

	// Handle sort change
	const handleSortChange = (newSort: SortType) => {
		setSortType(newSort);
	};

	return (
		<div className="container">
			<Head>
				<title>Olympic Medal Count</title>
				<meta name="description" content="Olympic medal standings" />
			</Head>

			<main>
				<h1>Olympic Medal Count</h1>

				{isLoading ? (
					<p className="loading">Loading medal data...</p>
				) : error ? (
					<p className="error">Error: {error}</p>
				) : (
					<table className="medal-table">
						<thead>
							<tr>
								<th className="country-header">Country</th>
								<th
									onClick={() => handleSortChange('gold')}
									className={
										sortType === 'gold' ? 'active' : ''
									}
								>
									Gold
								</th>
								<th
									onClick={() => handleSortChange('silver')}
									className={
										sortType === 'silver' ? 'active' : ''
									}
								>
									Silver
								</th>
								<th
									onClick={() => handleSortChange('bronze')}
									className={
										sortType === 'bronze' ? 'active' : ''
									}
								>
									Bronze
								</th>
								<th
									onClick={() => handleSortChange('total')}
									className={
										sortType === 'total' ? 'active' : ''
									}
								>
									Total
								</th>
							</tr>
						</thead>
						<tbody>
							{data.map((country, index) => (
								<tr
									key={country.code}
									className={index % 2 === 0 ? 'even' : 'odd'}
								>
									<td className="country-cell">
										<div className="country-info">
											<div
												className={`flag flag-${country.code.toLowerCase()}`}
											></div>
											<span>{country.code}</span>
										</div>
									</td>
									<td>{country.gold}</td>
									<td>{country.silver}</td>
									<td>{country.bronze}</td>
									<td>{country.total}</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</main>
		</div>
	);
}
