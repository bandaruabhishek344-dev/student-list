import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  memo,
} from "react";

import "../styles/SearchBar.css";

/* ==========================================
   IMPORTANT:
   Keep this array OUTSIDE the component.
   This prevents a new [] from being created
   on every render.
========================================== */

const EMPTY_SUGGESTIONS = [];

function SearchBar({
  search,
  setSearch,
  loading = false,
  resultCount = 0,
  suggestions = EMPTY_SUGGESTIONS,
}) {
  /* ==========================================
        REFS
  ========================================== */

  const inputRef = useRef(null);

  const recognitionRef = useRef(null);

  /* ==========================================
        STATES
  ========================================== */

  const [recentSearch, setRecentSearch] = useState([]);

  const [filteredSuggestions, setFilteredSuggestions] =
    useState([]);

  const [activeIndex, setActiveIndex] =
    useState(-1);

  const [showSuggestions, setShowSuggestions] =
    useState(false);

  /* ==========================================
        LOAD RECENT SEARCHES
  ========================================== */

  useEffect(() => {
    try {
      const stored =
        localStorage.getItem("recentSearches");

      if (!stored) {
        setRecentSearch([]);
        return;
      }

      const history = JSON.parse(stored);

      if (Array.isArray(history)) {
        setRecentSearch(history);
      } else {
        setRecentSearch([]);
      }
    } catch (error) {
      console.error(
        "Failed to load recent searches:",
        error
      );

      setRecentSearch([]);
    }
  }, []);

  /* ==========================================
        SAVE RECENT SEARCHES
  ========================================== */

  useEffect(() => {
    try {
      localStorage.setItem(
        "recentSearches",
        JSON.stringify(recentSearch)
      );
    } catch (error) {
      console.error(
        "Failed to save recent searches:",
        error
      );
    }
  }, [recentSearch]);

  /* ==========================================
        CTRL + K
  ========================================== */

  useEffect(() => {
    const handleShortcut = (event) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();

        inputRef.current?.focus();
      }
    };

    window.addEventListener(
      "keydown",
      handleShortcut
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleShortcut
      );
    };
  }, []);

  /* ==========================================
        ESC TO CLEAR
  ========================================== */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key !== "Escape") {
        return;
      }

      setSearch("");

      setShowSuggestions(false);

      setActiveIndex(-1);
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [setSearch]);

  /* ==========================================
        VOICE SEARCH
  ========================================== */

  const voiceSearch = useCallback(() => {
    if (
      !("webkitSpeechRecognition" in window)
    ) {
      alert(
        "Voice Search is not supported in this browser."
      );

      return;
    }

    try {
      const recognition =
        new window.webkitSpeechRecognition();

      recognitionRef.current =
        recognition;

      recognition.lang = "en-US";

      recognition.interimResults = false;

      recognition.continuous = false;

      recognition.onresult = (event) => {
        const text =
          event.results?.[0]?.[0]?.transcript ||
          "";

        if (text.trim()) {
          setSearch(text.trim());
        }
      };

      recognition.onerror = (event) => {
        console.error(
          "Voice search error:",
          event.error
        );
      };

      recognition.onend = () => {
        recognitionRef.current = null;
      };

      recognition.start();
    } catch (error) {
      console.error(
        "Voice search failed:",
        error
      );
    }
  }, [setSearch]);

  /* ==========================================
        VOICE CLEANUP
  ========================================== */

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (error) {
          // Recognition may already be stopped
        }

        recognitionRef.current = null;
      }
    };
  }, []);

  /* ==========================================
        FILTER SUGGESTIONS

        IMPORTANT:
        suggestions must have a stable reference.
  ========================================== */

  useEffect(() => {
    const query =
      search.trim().toLowerCase();

    /* No search text */

    if (!query) {
      setFilteredSuggestions((previous) => {
        if (previous.length === 0) {
          return previous;
        }

        return [];
      });

      setShowSuggestions(false);

      setActiveIndex(-1);

      return;
    }

    /* Make sure suggestions is an array */

    if (!Array.isArray(suggestions)) {
      setFilteredSuggestions([]);

      setShowSuggestions(false);

      setActiveIndex(-1);

      return;
    }

    const filtered =
      suggestions.filter((item) => {
        if (
          typeof item !== "string"
        ) {
          return false;
        }

        return item
          .toLowerCase()
          .includes(query);
      });

    setFilteredSuggestions(filtered);

    setShowSuggestions(
      filtered.length > 0
    );

    setActiveIndex(-1);
  }, [
    search,
    suggestions,
  ]);

  /* ==========================================
        INPUT CHANGE
  ========================================== */

  const handleChange = useCallback(
    (event) => {
      setSearch(
        event.target.value
      );
    },
    [setSearch]
  );

  /* ==========================================
        CLEAR SEARCH
  ========================================== */

  const handleClear = useCallback(() => {
    setSearch("");

    setShowSuggestions(false);

    setActiveIndex(-1);

    inputRef.current?.focus();
  }, [setSearch]);

  /* ==========================================
        SAVE SEARCH
  ========================================== */

  const saveSearch = useCallback(
    (value) => {
      const trimmedValue =
        value.trim();

      if (!trimmedValue) {
        return;
      }

      setRecentSearch((previous) => {
        const updated = [
          trimmedValue,
          ...previous.filter(
            (item) =>
              item !== trimmedValue
          ),
        ];

        return updated.slice(0, 5);
      });
    },
    []
  );

  /* ==========================================
        SELECT SUGGESTION
  ========================================== */

  const handleSuggestionClick =
    useCallback(
      (value) => {
        if (!value) {
          return;
        }

        setSearch(value);

        saveSearch(value);

        setShowSuggestions(false);

        setActiveIndex(-1);

        inputRef.current?.focus();
      },
      [
        setSearch,
        saveSearch,
      ]
    );

  /* ==========================================
        INPUT BLUR
  ========================================== */

  const handleBlur = useCallback(() => {
    /*
      Small delay allows onMouseDown
      suggestion click to execute first.
    */

    setTimeout(() => {
      setShowSuggestions(false);

      setActiveIndex(-1);
    }, 150);
  }, []);

  /* ==========================================
        INPUT FOCUS
  ========================================== */

  const handleFocus = useCallback(() => {
    if (
      search.trim() &&
      filteredSuggestions.length > 0
    ) {
      setShowSuggestions(true);
    }
  }, [
    search,
    filteredSuggestions.length,
  ]);

  /* ==========================================
        KEYBOARD NAVIGATION
  ========================================== */

  const handleKeyDown = useCallback(
    (event) => {
      if (
        !showSuggestions ||
        filteredSuggestions.length === 0
      ) {
        if (
          event.key === "Enter"
        ) {
          saveSearch(search);
        }

        return;
      }

      switch (event.key) {
        /* ==========================
             ARROW DOWN
        ========================== */

        case "ArrowDown":
          event.preventDefault();

          setActiveIndex((previous) => {
            if (
              previous <
              filteredSuggestions.length - 1
            ) {
              return previous + 1;
            }

            return previous;
          });

          break;

        /* ==========================
             ARROW UP
        ========================== */

        case "ArrowUp":
          event.preventDefault();

          setActiveIndex((previous) => {
            if (previous > 0) {
              return previous - 1;
            }

            return -1;
          });

          break;

        /* ==========================
             ENTER
        ========================== */

        case "Enter":
          event.preventDefault();

          if (
            activeIndex >= 0 &&
            activeIndex <
              filteredSuggestions.length
          ) {
            handleSuggestionClick(
              filteredSuggestions[
                activeIndex
              ]
            );
          } else {
            saveSearch(search);

            setShowSuggestions(false);
          }

          break;

        /* ==========================
             ESC
        ========================== */

        case "Escape":
          event.preventDefault();

          setShowSuggestions(false);

          setActiveIndex(-1);

          break;

        default:
          break;
      }
    },
    [
      showSuggestions,
      filteredSuggestions,
      activeIndex,
      search,
      saveSearch,
      handleSuggestionClick,
    ]
  );

  /* ==========================================
        REMOVE HISTORY
  ========================================== */

  const removeHistory = useCallback(
    (item) => {
      setRecentSearch((previous) =>
        previous.filter(
          (value) =>
            value !== item
        )
      );
    },
    []
  );

  /* ==========================================
        RENDER
  ========================================== */

  return (
    <div className="swiggy-search-wrapper">

      {/* ==================================
            LOCATION BAR
      ================================== */}

      <div className="location-bar">

        <span className="location-icon">
          📍
        </span>

        <span>
          Delivering to
        </span>

        <strong>
          Home
        </strong>

      </div>

      {/* ==================================
            SEARCH BOX
      ================================== */}

      <div className="swiggy-search">

        <div className="search-icon">
          🔍
        </div>

        <input
          ref={inputRef}
          type="text"
          value={search}
          placeholder="Search dishes, restaurants or cuisines..."
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={handleFocus}
          aria-label="Search Recipes"
          autoComplete="off"
        />

        {/* LOADER */}

        {loading && (
          <div className="search-loader">
            ⏳
          </div>
        )}

        {/* CLEAR BUTTON */}

        {search && !loading && (
          <button
            type="button"
            className="clear-search"
            onClick={handleClear}
            aria-label="Clear search"
          >
            ✖
          </button>
        )}

        {/* VOICE BUTTON */}

        <button
          type="button"
          className="voice-search"
          onClick={voiceSearch}
          title="Voice Search"
          aria-label="Voice Search"
        >
          🎤
        </button>

      </div>

      {/* ==================================
            RESULT COUNT
      ================================== */}

      {search && (
        <div className="result-box">

          Found{" "}

          <strong>
            {resultCount}
          </strong>

          {" "}recipes

        </div>
      )}

      {/* ==================================
            SUGGESTIONS
      ================================== */}

      {showSuggestions &&
        filteredSuggestions.length > 0 && (
          <div className="suggestion-box">

            {filteredSuggestions.map(
              (item, index) => (
                <div
                  key={item}
                  className={
                    activeIndex === index
                      ? "suggestion-item active"
                      : "suggestion-item"
                  }
                  onMouseDown={(event) => {
                    event.preventDefault();

                    handleSuggestionClick(
                      item
                    );
                  }}
                >
                  🔎 {item}
                </div>
              )
            )}

          </div>
        )}

      {/* ==================================
            RECENT SEARCHES
      ================================== */}

      {recentSearch.length > 0 && (
        <div className="recent-search">

          <div className="recent-header">

            <h4>
              Recent Searches
            </h4>

          </div>

          {recentSearch.map(
            (item) => (
              <div
                key={item}
                className="recent-item"
              >

                <span
                  onMouseDown={(event) => {
                    event.preventDefault();

                    handleSuggestionClick(
                      item
                    );
                  }}
                >
                  🕘 {item}
                </span>

                <button
                  type="button"
                  className="remove-history"
                  onMouseDown={(event) => {
                    event.preventDefault();
                  }}
                  onClick={() =>
                    removeHistory(item)
                  }
                  aria-label={`Remove ${item}`}
                >
                  ✖
                </button>

              </div>
            )
          )}

        </div>
      )}

    </div>
  );
}

export default memo(SearchBar);