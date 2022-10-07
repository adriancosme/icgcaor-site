import { useCallback, useEffect, useState } from "react";
import { Page } from "../common/types/page.type";
import { deletePage, getPages, savePage, updatePage } from "../services/pages";

export default function usePages() {
  const [pages, setPages] = useState<Page[]>([]);
  const [hasError, setHasError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const showError = () => setHasError(true);
  const setText = (message: string) => setErrorText(message);

  const closeError = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setHasError(false);
    setErrorText("");
  };

  useEffect(() => {
    getPages().then(({ data }) => {
      setPages(data);
    });
  }, []);

  const addPage = useCallback(async ({ url, name, provider }: Page) => {
    try {
      const pageUrl = new URL(url);
      const payload = { name, url: pageUrl.toString(), provider };
      const { data } = await savePage(payload);
      setPages((prevArr) => {
        return [...prevArr, data];
      });
    } catch (error: any) {
      const isArray = Array.isArray(error);
      if (isArray) {
        setErrorText(error.join(","));
        showError();
        return;
      }
      setErrorText(error.message);
      showError();
      console.error(error);
    }
  }, []);

  const editPage = useCallback(async ({ _id, url, name, provider }: Page) => {
    try {
      const pageUrl = new URL(url);
      const payload = { _id, name, url: pageUrl.toString(), provider };
      const { data } = await updatePage(payload);
      if (!data) {
        return;
      }      
      setPages((prev) => {
        const newPages = [...prev];        
        const indexPage = newPages.findIndex(value => value._id === data._id);
        newPages[indexPage] = data;
        return newPages;
      })
    } catch (error: any) {
      const isArray = Array.isArray(error);
      if (isArray) {
        setErrorText(error.join(","));
        showError();
        return;
      }
      setErrorText(error.message);
      showError();
      console.error(error);
    }
  }, []);

  const removePage = useCallback(async (id: string) => {
    const { data } = await deletePage(id);
    if (!data) {
      return;
    }
    setPages((prev) => prev.filter((page) => page._id !== id));
  }, []);
  return {
    pages,
    setPages,
    addPage,
    editPage,
    hasError,
    errorText,
    showError,
    setText,
    closeError,
    removePage
  };
}
