import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

export function Button({ children, variant = 'primary', className, as = 'button', to, ...props }) {
  const variants = {
    primary: 'bg-[#f3e9d8] text-[#141414] hover:bg-[#e8dcc2]',
    secondary: 'border border-white/15 bg-transparent text-[#f5f5f5] hover:bg-white/5',
    ghost: 'text-[#f5f5f5] hover:text-[#d6a15b]',
  };

  const classes = cn(
    'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d6a15b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]',
    variants[variant],
    className,
  );

  if (as === 'link' || to) {
    return (
      <Link to={to || '/'} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={classes}
      {...props}
    >
      {children}
    </motion.button>
  );
}
