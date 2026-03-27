import { GrAdd } from 'react-icons/gr';
import { IoIosOptions } from 'react-icons/io';
import { MainButton } from '../../../common/Button/Button';
import css from './SideNavActions.module.scss';

export const SideNavActions = () => {
  return (
    <div className={css.container}>
      <div className={css.flexbox}>
        <MainButton
          className={css.addButton}
          variant='contained'
          color='primary'
          startIcon={<GrAdd />}
        >
          Add Property
        </MainButton>
        <MainButton.Icon color='neutral' shape='square'>
          <IoIosOptions />
        </MainButton.Icon>
      </div>
    </div>
  );
};
