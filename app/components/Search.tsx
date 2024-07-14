import React, { useState, useEffect, useCallback } from "react";
import { Form, useNavigate, useSearchParams } from "@remix-run/react";
import { Search } from "lucide-react";
import debounce from "lodash.debounce";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  page: string;
}

interface GroupedResult {
  page: string;
  items: SearchResult[];
}

const allResults: SearchResult[] = [
  {
    id: "1",
    title: "CI/CD Integration",
    description:
      "A free text field where you can specify general instructions that apply to the entire test suite. Use this space to request specific styling, documentation inclusion, or any other overarching guidelines you'd like Codiumate to follow during test generation.",
    page: "Configuration",
  },
  {
    id: "2",
    title: "Pipeline Configuration",
    description:
      "Effective test generation in Codiumate relies heavily on understanding the context of your project. When initiating test generation, Codiumate meticulously collects context based on your code's dependencies and interactions. This rich context is crucial for generating accurate and meaningful tests that closely align with your project's specific requirements.",
    page: "Configuration",
  },
  {
    id: "3",
    title: "Automated Deployments",
    description: "Use Codiumate in your automated deployment process",
    page: "Deployment",
  },
];

interface ISearchComponent {
  readonly show: boolean;
}
export default function SearchComponent({ show }: ISearchComponent) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [groupedResults, setGroupedResults] = useState<GroupedResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const filterAndGroupResults = useCallback((searchQuery: string) => {
    if (!searchQuery) {
      setGroupedResults([]);
      setShowResults(false);
      return;
    }

    const filteredResults = allResults.filter(
      (result) =>
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const grouped = filteredResults.reduce((acc, result) => {
      const existingGroup = acc.find((group) => group.page === result.page);
      if (existingGroup) {
        existingGroup.items.push(result);
      } else {
        acc.push({ page: result.page, items: [result] });
      }
      return acc;
    }, [] as GroupedResult[]);

    setGroupedResults(grouped);
    setShowResults(true);
  }, []);

  const debouncedFilter = useCallback(debounce(filterAndGroupResults, 300), [filterAndGroupResults]);

  useEffect(() => {
    debouncedFilter(query);
    if (!show) {
      setQuery("");
      setGroupedResults([]);
      setShowResults(false);
    }
  }, [query, debouncedFilter, navigate, show]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="search-container">
      <Form method="get" className="search-form">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="search"
            name="q"
            className="search-input"
            placeholder="Search..."
            value={query}
            onChange={handleInputChange}
            aria-label="Search"
          />
        </div>
      </Form>
      {showResults && (
        <div className="search-results">
          {groupedResults.map((group, index) => (
            <div key={index + Math.max(Math.random())} className="search-result-group">
              {group.items.map((result, itemIndex) => (
                <div key={result.id} className="search-result-item">
                  <h5>{result.title}</h5>
                  {itemIndex === 0 && group.items.length > 1 && (
                    <div className="subtitle">{group.items.length - 1} more on this page</div>
                  )}
                  <p>{result.description}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
