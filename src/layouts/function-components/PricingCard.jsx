import DynamicIcon from "@/helpers/DynamicIcon";

const PricingCard = ({ item }) => {
  return (
    <div className="mt-8 px-3 md:col-6 lg:col-4 lg:mt-0" key={item.title}>
      <div
        className={`rounded-xl bg-white px-8 py-10 shadow-lg ${
          item.featured ? "-mt-16 border border-primary " : undefined
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="h3">{item.title}</h2>
            <p className="mt-3 text-2xl text-text-dark">
              {item.pre_currency} {item.price}.00 {item.post_currency}
            </p>
          </div>
          <span
            className={`inline-flex h-16 w-16 items-center justify-center rounded-full font-bold ${
              item.featured
                ? "bg-gradient text-white"
                : "bg-light text-text-dark"
            }`}
          >
            <DynamicIcon icon={item.icon} className="h-8 w-8 font-semibold" />
          </span>
        </div>
        <p className="mt-6">{item.description}</p>
        <div className="my-6 border-y border-border py-6">
          <h4 className="h6">{item.services.title}</h4>

          <ul className="mt-6">
            {item.services.list.map((service, i) => (
              <li className="mb-3 text-sm" key={`service-${i}`}>
                <svg
                  className={`mr-2 inline size-3.5 ${
                    item.featured ? "text-primary" : "text-text-light"
                  }`}
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  class="mr-1 inline size-3.5 text-primary"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a6 6 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707s.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a6 6 0 0 1 1.013.16l3.134-3.133a3 3 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146"></path>
                </svg>
                {service}
              </li>
            ))}
          </ul>
        </div>
        <div className="text-center">
          <a
            className={`btn ${
              item.featured ? "btn-primary" : "btn-outline-white"
            } block h-12 w-full rounded-[50px] leading-7.5`}
            href={item.buttons.buy_now.link}
          >
            {item.buttons.buy_now.label}
          </a>
          <a
            className="mt-6 inline-flex items-center text-text-dark"
            href={item.buttons.free_trial.link}
          >
            {item.buttons.free_trial.label}
            <svg
              className="ml-1.5"
              width="13"
              height="16"
              viewBox="0 0 13 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.7071 8.70711C13.0976 8.31658 13.0976 7.68342 12.7071 7.29289L6.34315 0.928932C5.95262 0.538408 5.31946 0.538408 4.92893 0.928932C4.53841 1.31946 4.53841 1.95262 4.92893 2.34315L10.5858 8L4.92893 13.6569C4.53841 14.0474 4.53841 14.6805 4.92893 15.0711C5.31946 15.4616 5.95262 15.4616 6.34315 15.0711L12.7071 8.70711ZM0 9H12V7H0V9Z"
                fill="currentColor"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
