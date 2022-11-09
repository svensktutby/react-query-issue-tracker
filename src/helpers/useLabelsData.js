import { useQuery } from 'react-query';
import { fetchWithError } from '.';

export function useLabelsData() {
  const labelsData = useQuery(['labels'], () => fetchWithError(`/api/labels`), {
    staleTime: 1000 * 60 * 60,
  });

  return labelsData;
}
