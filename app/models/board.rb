class Board < ActiveRecord::Base

	def self.getUserBoards(id)
	
	Board.where("boards.ownerid = ? or boards.id in (select boardid from user_collaborates_on_boards where userid = ?)",id,id)	
	
	end

end
