export type LoadingType =
  | 'fetchIngredients'
  | 'fetchFeeds'
  | 'fetchOrders'
  | 'fetchOrder'
  | 'orderBurger'
  | 'registerUser'
  | 'updateUser'
  | 'loginUser'
  | 'getUser'
  | 'logoutUser';
export type Loadings = LoadingType[] | null;

/**
 * Отметка о начале загрузки определенного типа
 * @param loadings // массив загрузок
 * @param loadingType // тип загрузки
 * @returns void
 */
export function activateLoadingType(
  loadings: Loadings,
  loadingType: LoadingType
): Loadings {
  if (!loadings) loadings = [];
  if (loadings.indexOf(loadingType) === -1) loadings.push(loadingType);
  return loadings;
}

/**
 * Отметка о конце загрузки определенного типа
 * @param loadings // массив загрузок
 * @param loadingType // тип загрузки
 * @returns void
 */
export function deactivateLoadingType(
  loadings: Loadings,
  loadingType: LoadingType
): Loadings {
  if (!loadings) return null;
  if (loadings.indexOf(loadingType) != -1)
    loadings = loadings.filter((el) => el != loadingType);
  if (loadings.length === 0) loadings = null;
  return loadings;
}

/**
 * Проверка - идет ли сейчас загрузка определенного типа
 * @param loadings - массив загрузок
 * @param loadingType - искомый тип
 * @returns boolean - есть ли загрузка указанного типа или нет
 */
export function isLoadingType(
  loadings: Loadings,
  loadingType: LoadingType
): boolean {
  if (!loadings) return false;
  return loadings.indexOf(loadingType) != -1;
}
