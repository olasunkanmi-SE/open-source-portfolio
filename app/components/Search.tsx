import React, { useState, useEffect, useCallback } from "react";
import { Form, useNavigate, useSearchParams } from "@remix-run/react";
import { Search, X } from "lucide-react";
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

// This would typically come from your backend or a larger dataset
const allResults: SearchResult[] = [
  {
    id: "1",
    title: "CI/CD Integration",
    description: "Integrate Codiumate with your CI/CD pipeline",
    page: "Configuration",
  },
  {
    id: "2",
    title: "Pipeline Configuration",
    description: "Set up your CI/CD pipeline with Codiumate",
    page: "Configuration",
  },
  {
    id: "3",
    title: "Automated Deployments",
    description: "Use Codiumate in your automated deployment process",
    page: "Deployment",
  },
  // Add more items as needed
];

export default function SearchComponent() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [groupedResults, setGroupedResults] = useState<GroupedResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const filterAndGroupResults = useCallback(
    (searchQuery: string) => {
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
      //Pass the mutation value here in the future, read on useCallBack, I think we should use some other hooks if we are actually making api calls
    },
    []
    // [allResults]
  );

  // Debounce the filter function to avoid excessive filtering on every keystroke
  const debouncedFilter = useCallback(debounce(filterAndGroupResults, 300), [filterAndGroupResults]);

  useEffect(() => {
    debouncedFilter(query);
    // Update the URL with the current query
    navigate(`?q=${encodeURIComponent(query)}`, { replace: true });
  }, [query, debouncedFilter, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const clearSearch = () => {
    setQuery("");
    setGroupedResults([]);
    setShowResults(false);
    navigate("/");
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
          {query && (
            <button type="button" className="clear-button" onClick={clearSearch}>
              <X size={18} />
            </button>
          )}
        </div>
      </Form>
      {showResults && (
        <div className="search-results">
          {groupedResults.map((group, index) => (
            <div key={index} className="search-result-group">
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
      <style>{`
        .search-container {
          position: relative;
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          color:#000
        }
        .search-form {
          margin-bottom: 0;
        }
        .search-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .search-icon {
          position: absolute;
          left: 10px;
          color: #888;
        }
        .search-input {
          width: 100%;
          padding: 10px 10px 10px 40px;
          border: var(--bs-border-width) solid var(--bs-border-color);
          border-radius: var(--bs-border-radius);
          background-color: transparent;
          color: #000;
          font-size: 16px;
        }
        .search-input::placeholder {
          color: #888;
        }
        .search-input:focus {
          outline: none;
        }
        .clear-button {
          background: none;
          border: none;
          color: #888;
          cursor: pointer;
          padding: 0 10px;
        }
        .search-results {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background-color: transparent;
          z-index: 1000;
          max-height: 400px;
          overflow-y: auto;
          margin-top: 5px;
          border: var(--bs-border-width) solid var(--bs-border-color);
          border-radius: var(--bs-border-radius);
          box-shadow: 0 1px 2px 0 rgba(0,0,0,.1)
        }
        .search-result-group {
          margin-bottom: 10px;
          margin-left: 10px;
        }
        .search-result-item {
          padding: 5px 0;
        }
        .search-result-item h5 {
          margin: 0;
          color: #7476f8;
          font-size: 16px;
        }
        .search-result-item .subtitle {
          color: #888;
          font-size: 14px;
          margin-top: 2px;
        }
        .search-result-item p {
          margin: 5px 0 0;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}
