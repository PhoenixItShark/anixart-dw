import clsx from 'clsx';

export const cn = (...classes: Parameters<typeof clsx>) => {
  return clsx(...classes);
};
