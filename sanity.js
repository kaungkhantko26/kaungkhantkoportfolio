import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const hasSanityConfig = Boolean(process.env.NEXT_PUBLIC_PROJECT_ID);
export const hasSanityWriteConfig = Boolean(
  process.env.NEXT_PUBLIC_PROJECT_ID && process.env.API_TOKEN
);

const config = {
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    dataset: "production",
    apiVersion: "2022-09-05",
    useCdn: true
  }

function getReadClient() {
  if (!hasSanityConfig) {
    return null;
  }

  return createClient(config);
}

const client = {
  fetch(query, params) {
    const readClient = getReadClient();
    if (!readClient) {
      return Promise.resolve(null);
    }

    return readClient.fetch(query, params);
  }
};

export function urlFor(source) {
    const readClient = getReadClient();
    if (!readClient || !source) {
      return null;
    }

    return imageUrlBuilder(readClient).image(source)
}

export default client;

export const writeClient = {
  create(doc) {
    if (!hasSanityWriteConfig) {
      return Promise.reject(new Error("Sanity is not configured"));
    }

    return createClient({
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      dataset: "production",
      apiVersion: "2022-09-05",
      token: process.env.API_TOKEN,
      useCdn: true
    }).create(doc);
  }
};
