"use client";
import { useState, useEffect } from "react";

import { compareSearch } from "helpers";

interface useSearchProps {
    terms: string[];
    term: string;
}

export default function useSearch({ terms, term }: useSearchProps) {
    const [matchings, setMatchings] = useState<string[]>([]);

    useEffect(() => {
        setMatchings(terms.filter(option => compareSearch(option, term))); // TODO: To improve
    }, [term]);

    return matchings;
}
