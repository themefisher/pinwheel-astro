import PropTypes from 'prop-types';
const FeatureCard = ({ feature_list, cardHeight, cardShadow , background }) => {
  return (
    <div className="key-feature-grid mt-10 grid grid-cols-2 gap-7 md:grid-cols-3 xl:grid-cols-4">
      {feature_list.map((item) => {
        return (
          <div
            key={item.id}
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
FeatureCard.propTypes = {
  feature_list: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.string,
    })
  ),
  cardHeight: PropTypes.string,
  cardShadow: PropTypes.string,
  background: PropTypes.string,
};
FeatureCard.defaultProps = {
  feature_list: [],
  cardHeight: "h-[250px]",
  cardShadow: "shadow-sm",
  background: "bg-white",
};

export default FeatureCard;
