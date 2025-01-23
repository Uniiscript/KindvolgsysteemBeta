export interface LandingPageConfig {
  mainNav: MainNavItem[]
}

export interface NavItem {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem

export interface SiteConfig {
    name: string
    description: string
    authors: {
        name: string
        url: string
    }[]
    creator: string
    url: string
    ogImage: string
    links: {
        twitter: string
        instagram: string
        github: string
    }
}
