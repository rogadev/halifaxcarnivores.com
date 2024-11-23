import { writable } from 'svelte/store';

type ToastType = 'success' | 'error' | 'info';

interface ToastMessage {
  type: ToastType;
  message: string;
  id: number;
}

function createToastStore() {
  const { subscribe, update } = writable<ToastMessage[]>([]);

  let nextId = 0;

  function show(type: ToastType, message: string) {
    const id = nextId++;

    update(toasts => {
      const newToasts = [...toasts, { type, message, id }];

      // Auto-remove after 3 seconds
      setTimeout(() => {
        dismiss(id);
      }, 3000);

      return newToasts;
    });
  }

  function dismiss(id: number) {
    update(toasts => toasts.filter(t => t.id !== id));
  }

  return {
    subscribe,
    success: (message: string) => show('success', message),
    error: (message: string) => show('error', message),
    info: (message: string) => show('info', message),
    dismiss
  };
}

export const toast = createToastStore(); 
