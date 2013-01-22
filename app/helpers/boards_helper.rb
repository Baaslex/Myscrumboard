module BoardsHelper
	def invite_path(board)
		"/boards/invite/#{board.id}"
	end

end
