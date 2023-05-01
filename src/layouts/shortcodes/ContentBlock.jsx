import { markdownify } from "@lib/utils/textConverter";

const ContentBlock = ({
  title,
  subtitle,
  button_label,
  button_link,
  image,
  order,
  children,
}) => {
  return (
    <div className="section">
      <div className="container">
        <div className="row items-center justify-center">
          <div
            className={`lg:col-5 ${
              order === "right" ? "order-1" : "order-1 lg:order-0"
            }`}
          >
            <div className="section-title text-left">
              <p className="mb-4 text-[0.9rem] uppercase">
                {markdownify(subtitle)}
              </p>
              <h2 className="service-title">{markdownify(title)}</h2>
              <p className="text-[.9rem] text-text">{children}</p>
            </div>
            {button_label && (
              <a href={button_link} className="btn btn-primary">
                {button_label}
              </a>
            )}
          </div>
          <div
            className={`mb-6 lg:col-5 lg:mb-0 lg:mt-0 ${
              order === "right" ? "order-0" : "order-0 lg:order-1"
            }`}
          >
            <img
              src={image}
              alt={title}
              height={320}
              width={527}
              className="h-auto w-full max-w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentBlock;
