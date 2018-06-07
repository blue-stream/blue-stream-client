export type SideNavMode = 'over' | 'push' | 'side';

interface RouteConfig {
    sideNavMode: SideNavMode;
    isNavDefaultlyOpen: boolean;
}

export interface RouteSpecificConfig {
    [route: string]: RouteConfig;
}

export const routeConfig: RouteSpecificConfig = {
    '/watch': {
        sideNavMode: 'over',
        isNavDefaultlyOpen: false
    },
    '': {
        sideNavMode: 'side',
        isNavDefaultlyOpen: true
    }
};

export const defaultRouteConfig: RouteConfig = {
    sideNavMode: 'side',
    isNavDefaultlyOpen: true
};
