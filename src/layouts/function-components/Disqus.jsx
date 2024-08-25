import config from "@/config/config.json";
import { DiscussionEmbed } from "disqus-react";
import React from "react";

const Disqus = () => {
  const { disqus } = config;
  return (
    <>
      {disqus.enable && (
        <div className="row mt-16 justify-center ">
          <DiscussionEmbed
            shortname={disqus.shortname}
            config={disqus.settings}
          />
        </div>
      )}
    </>
  );
};

export default Disqus;
