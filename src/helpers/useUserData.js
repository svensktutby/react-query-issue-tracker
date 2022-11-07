import { useQuery } from 'react-query';

export function useUserData(userId) {
  if (!userId) return null;

  const usersData = useQuery(
    ['users', userId],
    () => fetch(`/api/users/${userId}`).then((res) => res.json()),
    { staleTime: 1000 * 60 * 5 },
  );

  return usersData;
}
