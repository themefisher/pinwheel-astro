import { humanize } from "@/lib/utils/textConverter";
import { marked } from "marked";
import React, { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

const IntegrateMedia = ({ integrations, categories }) => {
  const [tab, setTab] = useState("");
  const filterPost = !tab
    ? integrations
    : integrations.filter((post) => post.data.categories.includes(tab));
  return (
    <section className="section pt-0">
      <div className="container">
        <div className="row justify-center">
          <div className="lg:col-10">
            <ul className="integration-tab filter-list flex flex-wrap items-center justify-center">
              <li>
                <span
                  className={`filter-btn ${
                    !tab ? "filter-btn-active" : undefined
                  } btn btn-sm cursor-pointer`}
                  onClick={() => setTab("")}
                >
                  All Categories
                </span>
              </li>
              {categories.map((category, i) => (
                <li key={`category-${i}`} onClick={() => setTab(category)}>
                  <span
                    className={`filter-btn ${
                      tab === category ? "filter-btn-active" : undefined
                    } btn btn-sm cursor-pointer`}
                  >
                    {humanize(category)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="integration-tab-items row mt-10">
          {filterPost.map((item, i) => (
            <div
              key={i}
              className="integration-tab-item mb-8 md:col-6 lg:col-4"
            >
              <div className="rounded-xl bg-white px-10 pb-8 pt-11 shadow-lg">
                <div className="integration-card-head flex items-center space-x-4">
                  <img src={item.data.image} alt="" />
                  <div>
                    <h4 className="h4">{humanize(item.data.name)}</h4>
                    {item.data.categories.map((category, i) => (
                      <span className="font-medium" key={i}>
                        {humanize(category)}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="my-5 border-y border-border py-5">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: marked.parseInline(
                        item.data.excerpt.slice(0, 80),
                      ),
                    }}
                  />
                </div>

                <a
                  className="group inline-flex items-center font-semibold text-text-dark hover:text-primary"
                  href={`/integrations/${item.id}`}
                >
                  View integration
                  <AiOutlineArrowRight className="ml-1.5 text-xl font-bold duration-300 group-hover:ml-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntegrateMedia;
