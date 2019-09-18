/**
 * Define Project Document and Model.
 */

import * as mongoose from 'mongoose'
import { IProjectDocument } from './project'

/**
 * Define Author Document
 */
export interface IAuthorDocument extends mongoose.Document {
  id: string

  /**
   * Each Author can retrieve multiple owned Project
   * documents (one-to-many relationship) using `projects` virtual property.
   */
  projects: Array<{
    _id: IProjectDocument['_id']
    name: IProjectDocument['name']
    algorithm: IProjectDocument['algorithm']
    createdAt: IProjectDocument['createdAt']
    updatedAt: IProjectDocument['updatedAt']
  }>
}

/**
 * Define Author Model.
 */
export interface IAuthorModel extends mongoose.Model<IAuthorDocument> {
  upsertGoogleUser(profile: any): Promise<IAuthorDocument>
  getProjects(authorId: IAuthorDocument['id']): Promise<IAuthorDocument | null>
}

const Schema = mongoose.Schema

const AuthorSchema = new Schema(
  {
    id: {
      required: true,
      trim: true,
      type: String,
      unique: true,
    },
  },
)

AuthorSchema.virtual('projects', {
  foreignField: 'authorId',
  localField: 'id',
  ref: 'Project',
})

/**
 * Create a new Author entry or return existing one.s
 * When an author signs in using Google OAuth and is verified,
 * then we execute this method.
 */
AuthorSchema.static('upsertGoogleUser', async function(
  this: IAuthorModel,
  profile: any,
): Promise<IAuthorDocument> {
  const user = await this.findOne({ id: profile.id }).exec()

  if (user) {
    return user
  } else {
    const newUser = new this({
      id: profile.id,
    })

    const savedUser = await newUser.save()
    return savedUser
  }
})

AuthorSchema.static('getProjects', async function(
  this: IAuthorModel,
  authorId: IAuthorDocument['id'],
): Promise<IAuthorDocument | null> {
  const projects = await this.findOne({ id: authorId })
    .populate({
      path: 'projects',
      select: '_id name algorithm createdAt updatedAt',
    })
    .exec()
  return projects
})

const Author: IAuthorModel = mongoose.model<IAuthorDocument, IAuthorModel>(
  'Author',
  AuthorSchema,
)

export default Author
