"use client";
import { useState, useEffect } from "react";

import { compareSearch } from "helpers";

export default function useSearch(terms: string[], term: string) {
    const [matchings, setMatchings] = useState<string[]>([]);

    useEffect(() => {
        setMatchings(terms.filter(option => compareSearch(option, term))); // TODO: To improve
    }, [term]);

    return matchings;
}
