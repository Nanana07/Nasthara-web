
'use client';
import { useState, useEffect, useCallback } from 'react';

const RECENTLY_VIEWED_KEY = 'nasthara_recently_viewed';
const MAX_RECENTLY_VIEWED = 4;

interface ViewedProduct {
    name: string;
    timestamp: number;
}

export const useRecentlyViewed = () => {
    const [viewedProducts, setViewedProducts] = useState<ViewedProduct[]>([]);

    useEffect(() => {
        try {
            const storedItems = localStorage.getItem(RECENTLY_VIEWED_KEY);
            if (storedItems) {
                setViewedProducts(JSON.parse(storedItems));
            }
        } catch (error) {
            console.error("Failed to parse recently viewed items from localStorage", error);
        }
    }, []);

    const addViewedProduct = useCallback((productName: string) => {
        setViewedProducts(prevItems => {
            const newProduct: ViewedProduct = { name: productName, timestamp: Date.now() };

            const filteredItems = prevItems.filter(item => item.name !== productName);
            const updatedItems = [newProduct, ...filteredItems].slice(0, MAX_RECENTLY_VIEWED);
            
            try {
                localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updatedItems));
            } catch (error) {
                console.error("Failed to save recently viewed items to localStorage", error);
            }

            return updatedItems;
        });
    }, []);

    const clearViewedProducts = useCallback(() => {
        setViewedProducts([]);
        try {
            localStorage.removeItem(RECENTLY_VIEWED_KEY);
        } catch (error) {
            console.error("Failed to clear recently viewed items from localStorage", error);
        }
    }, []);

    return { viewedProducts, addViewedProduct, clearViewedProducts };
};
