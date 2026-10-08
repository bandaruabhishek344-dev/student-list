import { useEffect } from "react";

function useInfiniteScroll(hasMore, loading, setPage) {
  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;

      const windowHeight = window.innerHeight;

      const fullHeight = document.documentElement.scrollHeight;

      // User reached near bottom
      if (
        scrollTop + windowHeight >= fullHeight - 150 &&
        hasMore &&
        !loading
      ) {
        setPage((prev) => prev + 1);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore, loading, setPage]);
}

export default useInfiniteScroll;