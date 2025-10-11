import DynamicIcon from "@/helpers/DynamicIcon";
import { humanize } from "@/lib/utils/textConverter";

const HomapageFeature = ({ feature_list }) => {
  return (
    <div className="key-feature-grid mt-10 grid grid-cols-2 gap-7 md:grid-cols-3 xl:grid-cols-4">
      {feature_list.map((item, i) => {
        return (
          <div
            key={i}
            className="flex flex-col justify-between rounded-lg bg-white p-5 shadow-lg"
          >
            <div>
              <h3 className="h4 text-xl lg:text-2xl">{item.title}</h3>
              <p>{item.content}</p>
            </div>
            <span className="icon mt-4">
              <DynamicIcon
                icon={item.icon}
                className="mt-4 w-6 h-6 text-primary"
              />
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default HomapageFeature;
