import { humanize } from "@/lib/utils/textConverter";
import * as Icon from "react-feather";
import { Image } from "astro:assets";


const Merchandise = ({ merch_list }) => {
  return (
    <div className="key-feature-grid mt-10 grid grid-cols-2 gap-7 md:grid-cols-3 xl:grid-cols-4">
      {merch_list.map((merch, i) => (
        <div
          key={i}
          className="group"
        >
          <div className="group relative overflow-hidden rounded-lg bg-white shadow-lg">
            <img
              src={merch.cover_image}
              alt={merch.name}
              width={300}
              height={300}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex flex-col justify-between bg-black bg-opacity-0 p-5 text-white opacity-0 transition-all duration-300 group-hover:bg-opacity-60 group-hover:opacity-100">
              <p className="text">{merch.description}</p>
            </div>
          </div>
          <div className="flex items-center justify-center bg-black bg-opacity-0 p-5 transition-all duration-300">
            <h3 className="h4 mb-2 text-lg font-bold lg:text-xl">{merch.name}</h3>
            <p className="text-lg font-semibold">{merch.price?.toLocaleString("en-ZA", { style: "currency", currency: "ZAR", minimumFractionDigits: 2 })}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Merchandise;


// const Merchandise = ({ feature_list }) => {
//   return (
//     <div className="key-feature-grid mt-10 grid grid-cols-2 gap-7 md:grid-cols-3 xl:grid-cols-4">
//       {feature_list.map((item, i) => {
//         const FeatherIcon = Icon[humanize(item.icon)];
//         return (
//           <div
//             key={i}
//             className="flex flex-col justify-between rounded-lg bg-white p-5 shadow-lg"
//           >
//             <div>
//               <h3 className="h4 text-xl lg:text-2xl">{item.title}</h3>
//               <p>{item.content}</p>
//             </div>
//             <span className="icon mt-4">
//               <FeatherIcon />
//             </span>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Merchandise;
