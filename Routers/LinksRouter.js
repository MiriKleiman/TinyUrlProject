import express from 'express'
import LinksController from "../Controllers/LinksController.js"

const LinksRouter = express.Router()

LinksRouter.get('/', LinksController.getList)

LinksRouter.get('/:id', LinksController.getById)

LinksRouter.post('/', LinksController.add)

LinksRouter.put('/:id', LinksController.update)

LinksRouter.delete('/:id', LinksController.delete)
// LinksRouter.getLinkListBySource('/:id', LinksController.getLinkListBySource)
LinksRouter.get('/source/:id', LinksController.getLinkClicksBySource)

export default LinksRouter