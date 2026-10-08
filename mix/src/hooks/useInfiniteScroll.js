import { useEffect, useRef } from "react";

function useInfiniteScroll(
  loadMore,
  loading,
  hasMore
) {

  const isFetching = useRef(false);

  useEffect(() => {

    function handleScroll() {

      const scrollPosition =
        window.innerHeight +
        window.scrollY;

      const pageHeight =
        document.documentElement.scrollHeight;

      const reachedBottom =
        scrollPosition >=
        pageHeight - 200;

      // Load more when user reaches bottom
      if (
        reachedBottom &&
        !loading &&
        !isFetching.current
      ) {

        isFetching.current = true;

        // Fake API loading delay
        setTimeout(() => {

          loadMore();

        }, 1000);

      }

    }

    // Listen for page scroll
    window.addEventListener(
      "scroll",
      handleScroll
    );

    // Check immediately in case page is already short
    handleScroll();

    return () => {

      window.removeEventListener(
        "scroll",
        handleScroll
      );

    };

  }, [
    loadMore,
    loading,
    hasMore
  ]);

  // Unlock after loading finishes
  useEffect(() => {

    if (!loading) {

      isFetching.current = false;

    }

  }, [loading]);

}

export default useInfiniteScroll;