/**
 * Define Project Document and Model.
 */

import * as mongoose from 'mongoose'
import { IAuthorDocument } from './author'

/**
 * Define Project Document
 */
export interface IProjectDocument extends mongoose.Document {
  algorithm: string
  authorId: string
  content: string
  name: string

  /**
   * Auto generated using `timestamps` option in Project Schema.
   */
  createdAt: Date

  /**
   * Auto generated using `timestamps` option in Project Schema.
   */
  updatedAt: Date
}

/**
 * Define Project Model.
 */
export interface IProjectModel extends mongoose.Model<IProjectDocument> {
  createProject(
    project: IProjectDocument,
    authorId: IAuthorDocument['id'],
  ): Promise<IProjectDocument>
  getProject(
    projectId: IProjectDocument['_id'],
  ): Promise<IProjectDocument | null>
  deleteProject(projectId: IProjectDocument['_id']): void
  updateProject(
    projectId: IProjectDocument['_id'],
    updateParams: IProjectDocument,
  ): void
}

const Schema = mongoose.Schema

const ProjectSchema = new Schema(
  {
    algorithm: {
      required: true,
      trim: true,
      type: String,
    },
    authorId: {
      ref: 'Author',
      type: String,
    },
    content: {
      required: true,
      trim: true,
      type: String,
    },
    name: {
      required: true,
      trim: true,
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

ProjectSchema.static('createProject', async function(
  this: IProjectModel,
  project: IProjectDocument,
  authorId: IAuthorDocument['id'],
): Promise<IProjectDocument> {
  const newproject = new this({
    algorithm: project.algorithm,
    authorId,
    content: project.content,
    name: project.name,
  })

  const savedProject = await newproject.save()
  return savedProject
})

ProjectSchema.static('getProject', async function(
  this: IProjectModel,
  projectId: IProjectDocument['_id'],
): Promise<IProjectDocument | null> {
  const project = await this.findOne({ _id: projectId }).exec()
  return project
})

ProjectSchema.static('deleteProject', async function(
  this: IProjectModel,
  projectId: IProjectDocument['_id'],
) {
  await this.deleteOne({ _id: projectId }).exec()
})

ProjectSchema.static('updateProject', async function(
  this: IProjectModel,
  projectId: IProjectDocument['_id'],
  updateParams: IProjectDocument,
) {
  await this.updateOne({ _id: projectId }, { $set: updateParams }).exec()
})

const Project: IProjectModel = mongoose.model<IProjectDocument, IProjectModel>(
  'Project',
  ProjectSchema,
)

export default Project
