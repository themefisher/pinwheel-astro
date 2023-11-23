import { humanize } from "@lib/utils/textConverter";
import * as Icon from "react-feather";

const HomapageFeature = ({ feature_list }) => {
  return (
    <div className="key-feature-grid mt-10 grid grid-cols-2 gap-7 md:grid-cols-3 xl:grid-cols-4">
      {feature_list.map((item, i) => {
        const FeatherIcon = Icon[humanize(item.icon)];
        return (
          <div
            key={i}
            className="flex flex-col justify-between rounded-lg bg-white p-5 shadow-lg"
          >
            <div>
              <h3 className="h4 text-xl lg:text-2xl">{item.title}</h3>
              <p>{item.activities} activités</p>
            </div>
            <span className="icon mt-4">
              <FeatherIcon />
            </span>
            <div className="relative bg-gray-100 h-6 rounded-md mt-2">
                <div
                  className={`absolute h-full top-0 left-0 bg-${item.color || 'bg-blue-500'}`} // Utilisation de la couleur personnalisée ou bleu par défaut
                  style={{ width: `${item.percentage}%` }}
                ></div>
                <div className="absolute bottom-0 right-0 h-full flex items-center pr-2">
                  <span className="text-sm text-primary">{item.percentage}%</span>
                </div>
              </div>
          </div>
        );
      })}
    </div>
  );
};

export default HomapageFeature;
