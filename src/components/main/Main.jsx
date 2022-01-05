import React from "react";
import BarChart from "./BarChart";

function Main() {
  return (
    <article className="bg-very-light-grey p3 flex-auto overflow-auto">
      <h1 className="regular darkgray line-height-1 mb3">Energy consumption</h1>
      <section className="mb3">
        <button
          type="button"
          className="
                h5
                inline-block
                shadow-2
                pl2
                pr2
                pt1
                pb1
                roundedMore
                border-grey
                bg-blue
                white
                bold
              "
        >
          Last 30 days
        </button>
      </section>
      <BarChart />
    </article>
  );
}

export default Main;
