import React, { useState } from "react";
import { humanize } from "@lib/utils/textConverter";
import { marked } from "marked";
import { AiOutlineArrowRight } from "react-icons/ai/index.js";

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
                  Toutes catégories
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
                  </div>
                </div>
                <div className="my-5 border-y border-border py-5">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: marked.parseInline(
                        item.data.excerpt.slice(0, 80)
                      ),
                    }}
                  />
                  {item.data?.standard && <p className="py-4 flex flex-wrap">
                    {item.data?.standard?.administration && <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Administration</span>}
                    {item.data?.standard?.apprentissage && <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">Apprentissage</span>}
                    {item.data?.standard?.dynamisme && <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Dynamisme</span>}
                    {item.data?.standard?.durabilite && <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Durabilité</span>}
                  </p>}
                </div>

                <a
                  className="group inline-flex items-center font-semibold text-dark hover:text-primary"
                  href={`/associations/${item.slug}`}
                >
                  Découvrir
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
