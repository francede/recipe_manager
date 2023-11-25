/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Book = "book",
	Recipe = "recipe",
	RecipeIngredients = "recipe_ingredients",
	Tag = "tag",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type BookRecord = {
	name: string
	recipes?: RecordIdString[]
	description?: string
	tags?: RecordIdString[]
	owner: RecordIdString
}

export type RecipeRecord = {
	name: string
	description?: string
	image?: string
	owner: RecordIdString
	ingredients?: RecordIdString[]
	tags?: RecordIdString[]
	servings?: number
}

export type RecipeIngredientsRecord = {
	name: string
	amount?: number
	unit?: string
	recipe: RecordIdString
}

export type TagRecord = {
	name: string
}

export type UsersRecord = {
	name?: string
	avatar?: string
}

// Response types include system fields and match responses from the PocketBase API
export type BookResponse<Texpand = unknown> = BookRecord & BaseSystemFields<Texpand>
export type RecipeResponse<Texpand = unknown> = RecipeRecord & BaseSystemFields<Texpand>
export type RecipeIngredientsResponse<Texpand = unknown> = RecipeIngredientsRecord & BaseSystemFields<Texpand>
export type TagResponse = TagRecord & BaseSystemFields
export type UsersResponse = UsersRecord & AuthSystemFields

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	book: BookRecord
	recipe: RecipeRecord
	recipe_ingredients: RecipeIngredientsRecord
	tag: TagRecord
	users: UsersRecord
}

export type CollectionResponses = {
	book: BookResponse
	recipe: RecipeResponse
	recipe_ingredients: RecipeIngredientsResponse
	tag: TagResponse
	users: UsersResponse
}