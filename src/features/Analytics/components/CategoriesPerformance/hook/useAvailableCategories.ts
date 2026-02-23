'use client';

import { AvailableCategory } from "@/src/core/entitis/madre/analitics/AvailableCategory";
import { useEffect, useState } from "react";
import { getAvailableCategoriesAction } from "./actions/getAvailableCategories";

export function useAvailableCategories() {
  const [categories, setCategories] = useState<AvailableCategory[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await getAvailableCategoriesAction();
        setCategories(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { categories, loading };
}