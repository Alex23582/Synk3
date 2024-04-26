import { readable } from 'svelte/store';
import { io } from 'socket.io-client';
import type { message } from './types';

import { PUBLIC_SOCKET_URL } from '$env/static/public';
export const socket = io(PUBLIC_SOCKET_URL);

export const roommessage = readable("", (set) => {
    socket.on("room", (msg) => {
        set(msg)
    })
});

let allmessages: message[] = []

export const chatmessage = readable<message[]>(undefined, (set) => {
    socket.on("chat", (msg) => {
        allmessages.push(msg)
        set(allmessages)
    })
});

let servertimecallbacks: Record<number, () => void> = {}

socket.on("ping", (msg) => {
    servertimecallbacks[msg]()
})

export function pingCallback(servertime: number, callback: () => void) {
    servertimecallbacks[servertime] = callback
    socket.emit("ping", servertime)
}