import React from "react";

const SimplePdf = () => {
  return (
    <div>
      <button onClick={() => window.print()}>Generar</button>
    </div>
  );
};

export default SimplePdf;
