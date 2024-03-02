'use client'
import { useState } from 'react';
import { SearchResults } from './SearchResults';
import { Button } from './ui/button';

export function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searching, setSearching] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(searchTerm);
        if (searchTerm.length > 0) {
            setSearching(true);
        }
    };

    return (
        <>
            <form className="flex items-center gap-2" onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    className="px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button type="submit"> Search </Button>
            </form>
            {searching && searchTerm && <SearchResults searchTerm={searchTerm} />}
        </>
    );
};