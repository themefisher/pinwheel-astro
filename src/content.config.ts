import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

// Homepage Collection Schema
const homepageCollection = defineCollection({
  loader: glob({ pattern: "**/-*.{md,mdx}", base: "src/content/homepage" }),
  schema: z.object({
    banner: z.object({
      title: z.string(),
      content: z.string().optional(),
      image: z.string(),
      button: z
        .object({
          label: z.string(),
          link: z.string(),
          enable: z.boolean().default(true),
        })
        .optional(),
    }),
    key_features: z.object({
      title: z.string(),
      description: z.string(),
      feature_list: z
        .array(
          z.object({
            icon: z.string(),
            title: z.string(),
            content: z.string(),
          }),
        )
        .optional(),
    }),

    service: z.object({
      homepage_tab: z.object({
        title: z.string(),
        description: z.string(),
        tab_list: z
          .array(
            z.object({
              title: z.string(),
              icon: z.string(),
              image: z.string(),
            }),
          )
          .optional(),
      }),

      our_service: z.array(
        z.object({
          title: z.string(),
          description: z.string().optional(),
          image: z.string().optional(),
          list: z.array(z.string()).optional(),
          video: z
            .object({
              thumbnail: z.string(),
              video_id: z.string(),
            })
            .optional(),
          button: z
            .object({
              label: z.string(),
              link: z.string(),
              enable: z.boolean().default(true),
            })
            .optional(),
        }),
      ),
    }),
    testimonial: z.object({
      title: z.string(),
      description: z.string(),
      testimonial_list: z
        .array(
          z.object({
            author: z.string(),
            avatar: z.string(),
            organization: z.string(),
            rating: z.enum(["one", "two", "three", "four", "five"]),
            content: z.string(),
          }),
        )
        .optional(),
    }),
  }),
});

// About Collection Schema
const aboutCollection = defineCollection({
  loader: glob({ pattern: "**/-*.{md,mdx}", base: "src/content/about" }),
  schema: z.object({
    title: z.string(),
    page_title: z.string(),
    description: z.string().optional(),
    meta_title: z.string().optional(),
    image: z.string().optional(),
    buttons: z.array(
      z.object({
        label: z.string(),
        link: z.string(),
        outline: z.boolean().optional(),
        enable: z.boolean().default(true),
      }),
    ),

    // Counter
    counter: z.array(
      z.object({
        name: z.string(),
        number: z.union([z.number(), z.string()]), // Support both numeric and string types (e.g., 'M', 'K')
        measurement: z.string(),
        color: z.string(),
      }),
    ),

    // Gallery
    gallery: z.object({
      title: z.string(),
      images: z.array(z.string()),
    }),

    // Our Work
    features: z.object({
      title: z.string(),
      button: z.object({
        label: z.string(),
        link: z.string(),
        enable: z.boolean().default(true),
      }),
      features_list: z.array(
        z.object({
          title: z.string(),
          content: z.string(),
        }),
      ),
    }),

    // Team Members
    members: z.object({
      title: z.string(),
      description: z.string(),
      member_list: z.array(
        z.object({
          name: z.string(),
          field: z.string(),
          image: z.string(),
        }),
      ),
    }),
  }),
});

// Blog collection schema
const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/blog" }),
  schema: z.object({
    title: z.string(),
    page_title: z.string().optional(),
    subtitle: z.string().optional(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    date: z.date().optional(),
    image: z.string().optional(),
    author: z.string().optional(),
    categories: z.array(z.string()).default(["others"]),
    draft: z.boolean().optional(),
    featured: z.boolean().optional(),
  }),
});

