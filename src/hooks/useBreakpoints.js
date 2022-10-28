import { useMediaQuery } from "react-responsive";

const useBreakpoints = () => {
  /* Uses react-responsive to create breakpoints at different sizes. Sizes
  have been set to match Bootstrap breakpoints. */
  const sm = useMediaQuery({ query: "(min-width: 576px)" });
  const md = useMediaQuery({ query: "(min-width: 768px)" });
  const lg = useMediaQuery({ query: "(min-width: 992px)" });
  const xl = useMediaQuery({ query: "(min-width: 1200px)" });
  const xxl = useMediaQuery({ query: "(min-width: 1400px)" });

  /* Returns breakpoints */
  return { sm, md, lg, xl, xxl };
};

export default useBreakpoints;
