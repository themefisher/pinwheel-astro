import { useState } from "react";
import { humanize } from "@lib/utils/textConverter";
import dateFormat from "@lib/utils/dateFormat";
import { marked } from "marked";
import { AiOutlineArrowRight } from "react-icons/ai/index.js";
const PublicationPosts = ({ posts, categories, career: { title, subtitle } }) => {
  const [tab, setTab] = useState("");
  const filterPost = !tab
    ? posts
    : posts.filter((post) => post.categories.includes(tab));

  return (
    <section className="section">
      <div className="container">
        <div className="row">
          <div className="mx-auto text-center lg:col-8">
            <h2>{title}</h2>
            <p
              className="mt-4"
              dangerouslySetInnerHTML={{ __html: marked.parseInline(subtitle) }}
            />

            <ul className="filter-list mt-8 flex flex-wrap items-center justify-center">
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
        <div className="row mt-12">
          {filterPost.map((post, i) => (
            <div className="mb-8 md:col-6" key={`post-${i}`}>
              <div className="rounded-xl bg-white p-5 shadow-lg lg:p-10">
                <h3 className="h4">{post.titre}</h3>
                <p className="mt-6">{post.description}</p>
                <ul className="mt-6 flex flex-wrap items-center text-dark">
                  <li className="my-1 mr-8 inline-flex items-center">
                    <svg
                        className="mr-1.5"
                        width="14"
                        height="16"
                        viewBox="0 0 14 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                            d="M12.5 2H11V0.375C11 0.16875 10.8313 0 10.625 0H9.375C9.16875 0 9 0.16875 9 0.375V2H5V0.375C5 0.16875 4.83125 0 4.625 0H3.375C3.16875 0 3 0.16875 3 0.375V2H1.5C0.671875 2 0 2.67188 0 3.5V14.5C0 15.3281 0.671875 16 1.5 16H12.5C13.3281 16 14 15.3281 14 14.5V3.5C14 2.67188 13.3281 2 12.5 2ZM12.3125 14.5H1.6875C1.58438 14.5 1.5 14.4156 1.5 14.3125V5H12.5V14.3125C12.5 14.4156 12.4156 14.5 12.3125 14.5Z"
                            fill="#939393"
                        />
                    </svg>
                    {dateFormat(post.dateDePublication)}
                  </li>
                  <li className="my-1 mr-8">
                    <a
                      className="inline-flex items-center font-semibold text-primary"
                      href={`/publications/${post.slug}`}
                    >
                      Découvrir
                      <AiOutlineArrowRight className="ml-1.5 text-xl font-bold" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PublicationPosts;
