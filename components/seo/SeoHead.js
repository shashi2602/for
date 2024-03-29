import { NextSeo } from "next-seo";
import React from "react";
import { SITE_ENDPOINT } from "../../components/utils/constants";
function SeoHead({ data }) {
  return (
    <NextSeo
      title={`${data?.username} | ${data?.expertise}`}
      description={data?.status}
      defaultTitle="Simply"
      additionalLinkTags={[
        {
          rel: "icon",
          href: data?.profile_img,
        },
      ]}
      additionalMetaTags={[
        {
          name: "keywords",
          content: `${data?.skills
            ?.map((k) => {
              return k.name;
            })
            .toString()}`,
        },
      ]}
      canonical={`${SITE_ENDPOINT}/${data?.site_username}`}
      nofollow={true}
      openGraph={{
        url: `${SITE_ENDPOINT}/${data?.site_username}`,
        type: "website",
        title: `${
          data?.seo_settings?.seo_title
            ? data?.seo_settings?.seo_title
            : data?.username + " | " + data?.expertise
        }`,
        description: `${
          data?.seo_settings?.seo_description
            ? data?.seo_settings?.seo_description
            : data?.status
        }`,
        images: [
          {
            url: `${
              data?.seo_settings?.seo_image
                ? data?.seo_settings?.seo_image
                : data?.profile_img
            }`,
            width: 800,
            height: 600,
            alt: `${
              data?.seo_settings?.seo_title
                ? data?.seo_settings?.seo_title
                : data?.username
            }`,
          },
        ],
        site_name: `${SITE_ENDPOINT}/${data?.site_username}`,
      }}
      twitter={{
        cardType: "summary_large_image",
        site: `${SITE_ENDPOINT}/${data?.site_username}`,
        creator: `@${data?.social?.find((n) => n.value == "twitter")?.link}`,
        description: `${
          data?.seo_settings?.seo_description
            ? data?.seo_settings?.seo_description
            : data?.status
        }`,
        handle: `@${data?.social?.find((n) => n.value == "twitter")?.link}`,
        image: `${
          data?.seo_settings?.seo_image
            ? data?.seo_settings?.seo_image
            : data?.profile_img
        }`,
      }}
    />
  );
}

export default SeoHead;
