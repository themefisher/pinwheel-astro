import { marked } from "marked";
import { AiOutlineArrowRight } from "react-icons/ai";
const Products = ({ posts, product: { title, subtitle } }) => {
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
          </div>
        </div>
        <div className="row mt-12">
          {posts.map((post, i) => (
            <div className="mb-8 md:col-6" key={`post-${i}`}>
              <div className="rounded-xl bg-white p-5 shadow-lg lg:p-10 h-full">
                <h3 className="h4">{post.data.title}</h3>
                <p className="mt-6">{post.data.excerpt}</p>
                <ul className="mt-6 flex flex-wrap items-center text-dark">
                  <li className="my-1 mr-8">
                    <a
                      className="inline-flex items-center font-semibold text-primary"
                      href={`/products/hwc/${post.slug}`}
                    >
                      Read More
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

export default Products;