// Features collections schema
const featuresCollection = defineCollection({
  loader: glob({ pattern: "**/-*.{md,mdx}", base: "src/content/features" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    banner: z.object({
      title: z.string(),
      content: z.string(),
      image: z.string(),
      button: z
        .object({
          label: z.string(),
          link: z.string(),
          enable: z.boolean().default(true),
        })
        .optional(),
    }),

    // Project Management Section
    project_management: z.object({
      title: z.string(),
      content: z.string(),
      management: z.object({
        title: z.string(),
        projects: z
          .array(
            z.object({
              title: z.string(),
              content: z.string(),
              icon: z.string(),
            }),
          )
          .optional(),
      }),

      // Feature Service Section
      feature_service: z.object({
        title: z.string(),
        description: z.string(),
        image: z.string(),
        list: z.array(z.string()).optional(),
        buttons: z.array(
          z.object({
            label: z.string(),
            link: z.string(),
            enable: z.boolean().default(true),
            outline: z.boolean().optional(),
          }),
        ),
      }),

      // Feature Tab Section
      feature_tab: z.object({
        title: z.string(),
        list: z
          .array(
            z.object({
              title: z.string(),
              content: z.string(),
              image: z.string(),
            }),
          )
          .optional(),
      }),
    }),
  }),
});

// How It Works Collection Schema
const howItWorksCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    page_title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),

    // Performance Section
    performance: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        image: z.string(),
      }),
    ),

    // Our Works Section
    our_works: z.array(
      z.object({
        title: z.string(),
        image: z.string(),
        list: z.array(z.string()).optional(),
      }),
    ),
  }),
});

// Contact collection schema
const contactCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    page_title: z.string(),
    image: z.string().optional(),
  }),
});

// Careers collection schema
const careersCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/careers" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    page_title: z.string().optional(),
    image: z.string().optional(),
    benefits: z
      .object({
        title: z.string(),
        description: z.string(),
        benefit_list: z.array(
          z
            .object({
              title: z.string(),
              content: z.string(),
              color: z.string(),
              icon: z.string(),
            })
            .optional(),
        ),
      })
      .optional(),
    sidebar_content: z
      .object({
        title: z.string(),
        content: z.string(),
        button: z.object({
          label: z.string(),
          link: z.string(),
          enable: z.boolean().default(true),
        }),
        enable: z.boolean().default(true),
      })
      .optional(),
    career: z
      .object({
        title: z.string(),
        subtitle: z.string(),
      })
      .optional(),
    excerpt: z.string().optional(),
    job_nature: z.string().optional(),
    location: z.string().optional(),
    categories: z.array(z.string()).default(["developer"]),
    date: z.date().optional(),
    draft: z.boolean().default(false),
  }),
});

const integrationsCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/integrations" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    page_title: z.string().optional(),
    name: z.string().optional(),
    excerpt: z.string().optional(),
    image: z.string().optional(),
    categories: z.array(z.string()).default(["social media"]).optional(),
    button: z
      .object({
        label: z.string(),
        link: z.string(),
      })
      .optional(),
    draft: z.boolean().default(false).optional(),
  }),
});

const pricingCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    page_title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    pricing_card: z.array(
      z.object({
        title: z.string(),
        pre_currency: z.string(),
        post_currency: z.string(),
        price: z.number(),
        icon: z.string(),
        description: z.string(),
        featured: z.boolean().default(false),
        buttons: z.object({
          buy_now: z.object({
            label: z.string(),
            link: z.string(),
          }),
          free_trial: z.object({
            label: z.string(),
            link: z.string(),
          }),
        }),
        services: z.object({
          title: z.string(),
          list: z.array(z.string()),
        }),
      }),
    ),
    faq: z.object({
      title: z.string(),
      description: z.string(),
      faq_list: z.array(
        z.object({
          title: z.string(),
          content: z.string(),
        }),
      ),
    }),
  }),
});

// Pages collection schema
const pagesCollection = defineCollection({
  schema: z.object({
    id: z.string().optional(),
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    layout: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

// Export collections
export const collections = {
  homepage: homepageCollection,
  about: aboutCollection,
  blog: blogCollection,
  features: featuresCollection,
  "how-it-works": howItWorksCollection,
  contact: contactCollection,
  careers: careersCollection,
  integrations: integrationsCollection,
  pricing: pricingCollection,
  pages: pagesCollection,
};
