import React from 'react';

export const SearchContext = React.createContext({
    filterValue: '',
    search: '',
    setFilterValue: (_: string) => {},
    setSearch: (_: string) => {},
});