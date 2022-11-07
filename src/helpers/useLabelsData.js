import { useQuery } from 'react-query';

export function useLabelsData() {
  const labelsData = useQuery(['labels'], () => fetch(`/api/labels`).then((res) => res.json()));

  return labelsData;
}
