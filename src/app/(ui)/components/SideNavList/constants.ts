export const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: 'easeOut' as const },
  },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};
