import { useCallback, useEffect, useState } from "react";
import { Page } from "../common/types/page.type";
import { getPages, savePage } from "../services/pages";

export default function usePages() {
  const [pages, setPages] = useState<Page[]>([]);

  useEffect(() => {
    getPages().then(({ data }) => {
      setPages(data);
    });
  }, []);

  const addPage = useCallback(async ({ url, name }: Page) => {
    const pageUrl = new URL(url);
    pageUrl.searchParams.set("wpxp", "25");
    pageUrl.searchParams.set("page", "1");
    const payload = { name: name, url: pageUrl.toString() };
    const { data } = await savePage(payload);
    setPages((prevArr) => {
      return [...prevArr, data];
    });
  }, []);
  return {
    pages,
    setPages,
    addPage,
  };
}
