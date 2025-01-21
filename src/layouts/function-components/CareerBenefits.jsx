import { humanize } from "@/lib/utils/textConverter";
import * as Icon from "react-feather";
const CareerBenefits = ({ benefits }) => {
  const { title, description, benefit_list } = benefits;
  return (
    <section className="section">
      <div className="container">
        <div className="row">
          <div className="mx-auto text-center lg:col-8">
            <h2>{title}</h2>
            <p className="mt-4">{description}</p>
          </div>
        </div>
        <div className="row mt-14 text-center">
          {benefit_list.map((item, i) => {
            const FeatherIcon = Icon[humanize(item.icon)];

            return (
              <div className="mb-10 sm:col-6 lg:col-4 " key={i}>
                <div className="relative">
                  <svg
                    className={`mx-auto h-[90px] w-[100px]`}
                    style={{
                      fill: item.color,
                      opacity: 0.1,
                    }}
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M47.1,-61.5C62.2,-53.9,76.5,-41.7,83.1,-25.9C89.6,-10.2,88.6,9.1,82.4,26.4C76.2,43.6,64.9,58.7,50.4,70.5C35.8,82.2,17.9,90.6,0,90.7C-18,90.7,-35.9,82.4,-48.4,70C-61,57.6,-68.1,41,-73.6,23.9C-79.1,6.9,-83,-10.7,-78.6,-26C-74.3,-41.3,-61.6,-54.3,-47.1,-62.1C-32.6,-70,-16.3,-72.7,-0.1,-72.5C16,-72.3,32,-69.2,47.1,-61.5Z"
                      transform="translate(100 100)"
                    />
                  </svg>
                  <span className="benifit-icon absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[28%]">
                    <FeatherIcon color={item.color} size={48} />
                  </span>
                </div>
                <h3 className="h4 mb-4 mt-8">{item.title}</h3>
                <p>{item.content}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CareerBenefits;
