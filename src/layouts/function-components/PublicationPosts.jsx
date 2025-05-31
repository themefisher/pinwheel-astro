import { useState, useMemo } from "react";
import { humanize } from "@lib/utils/textConverter";
import dateFormat from "@lib/utils/dateFormat";
import { marked } from "marked";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai/index.js";

const PublicationPosts = ({ posts, categories, career: { title, subtitle }, postsPerPage }) => {
  const [tab, setTab] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filterPost = useMemo(() => {
    setCurrentPage(1); // Reset page when filter changes
    return !tab
      ? posts
      : posts.filter((post) => post.categories.includes(tab));
  }, [posts, tab]);

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filterPost.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filterPost.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Generate page numbers for pagination controls
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

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
          {currentPosts.map((post, i) => (
            <div className="mb-8 md:col-6" key={`post-${i}`}>
              <div className="rounded-xl bg-white p-5 shadow-lg lg:p-10">
                 {post.photo?.fields.file && (
                  <img
                    className="card-img mb-4"
                    src={post.photo.fields.file.url}
                    alt={post.photo.fields.file.fileName}
                    width={335} // Added width for better rendering, adjust as needed
                    height={210} // Added height for better rendering, adjust as needed
                  />
                )}
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

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <nav className="mb-4 mt-14 flex items-center justify-center" aria-label="Pagination">
            {/* Previous button */}
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`mr-5 flex items-center rounded-full border px-4 py-2 text-dark hover:shadow-lg md:px-6 md:py-3 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
               <AiOutlineArrowLeft className="mr-1.5 text-xl font-bold" />
              Précédent
            </button>

            {/* Page numbers */}
            {pageNumbers.map(number => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`mx-1 flex h-10 w-10 items-center justify-center rounded-full border md:h-12 md:w-12 ${currentPage === number ? 'bg-primary text-white' : 'bg-white text-dark hover:bg-primary hover:text-white'}`}
              >
                {number}
              </button>
            ))}

            {/* Next button */}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`ml-5 flex items-center rounded-full border px-4 py-2 text-dark hover:shadow-lg md:px-6 md:py-3 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Suivant
              <AiOutlineArrowRight className="ml-1.5 text-xl font-bold" />
            </button>
          </nav>
        )}
      </div>
    </section>
  );
};

export default PublicationPosts;
