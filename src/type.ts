export type SongList = Record<string, Song>;

export interface Song {
  idx: number;
  id: string;
  title_localized: Titlelocalized;
  artist: string;
  search_title?: Searchtitle;
  search_artist: Searchtitle;
  bpm: string;
  bpm_base: number;
  set: string;
  purchase: string;
  audioPreview: number;
  audioPreviewEnd: number;
  side: number;
  bg: string;
  bg_inverse?: string;
  date: number;
  version: string;
  difficulties: Difficulty[];
  world_unlock?: boolean;
  remote_dl?: boolean;
  source_localized?: Sourcelocalized;
  source_copyright?: string;
  no_stream?: boolean;
  jacket_localized?: Jacketlocalized;
  bg_daynight?: Bgdaynight;
  byd_local_unlock?: boolean;
  additional_files?: Additionalfile[];
  songlist_hidden?: boolean;
}

export interface Additionalfile {
  file_name: string;
  requirement: string;
}

export interface Bgdaynight {
  day: string;
  night: string;
}

export interface Jacketlocalized {
  ja: boolean;
}

export interface Sourcelocalized {
  en: string;
  ja?: string;
}

export interface Difficulty {
  ratingClass: number;
  chartDesigner: string;
  jacketDesigner: string;
  rating: number;
  jacketOverride?: boolean;
  ratingPlus?: boolean;
  date?: number;
  version?: string;
  hidden_until?: string;
  title_localized?: TitlelocalizedOverwrite;
  audioOverride?: boolean;
  bg?: string;
  plusFingers?: boolean;
  artist?: string;
  bg_inverse?: string;
  bpm?: string;
  bpm_base?: number;
  jacket_night?: string;
  hidden_until_unlocked?: boolean;
  world_unlock?: boolean;
}

export interface TitlelocalizedOverwrite {
  en: string;
}

export interface Searchtitle {
  ja?: string[];
  ko: string[];
  en?: string[];
}

export interface Titlelocalized {
  en: string;
  ko?: string;
  "zh-Hant"?: string;
  "zh-Hans"?: string;
  ja?: string;
  kr?: string;
}

export type PackList = Record<string, Pack>;

export interface Pack {
  id: string;
  section: string;
  is_extend_pack?: boolean;
  is_active_extend_pack?: boolean;
  custom_banner?: boolean;
  small_pack_image?: boolean;
  plus_character: number;
  name_localized: Namelocalized;
  description_localized: Descriptionlocalized;
  cutout_pack_image?: boolean;
  pack_parent?: string;
}

interface Descriptionlocalized {
  en: string;
  ja: string;
  ko?: string;
  "zh-Hant"?: string;
  "zh-Hans"?: string;
}

interface Namelocalized {
  en: string;
}
