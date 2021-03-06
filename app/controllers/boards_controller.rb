class BoardsController < ApplicationController
	before_filter :authenticate_user!
  # GET /boards
  # GET /boards.json
  def index
	unless user_signed_in?
		redirect_to "/auth/login"
		return
	end
	
    @boards = Board.getUserBoards(current_user.id)

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @boards }
    end
  end

  # GET /boards/1
  # GET /boards/1.json
  def show
  @board = Board.find(params[:id])
  gon.boardid=@board.id
  @stories = Story.findAllStoriesOfBoard(params[:id])
	@landed = Story.findStoriesOfBoard(params[:id],"landed")
	@in_flight = Story.findStoriesOfBoard(params[:id],"in-flight")
	@take_off = Story.findStoriesOfBoard(params[:id],"take-off")
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @stories }
    end
  end

  # GET /boards/new
  # GET /boards/new.json
  def new
    @board = Board.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @board }
    end
  end

  # GET /boards/1/edit
  def edit
    @board = Board.find(params[:id])
  end

  # POST /boards
  # POST /boards.json
  def create
    params[:board][:ownerid] = current_user.id
    @board = Board.new(params[:board])

    respond_to do |format|
      if @board.save
        format.html { redirect_to @board, notice: 'Board was successfully created.' }
        format.json { render json: @board, status: :created, location: @board }
      else
        format.html { render action: "new" }
        format.json { render json: @board.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /boards/1
  # PUT /boards/1.json
  def update

    @board = Board.find(params[:id])

    respond_to do |format|
      if @board.update_attributes(params[:board])
        format.html { redirect_to @board, notice: 'Board was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @board.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /boards/1
  # DELETE /boards/1.json
  def destroy
    @board = Board.find(params[:id])
    @board.destroy

    respond_to do |format|
      format.html { redirect_to boards_url }
      format.json { head :no_content }
    end
  end
  
  def invite
	@board = Board.find(params[:id])
	
	respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @board }
	end
  end
  
  def invitecreate
	@user = User.find_by_email(params[:email])
	if @user.nil?
	flash[:notice]="No user with that email exists"
	else
	flash[:notice]="User has been added as collaborator"
	@collaboration = UserCollaboratesOnBoard.new()
	
	@collaboration.boardid = params[:boardid]
	@collaboration.userid = @user.id
	
	@collaboration.save
	end
	
	
	redirect_to boards_url
	
  end
end
