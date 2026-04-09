import { STATUS, type StatusValues } from '@/types';
import { classNames } from '@/utils/classnames';
import type { FC } from 'react';
import css from './StatusTag.module.scss';

interface StatusTagProps {
  type: StatusValues;
}

const { ACTIVE, ARCHIVED, DRAFT, PUBLISHED } = STATUS;

export const StatusTag: FC<StatusTagProps> = ({ type }) => {
  return (
    <div className={css.container}>
      <span
        className={classNames(css.statusDot, {
          [css.active]: type === ACTIVE,
          [css.archived]: type === ARCHIVED,
          [css.draft]: type === DRAFT,
          [css.published]: type === PUBLISHED,
        })}
      ></span>
      <div className={css.statusText}>
        {Object.values(STATUS)
          .find((status) => status === type)
          ?.toLocaleUpperCase()}
      </div>
    </div>
  );
};
