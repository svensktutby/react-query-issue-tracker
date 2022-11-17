import { useIsFetching } from 'react-query';
import { Loader } from './Loader';

export function FetchingIndicator() {
  const isFetching = useIsFetching();
  return isFetching ? (
    <div className="fetching-indicator">
      <Loader />
    </div>
  ) : null;
}
