// Bedriftsligaen API Types

export type BLImage = {
    id?: number;
    ratio?: number;
    width?: number;
    height?: number;
    credits?: string | null;
    mimetype?: string;
    video_id?: number | null;
    credit_url?: string | null;
    url: string;
    relative_url?: string;
    aspect_string?: string;
};

export type BLClub = {
    id: number;
    name: string;
};

export type BLLogo = {
    url: string;
};

export type BLTeam = {
    name: string;
    logo: BLLogo;
    club: BLClub;
};

export type BLSignup = {
    name: string;
    display_name: string;
    team: BLTeam;
};

export type BLMatchupable = {
    id: number;
    name: string;
};

export type BLResource = {
    id?: number;
    game_id?: number;
    name: string;
    type?: string;
    description?: string | null;
    image_id?: number;
    remote_id: string;
    preset?: any | null;
    sort_order?: number | null;
    active?: boolean;
    deleted_at?: string | null;
    created_at?: string;
    updated_at?: string;
    image: BLImage;
};

export type BLSide = {
    id?: number;
    game_id?: number;
    name: string;
    type: string;
    description?: string | null;
    image_id?: number;
    remote_id: string;
    preset?: any | null;
    sort_order?: number | null;
    active?: boolean;
    deleted_at?: string | null;
    created_at?: string;
    updated_at?: string;
    image: BLImage;
};

export type BLMatchupMap = {
    map_number: number;
    home_score: number;
    away_score: number;
    resource: BLResource;
    homeside: BLSide;
    awayside: BLSide;
};

export type BLMatch = {
    id: number;
    start_time: string;
    best_of: number;
    home_score: number;
    away_score: number;
    uuid: string;
    round_identifier_text: string;
    round_identifier_text_plural: string;
    url: string;
    matchupable: BLMatchupable;
    home_signup: BLSignup;
    away_signup: BLSignup;
    matchupmaps: BLMatchupMap[];
};
