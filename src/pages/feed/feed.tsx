import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import {
  selectFeeds,
  fetchFeeds,
  selectIsDataLoading
} from '../../slices/feeds';

export const Feed: FC = () => {
  const orders = useSelector(selectFeeds);
  const isLoadind = useSelector(selectIsDataLoading);

  const dispatch = useDispatch();
  useEffect(() => {
    if (orders.length === 0) dispatch(fetchFeeds());
  }, []);

  return isLoadind ? (
    <Preloader />
  ) : (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeeds())} />
  );
};
