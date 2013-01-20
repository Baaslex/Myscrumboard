class Story < ActiveRecord::Base
	def self.findAllStoriesOfBoard(id)
		conditions = {}
		conditions[:boardid] = id
		self.find(:all, :conditions => conditions)
	end
	def self.findStoriesOfBoard(id,lane)
		conditions = {}
		conditions[:boardid] = id
		conditions[:lane]=lane
		self.find(:all, :conditions => conditions)
	end
	
end
