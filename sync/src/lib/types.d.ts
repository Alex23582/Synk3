interface ProviderPlayer {
    loadVideoById: (videoId: string) => void; // YOUTUBE ONLY
    getDuration: () => number;
    getProgress: () => number;
    stateChange: ((state: number) => void) | null;
    pause: () => void;
    play: () => void;
    seek: (seconds: number) => void;
    paused: () => boolean,
    changeSource: (link: string) => void;
}

type member = {
    id: number;
    name: string;
    admin: boolean;
}

type message = {
    author: string;
    message: string;
    system: boolean | undefined;
}

export { ProviderPlayer, member, message, movie, movieversion, anime, animeseason, animeepisode }