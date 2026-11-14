import { motion } from 'framer-motion';

export function PageTransition({ children, keyName }) {
  return (
    <motion.div
      key={keyName}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="min-h-[70vh]"
    >
      {children}
    </motion.div>
  );
}
