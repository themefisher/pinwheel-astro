import { useEffect } from "react";

const Youtube = ({ id, title, ...rest }) => {
  useEffect(() => {
    import("@justinribeiro/lite-youtube");
  }, []);

  // @ts-ignore
  return (
    <lite-youtube
      class="rounded-md"
      videoid={id}
      videotitle={title}
      {...rest}
    />
  );
};

export default Youtube;
