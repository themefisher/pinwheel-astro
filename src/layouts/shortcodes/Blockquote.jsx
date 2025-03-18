const Blockquote = ({ name, children }) => {
  return (
    <div className="blockquote my-10 rounded-xl bg-white px-16 py-8 lg:px-20">
      <blockquote className="text-2xl text-text-dark">{children}</blockquote>
      <p className="mb-0 mt-4">{name}</p>
    </div>
  );
};

export default Blockquote;
