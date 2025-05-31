import { useState } from "react";
import { humanize, slugi } from "@lib/utils/textConverter";

const PublicationFilter = ({ categories }) => {
  const [activeTab, setActiveTab] = useState("");

  const handleTabClick = (category) => {
    setActiveTab(category);
    // Redirect to the first page of the filtered category
    if (category === "") {
      window.location.href = `/publications/page/1`;
    } else {
      window.location.href = `/publications/${slugi(category)}/page/1`;
    }
  };

  return (
    <div className="row">
      <div className="mx-auto text-center lg:col-8">
        {/* Title and subtitle will remain on the index page */}
        <ul className="filter-list mt-8 flex flex-wrap items-center justify-center">
          <li>
            <span
              className={`filter-btn ${
                activeTab === "" ? "filter-btn-active" : undefined
              } btn btn-sm cursor-pointer`}
              onClick={() => handleTabClick("")}
            >
              Toutes catégories
            </span>
          </li>
          {categories.map((category, i) => (
            <li key={`category-${i}`}>
              <span
                className={`filter-btn ${
                  activeTab === category ? "filter-btn-active" : undefined
                } btn btn-sm cursor-pointer`}
                onClick={() => handleTabClick(category)}
              >
                {humanize(category)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PublicationFilter;