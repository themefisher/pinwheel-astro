import DynamicIcon from "@/helpers/DynamicIcon";
import { markdownify } from "@/lib/utils/textConverter";
import { useState } from "react";

const HomepageTab = ({ homepage_tab }) => {
  const { title, description, tab_list } = homepage_tab;

  const [tab, setTab] = useState(0);
  return (
    <div className="tab gx-5 row items-center py-10">
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
          <h2
            className="lg:text-4xl"
            dangerouslySetInnerHTML={{ __html: markdownify(title) }}
          />
          <p
            className="mt-4 mb-8"
            dangerouslySetInnerHTML={{ __html: markdownify(description) }}
          />

          <ul className="tab-nav border-b-0">
            {tab_list.map((item, index) => {
              return (
                <li
                  key={index}
                  className={`tab-nav-item ${
                    tab === index ? "active" : undefined
                  }`}
                  onClick={() => setTab(index)}
                >
                  <DynamicIcon
                    icon={item.icon}
                    className="mr-3 text-primary h-6 w-4"
                  />
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
