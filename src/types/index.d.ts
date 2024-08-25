export type TIndexData = {
  id: string;
  slug: string;
  body: string;
  collection: string;
  data: {
    title: string;
    description?: string;
    authors?: string[];
    categories: string[];
    tags?: string[];
    meta_title?: string;
    image: string;
  };
  render: () => Promise<void>;
};

export type TCareerIndex = {
  id: string;
  slug: string;
  body: string;
  collection: string;
  data: {
    title: string;
    page_title: string;
    image: string;
    description?: string;
    meta_title?: string;
    benifits: {
      title: string;
      description: string;
      benifit_list: {
        title: string;
        content: string;
        color: string;
        icon: string;
      }[];
    };
    sidebar_content: {
      title: string;
      content: string;
      button: {
        label: string;
        link: string;
        enable: boolean;
      };
      enable: boolean;
    };
    career: {
      title: string;
      subtitle: string;
    };
  };
  render: () => Promise<void>;
};

export type TIntegrationsIndex = {
  id: string;
  slug: string;
  body: string;
  collection: string;
  data: {
    title: string;
    page_title: string;
    meta_title?: string;
    description?: string;
    image?: string;
  };
  render: () => Promise<void>;
};
