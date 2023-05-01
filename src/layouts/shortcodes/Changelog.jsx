import React from "react";

const Changelog = ({ children, date }) => {
  return (
    <section className="section changelogs pt-0">
      <div className="container">
        <div className="row justify-center">
          <div className="lg:col-10">
            <div className="row mb-10 lg:mt-0">
              <div className="lg:col-3">
                <h6 className="mb-4 pl-7 text-lg lg:mt-0 lg:pl-0">{date}</h6>
              </div>
              <div className="border-border lg:col-9 lg:border-l lg:pb-10 lg:pl-10">
                <div className="changelogs-content rounded-xl bg-white p-6 shadow-lg lg:p-10">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Changelog;
