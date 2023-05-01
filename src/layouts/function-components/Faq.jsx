import { marked } from "marked";
import { useState } from "react";

const Faq = ({ data }) => {
  const [isActive, setIsActive] = useState([]);
  const accordionHandler = (index) => {
    if (isActive.includes(index)) {
      setIsActive(isActive.filter((item) => item !== index));
    } else {
      setIsActive((prev) => [...prev, index]);
    }
  };

  return (
    <section className="faqs section">
      <div className="container max-w-[1230px]">
        <div className="row">
          <div className="text-center lg:col-4 lg:text-start">
            <h2>{data.faq.title}</h2>
            <p className="mt-6 lg:max-w-[404px]">{data.faq.description}</p>
          </div>
          <div className="mt-8 lg:col-8 lg:mt-0">
            <div className="rounded-xl bg-white px-5 py-5 shadow-lg lg:px-10 lg:py-8">
              {data.faq.faq_list.map((item, i) => (
                <div
                  className={`accordion border-b border-border ${
                    isActive.includes(i) ? "active" : undefined
                  }`}
                  onClick={() => accordionHandler(i)}
                  key={`item-${i}`}
                >
                  <div
                    className="accordion-header relative pl-6 text-lg font-semibold text-dark"
                    
                  >
                    {item.title}
                    <svg
                      className="accordion-icon absolute left-0 top-[22px]"
                      x="0px"
                      y="0px"
                      viewBox="0 0 512 512"
                      xmlSpace="preserve"
                    >
                      <path
                        fill="currentColor"
                        d="M505.755,123.592c-8.341-8.341-21.824-8.341-30.165,0L256.005,343.176L36.421,123.592c-8.341-8.341-21.824-8.341-30.165,0 s-8.341,21.824,0,30.165l234.667,234.667c4.16,4.16,9.621,6.251,15.083,6.251c5.462,0,10.923-2.091,15.083-6.251l234.667-234.667 C514.096,145.416,514.096,131.933,505.755,123.592z"
                      ></path>
                    </svg>
                  </div>
                  <div className="accordion-content pl-6">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: marked.parseInline(item.content),
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
