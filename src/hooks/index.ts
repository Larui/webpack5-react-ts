import { useState, useEffect } from "react";
import Services from "../services";
import { PageDetailType } from "../types";

export function usePageInfo() {
  const [pageDetail, setPageDetail] = useState<PageDetailType>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Services.getPageDetail().then((res) => {
      res.isEnd = new Date() > new Date(res.endDate);
      res.canSign = res.status === "P" && new Date(res.startDate) > new Date();
      res.pattern = res.pattern === "其他" ? "活动" : res.pattern;
      setLoading(false);
      setPageDetail(res);
    });
  }, []);

  return { pageDetail, loading };
}
