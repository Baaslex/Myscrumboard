class CreateUserCollaboratesOnBoards < ActiveRecord::Migration
  def change
    create_table :user_collaborates_on_boards do |t|
      t.integer :userid
      t.integer :boardid

      t.timestamps
    end
  end
end
