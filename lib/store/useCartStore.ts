import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, Product } from '@/types/database';

interface CartState {
    items: CartItem[];
    isOpen: boolean;
    total: number;

    // Actions
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    setCartOpen: (open: boolean) => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,
            total: 0,

            addItem: (product: Product) => {
                const { items } = get();
                const existingItem = items.find((item) => item.id === product.id);

                if (existingItem) {
                    // Check stock limit (optimistic)
                    if (existingItem.quantity >= product.stock_count) {
                        // In a real app, we might trigger a toast notification here
                        return;
                    }

                    set({
                        items: items.map((item) =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                    });
                } else {
                    set({ items: [...items, { ...product, quantity: 1 }] });
                }

                // Recalculate total
                const newItems = get().items;
                set({ total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0) });
            },

            removeItem: (productId: string) => {
                set((state) => ({
                    items: state.items.filter((item) => item.id !== productId),
                }));
                // Recalculate total
                const newItems = get().items;
                set({ total: newItems.reduce((sum, item) => sum + item.price * item.quantity, 0) });
            },

            updateQuantity: (productId: string, quantity: number) => {
                const { items } = get();
                if (quantity <= 0) {
                    get().removeItem(productId);
                    return;
                }

                const item = items.find((i) => i.id === productId);
                if (item && quantity > item.stock_count) {
                    // Limit to stock
                    return;
                }

                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === productId ? { ...item, quantity } : item
                    ),
                }));

                // Recalculate total
                const newItems = get().items;
                set({ total: newItems.reduce((sum, i) => sum + i.price * i.quantity, 0) });
            },

            clearCart: () => set({ items: [], total: 0 }),

            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
            setCartOpen: (open: boolean) => set({ isOpen: open }),
        }),
        {
            name: 'luxe-cart-storage', // unique name for localStorage
            storage: createJSONStorage(() => localStorage),
            skipHydration: true, // we handle hydration in component if needed to avoid mismatches
        }
    )
);
