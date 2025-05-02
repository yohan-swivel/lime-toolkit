import axios from "axios";
import { CONFLUENCE_CONFIG } from "./conflig";

const BASE_URL = `https://${CONFLUENCE_CONFIG.DOMAIN}`;

export type PAGE_META = {
  spaceId: string;
  title: string;
  body: {
    representation: "storage" | "editor" | "view";
    value: string;
  };
};

export const getConfluencePage = (pageId: number) =>
  axios.get(`${BASE_URL}/wiki/rest/api/content/${pageId}?expand=body.storage`, {
    auth: {
      username: CONFLUENCE_CONFIG.EMAIL,
      password: CONFLUENCE_CONFIG.API_TOKEN,
    },
    headers: {
      Accept: "application/json",
    },
  });

export const createDraftedConfluncePage = (draftData: PAGE_META) =>
  axios.post(`${BASE_URL}/wiki/api/v2/drafts`, draftData, {
    auth: {
      username: CONFLUENCE_CONFIG.EMAIL,
      password: CONFLUENCE_CONFIG.API_TOKEN,
    },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
