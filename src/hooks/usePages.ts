import { ok } from "assert";
import { useCallback, useEffect, useState } from "react";
import { Page } from "../common/types/page.type";
import { deletePage, getPages, savePage, updatePage } from "../services/pages";
import useFetch from "./useFetch";

export default function usePages() {
  const fetch = useFetch();
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
    // @ts-ignore
    fetch('/pages', { headers: { "Content-Type": "application/json" } }).then(({ response, data }) => {
      if (!response.ok) {
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      }
      setPages(data.data);
    })
  }, []);

  const addPage = useCallback(async ({ url, name, provider }: Page) => {
    try {
      const pageUrl = new URL(url);
      const payload = { name, url: pageUrl.toString(), provider };
      const res = await fetch('/pages', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
      if (!res) {
        return;
      }
      if (!res.response.ok) {
        const error = (res.data && res.data.message) || res.response.status;
        throw error;
      }
      setPages((prevArr) => {
        return [...prevArr, res.data.data];
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
      const res = await fetch(`/pages/${payload._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
      if (!res) {
        return;
      }
      if (!res.response.ok) {
        const error = (res.data && res.data.message) || res.response.status;
        throw error;
      }
      setPages((prev) => {
        const newPages = [...prev];
        const indexPage = newPages.findIndex(value => value._id === res.data.data._id);
        newPages[indexPage] = res.data.data;
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
    const res = await fetch(`/pages/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    // const { data } = await deletePage(id);
    if (!res) {
      return;
    }
    if (!res.response.ok) {
      const error = (res.data && res.data.message) || res.response.status;
      throw error;
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
