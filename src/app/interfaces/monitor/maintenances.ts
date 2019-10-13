export interface Maintenances {
    id: string;
    start: number;
    end: number;
    ongoing: boolean;
    title: string;
    description: string;
    ignoreOutages: boolean;
    components?: string;
    monitors: Array<Monitor>;
    comments: Array<Comment>;
}

interface Comment {
    id: string;
    userId: string;
    name: string;
    comment: string;
    showOnStatusPage: boolean;
    posted: number;
}

interface Monitor {
    id: string;
}
