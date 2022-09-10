import { useCallback, useEffect, useState } from "react";
import { PayloadDownloadFile } from "../common/interfaces/PayloadDownloadFile";
import {
  downloadCSVProducts,
  getCountProducts,
  getLastUpdate,
} from "../services/products";

export default function useProducts() {
  const [countProducts, setCountProducts] = useState(0);
  const [lastUpdate, setLastUpdate] = useState("");
  useEffect(() => {
    getCountProducts().then((res) => {
      setCountProducts(res.data);
    });
    getLastUpdate().then((res) => {
      const date = new Date(res.data.createdAt);
      setLastUpdate(
        new Intl.DateTimeFormat("es-MX", {
          hour: "2-digit",
          minute: "2-digit",
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
          timeZoneName: "longOffset",
        }).format(date)
      );
    });
  }, []);

  const downloadFile = useCallback(
    ({ dateStart, dateEnd }: PayloadDownloadFile) => {
      downloadCSVProducts({ dateStart, dateEnd }).then((res) => {
        const link = document.createElement("a");
        link.href = res.data;
        link.setAttribute("download", "products.csv");
        document.body.appendChild(link)
        link.click();
      });
    },
    []
  );
  return {
    countProducts,
    lastUpdate,
    downloadFile,
  };
}
