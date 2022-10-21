import { useMediaQuery } from "react-responsive";

const useBreakpoints = () => {
  const sm = useMediaQuery({ query: "(min-width: 576px)" });
  const md = useMediaQuery({ query: "(min-width: 768px)" });
  const lg = useMediaQuery({ query: "(min-width: 992px)" });
  const xl = useMediaQuery({ query: "(min-width: 1200px)" });
  const xxl = useMediaQuery({ query: "(min-width: 1400px)" });

  return { sm, md, lg, xl, xxl };
};

export default useBreakpoints;
