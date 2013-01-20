class CreateStories < ActiveRecord::Migration
  def change
    create_table :stories do |t|
      t.integer :id
      t.integer :boardid
      t.text :text
      t.string :lane
      t.string :color
      t.integer :lastmodif

      t.timestamps
    end
  end
end
