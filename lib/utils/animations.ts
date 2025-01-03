export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export const scaleIn = {
  initial: { scale: 0.8 },
  animate: { scale: 1 },
  transition: { 
    type: "spring",
    stiffness: 260,
    damping: 20 
  }
};

export const buttonTapAnimation = {
  whileTap: { scale: 0.95 },
  whileHover: { scale: 1.05 }
};