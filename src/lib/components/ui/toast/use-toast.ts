import { writable } from 'svelte/store';

type Toast = {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
};

const toasts = writable<Toast[]>([]);

export function toast({ title, description, variant = 'default' }: Omit<Toast, 'id'>) {
  const id = Math.random().toString(36).substring(2, 9);
  
  toasts.update((all) => [{ id, title, description, variant }, ...all]);
  
  setTimeout(() => {
    toasts.update((all) => all.filter((t) => t.id !== id));
  }, 3000);
}

export { toasts }; 