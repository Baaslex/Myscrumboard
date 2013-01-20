class CreateBoards < ActiveRecord::Migration
  def change
    create_table :boards do |t|
      t.integer :id
      t.integer :ownerid
      t.string :privacy
      t.string :name

      t.timestamps
    end
  end
end
