import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { selectFeeds } from '../../slices/feeds';
import { useSelector } from '../../services/store';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders = useSelector(selectFeeds);
  const ordersDone = orders.filter((el) => el.status === 'done');
  const ordersDoneToday = orders.filter(
    (el) => el.updatedAt.slice(0, 10) === new Date().toJSON().slice(0, 10)
  );
  const feed = { total: ordersDone.length, totalToday: ordersDoneToday.length };
  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
