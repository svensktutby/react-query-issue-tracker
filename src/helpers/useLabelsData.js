import { useQuery } from 'react-query';

export function useLabelsData() {
  const labelsData = useQuery(['labels'], () => fetch(`/api/labels`).then((res) => res.json()), {
    staleTime: 1000 * 60 * 60,
  });

  return labelsData;
}
