import { useQuery } from 'react-query';
import { fetchWithError } from '.';

export function useUserData(userId) {
  if (!userId) return null;

  const usersData = useQuery(['users', userId], () => fetchWithError(`/api/users/${userId}`), {
    staleTime: 1000 * 60 * 5,
  });

  return usersData;
}
