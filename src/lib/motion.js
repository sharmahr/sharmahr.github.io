/* One physical vocabulary for the whole site. Entrances are settled and
   quiet; interactions are quicker and lighter. Everything else derives
   from these two springs so the page never feels like it was assembled
   from four different animation styles. */

export const ENTER = { type: "spring", stiffness: 120, damping: 20, mass: 0.9 };
export const SNAP = { type: "spring", stiffness: 420, damping: 26, mass: 0.6 };
export const LEAD = { type: "spring", stiffness: 90, damping: 18 };

export const VIEWPORT = { once: true, amount: 0.15, margin: "0px 0px -8% 0px" };

/* Parent/child pair for anything that should arrive in sequence rather
   than all at once — used by the work index and the toolkit rows. */
export const listParent = (stagger = 0.06, delayChildren = 0.04) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } }
});

export const listChild = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: ENTER }
};

export const listChildX = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: ENTER }
};
