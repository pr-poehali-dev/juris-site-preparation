import { useEffect } from "react";

export function useReveal(selector: string = ".reveal") {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(selector);
    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [selector]);
}

export default useReveal;
