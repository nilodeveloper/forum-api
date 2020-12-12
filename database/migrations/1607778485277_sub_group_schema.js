'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SubGroupSchema extends Schema {
  up () {
    this.create('sub_groups', (table) => {
      table.increments()
			table.string('name')
      table.timestamps()
    })
  }

  down () {
    this.drop('sub_groups')
  }
}

module.exports = SubGroupSchema
