export interface MetaPagination {
	page: number
	pageCount: number
	pageSize: number
	total: number
}
export interface Events {
	id: number
	attributes: EventsAttributes
}

export interface EventsAttributes {
	name: string
	slug: string
	venue: string
	address: string
	date: Date
	time: Date
	performers: string
	description: string
	image: Image
}

export interface Image {
	data: Data
}

export interface Data {
	id: number
	attributes: DataAttributes
}

export interface DataAttributes {
	name: string
	alternativeText: string
	caption: string
	width: number
	height: number
	formats: Formats
	hash: string
	ext: string
	mime: string
	size: number
	url: string
	previewURL: null
	provider: string
	providerMetadata: ProviderMetadata
	createdAt: Date
	updatedAt: Date
}

export interface Formats {
	thumbnail: Large
	large: Large
	medium: Large
	small: Large
}

export interface Large {
	name: string
	hash: string
	ext: string
	mime: string
	path: null
	width: number
	height: number
	size: number
	url: string
	providerMetadata: ProviderMetadata
}

export interface ProviderMetadata {
	publicID: string
	resourceType: string
}
