import React, { useEffect, useState } from "react";
import dateFormat from "@lib/utils/dateFormat";
// import { AiOutlineArrowRight } from "react-icons/ai";

const API_URL = `https://graphql.contentful.com/content/v1/spaces/${
  import.meta.env.PUBLIC_CONTENTFUL_SPACE_ID
}`;
const ACCESS_TOKEN = import.meta.env.PUBLIC_CONTENTFUL_PREVIEW_TOKEN;

const PublicationSidebar = ({categories}) => {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    const fetchPublications = async () => {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            query getPublicationsByCategories($categories: [String!]!){
              publicationsCollection(where: { categories_contains_some: $categories }){
                items{
                  slug
                  dateDePublication
                  titre
                  description
                }
              }
            }
          `,
          variables: {
            "categories": categories
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await response.json();
      setPublications(json.data.publicationsCollection.items);
    };

    fetchPublications();
  }, []);

  return (
    <>
      {publications.slice(0, 2).map((item) => (
        <div className="mb-8 rounded-xl bg-white px-7 py-10 shadow-lg" key={item.slug}>
          <h5 className="h5">{item.titre}</h5>
          <p className="mt-6">{item.description}</p>
          <ul className="text-dark mt-6 flex flex-wrap items-center">
            <li className="my-1 mr-8 inline-flex items-center">
              <svg
                className="mr-1"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.65217 0C3.42496 0 0 3.58065 0 8C0 12.4194 3.42496 16 7.65217 16C11.8794 16 15.3043 12.4194 15.3043 8C15.3043 3.58065 11.8794 0 7.65217 0ZM7.65217 14.4516C4.24264 14.4516 1.48107 11.5645 1.48107 8C1.48107 4.43548 4.24264 1.54839 7.65217 1.54839C11.0617 1.54839 13.8233 4.43548 13.8233 8C13.8233 11.5645 11.0617 14.4516 7.65217 14.4516ZM9.55905 11.0839L6.93941 9.09355C6.84376 9.01935 6.78822 8.90323 6.78822 8.78065V3.48387C6.78822 3.27097 6.95484 3.09677 7.15849 3.09677H8.14586C8.34951 3.09677 8.51613 3.27097 8.51613 3.48387V8.05484L10.5773 9.62258C10.7439 9.74839 10.7778 9.99032 10.6575 10.1645L10.0774 11C9.95708 11.171 9.72567 11.2097 9.55905 11.0839Z"
                  fill="currentColor"
                />
              </svg>
              {dateFormat(item.dateDePublication)}
            </li>
            <li className="my-1 mr-8">
              <a
                className="text-primary inline-flex items-center font-semibold"
                href={`/publications/${item.slug}`}
              >
                Découvrir
                {/* <AiOutlineArrowRight className="ml-1.5 text-xl font-bold" /> */}
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 1024 1024" class="ml-1.5 text-xl font-bold" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 0 0 0-48.4z"></path></svg>
              </a>
            </li>
          </ul>
        </div>
      ))}
    </>
  );
};

export default PublicationSidebar;
