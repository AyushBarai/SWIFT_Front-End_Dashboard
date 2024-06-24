import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { SelectedPage } from '../shared/types';

type Props = {
    page: SelectedPage;
    selectedPage: SelectedPage;
    setSelectedPage: (value: SelectedPage) => void;
};

const Link: React.FC<Props> = ({ page, selectedPage, setSelectedPage }) => {
    return (
        <RouterLink
            to={page === SelectedPage.Dashboard ? '/' : `/${page.toLowerCase()}`}
            className={`hover:text-primary-300 ${selectedPage === page ? 'text-primary-500' : ''}`}
            onClick={() => setSelectedPage(page)}
        >
            {page.charAt(0).toUpperCase() + page.slice(1)}
        </RouterLink>
    );
};

export default Link;
