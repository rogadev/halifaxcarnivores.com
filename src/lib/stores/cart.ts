import { writable, derived, get } from 'svelte/store';
import { type Plant, type Soil, type Terrarium } from '@prisma/client';
import type { CartItemType } from '$lib/types';

// Extend CartItemType to include type
interface EnhancedCartItemType extends CartItemType {
  type: 'plant' | 'soil' | 'terrarium';
}

interface CartState {
  items: EnhancedCartItemType[];
  lastOrderId: string | undefined;
}

// Initialize store with default state
const createCart = () => {
  // Load initial state from localStorage
  const defaultState: CartState = {
    items: [],
    lastOrderId: undefined
  };

  if (typeof localStorage !== 'undefined') {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsed = JSON.parse(storedCart);
      defaultState.items = parsed.items;
      defaultState.lastOrderId = parsed.lastOrderId;
    }
  }

  const { subscribe, set, update } = writable<CartState>(defaultState);

  // Save to localStorage when cart changes
  subscribe(state => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(state));
    }
  });

  return {
    subscribe,
    addItem: (itemToAdd: Plant | Soil | Terrarium, type: 'plant' | 'soil' | 'terrarium', quantity: number = 1) => {
      update(state => {
        const existingItem = state.items.find(
          cartItem => cartItem.item.id === itemToAdd.id && cartItem.orderStatus !== 'ordered'
        );

        if (existingItem) {
          existingItem.quantity += quantity;
          return state;
        } else {
          const cartItem: EnhancedCartItemType = {
            id: itemToAdd.id,
            item: itemToAdd,
            quantity,
            type,
            orderStatus: 'pending',
            orderId: undefined
          };
          return { ...state, items: [...state.items, cartItem] };
        }
      });
    },

    updateQuantity: (id: number, quantity: number) => {
      update(state => {
        const items = state.items.map(item => {
          if (item.id === id && item.orderStatus !== 'ordered') {
            return { ...item, quantity };
          }
          return item;
        });
        return { ...state, items };
      });
    },

    removeItem: (id: number) => {
      update(state => ({
        ...state,
        items: state.items.filter(
          cartItem => !(cartItem.id === id && cartItem.orderStatus !== 'ordered')
        )
      }));
    },

    markAsOrdered: (orderId: number) => {
      update(state => {
        const items = state.items.map(item => {
          if (item.orderStatus === 'pending') {
            return { ...item, orderStatus: 'ordered', orderId };
          }
          return item;
        });
        return { ...state, items, lastOrderId: orderId };
      });
    },

    clearOrdered: () => {
      update(state => ({
        ...state,
        items: state.items.filter(cartItem => cartItem.orderStatus !== 'ordered'),
        lastOrderId: undefined
      }));
    }
  };
};

export const cart = createCart();

// Export readonly derived store for cart state
export const cartState = derived(cart, $cart => ({
  items: $cart.items,
  lastOrderId: $cart.lastOrderId
})); 
