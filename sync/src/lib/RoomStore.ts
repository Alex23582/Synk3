import { writable } from 'svelte/store';
export const username = writable("");
export const requestUsername = writable(false)
export const initialRoomId = writable("")