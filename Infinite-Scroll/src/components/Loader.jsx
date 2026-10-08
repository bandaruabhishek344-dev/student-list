import React from "react";

function Loader() {
  return (
    <div className="loader">
      Loading Recipes...
    </div>
  );
}

export default React.memo(Loader);