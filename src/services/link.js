import { database } from '../firebase'
import uuidv1 from 'uuid/v1'

export default class LinkService {
  static async getAllLinks () {
    try {
      const allLinks = await database.ref('links').once('value')

      let result = []
      allLinks.forEach((childSnapshot) => {
        const childData = childSnapshot.val()
        result.push(childData)
      })
      return result
    } catch (error) {
      return error
    }
  }

  static async getLink (payload) {
    try {
      return await database.ref('links/' + payload.id).once('value')
    } catch (error) {
      return error
    }
  }

  static async deleteLink (id) {
    try {
      return await database.ref('links/' + id).remove()
    } catch (error) {
      return error
    }
  }

  static async updateLink (data) {
    const d = new Date()
    const timestamp = d.getTime()

    const obj = {
      id: data.id,
      title: data.title,
      url: data.url,
      isShared: data.isShared,
      tags: data.tags ? data.tags : [],
      updateAt: timestamp
    }
    try {
      await database.ref('links').child(data.id).update(obj)
      return obj
    } catch (error) {
      return error
    }
  }

  static async addlink (data) {
    const d = new Date()
    const timestamp = d.getTime()

    const obj = {
      id: uuidv1(),
      title: data.title,
      url: data.url,
      isShared: data.isShared,
      tags: (data.tags && data.tags.length > 0) ? data.tags : [],
      updateAt: timestamp
    }

    try {
      return await database.ref('links').child(obj.id).set(obj)
    } catch (error) {
      return error
    }
  }

  static async toggleShareLink (data) {
    const d = new Date()
    const timestamp = d.getTime()

    let obj = data
    obj['isShared'] = !obj['isShared']
    obj['updateAt'] = timestamp

    try {
      await database.ref('links').child(obj.id).update(obj)
      return obj
    } catch (error) {
      return error
    }
  }
}
