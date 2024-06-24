import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import {
  selectFeeds,
  fetchFeeds,
  selectIsDataLoading
} from '../../services/slices/burgersSlice';
import { isLoadingType } from '../../utils/checkLoading';

export const Feed: FC = () => {
  const orders = useSelector(selectFeeds);
  const isLoadind = useSelector(selectIsDataLoading);

  const dispatch = useDispatch();
  useEffect(() => {
    if (orders.length === 0) dispatch(fetchFeeds());
  }, []);

  return isLoadingType(isLoadind, 'fetchFeeds') ? (
    <Preloader />
  ) : (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeeds())} />
  );
};
