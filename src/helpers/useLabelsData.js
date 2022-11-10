import { useQuery } from 'react-query';
import { fetchWithError } from '.';

export function useLabelsData() {
  const labelsData = useQuery(
    ['labels'],
    ({ signal }) => fetchWithError(`/api/labels`, { signal }),
    {
      staleTime: 1000 * 60 * 60,
    },
  );

  return labelsData;
}
