import { writable } from 'svelte/store';
import type { anime } from './types';

export const active = writable(false);
export const selectedAnime = writable<anime>();
export const animeName = writable<string>();
export const animeLinkName = writable<string>();