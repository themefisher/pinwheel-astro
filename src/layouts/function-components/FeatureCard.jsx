
const FeatureCard = ({ feature_list, cardHeight = "h-[250px]", cardShadow = "shadow-sm" , background = "bg-white" }) => {
  return (
    <div className="key-feature-grid mt-10 grid grid-cols-2 gap-7 md:grid-cols-3 xl:grid-cols-4">
      {feature_list.map((item, i) => {
        return (
          <div
            key={i}
          >
            <div className={`feature-card rounded-xl ${cardHeight} ${cardShadow} ${background} p-5 pb-8 text-center`}>
              <h3 className="h4 text-xl lg:text-2xl">{item.title}</h3>
              <p>{item.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FeatureCard;
