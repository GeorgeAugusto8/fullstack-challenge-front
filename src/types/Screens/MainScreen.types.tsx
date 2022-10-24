export interface Props {
    content: Array<Content>,
    icon: string,
    url?: string
}

export interface Content {
    type: string,
    title: string,
    properties: any
}