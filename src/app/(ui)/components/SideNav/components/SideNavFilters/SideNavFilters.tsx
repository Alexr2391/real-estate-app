import {
  PRICE_RANGE_OPTIONS,
  TYPE_OFFER_OPTIONS,
} from '../SIdeNavActions/constants';
import { FilterSelect } from './components/FilterSelect/FilterSelect';
import { PriceRangeFilter } from './components/PriceRangeFilter/PriceRangeFilter';
import css from './SideNavFilters.module.scss';

export { FilterSelect, PriceRangeFilter };

export const SideNavFilters = () => {
  return (
    <div className={css.container}>
      <FilterSelect placeholder='Sale' options={TYPE_OFFER_OPTIONS} />
      <PriceRangeFilter
        placeholder='Price'
        minOptions={PRICE_RANGE_OPTIONS}
        maxOptions={PRICE_RANGE_OPTIONS}
      />
    </div>
  );
};
