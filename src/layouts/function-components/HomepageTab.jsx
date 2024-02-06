import { useState } from "react";
import { humanize } from "@/lib/utils/textConverter";
import * as Icon from "react-feather";

const HomepageTab = ({ homepage_tab: { tab_list, title, description } }) => {
  const [tab, setTab] = useState(0);
  return (
    <div className="tab gx-5 row items-center">
      <div className="lg:col-7 lg:order-2">
        <div className="tab-content">
          {tab_list.map((item, index) => (
            <div
              key={index}
              className={`tab-content-panel ${
                tab === index ? "active" : undefined
              }`}
            >
              <img className="w-full object-contain" src={item.image} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 lg:col-5 lg:order-1 lg:mt-0">
        <div className="text-container">
          <h2 className="lg:text-4xl">{title}</h2>
          <p className="mt-4">{description}</p>
          <ul className="tab-nav mt-8 border-b-0">
            {tab_list.map((item, index) => {
              const FeatherIcon = Icon[humanize(item.icon)];
              return (
                <li
                  key={index}
                  className={`tab-nav-item ${
                    tab === index ? "active" : undefined
                  }`}
                  onClick={() => setTab(index)}
                  
                >
                  <span className="tab-icon mr-3">
                    {" "}
                    <FeatherIcon />
                  </span>
                  {item.title}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomepageTab;
