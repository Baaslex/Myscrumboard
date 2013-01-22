class UserCollaboratesOnBoardsController < ApplicationController
  # GET /user_collaborates_on_boards
  # GET /user_collaborates_on_boards.json
  def index
    @user_collaborates_on_boards = UserCollaboratesOnBoard.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @user_collaborates_on_boards }
    end
  end

  # GET /user_collaborates_on_boards/1
  # GET /user_collaborates_on_boards/1.json
  def show
    @user_collaborates_on_board = UserCollaboratesOnBoard.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @user_collaborates_on_board }
    end
  end

  # GET /user_collaborates_on_boards/new
  # GET /user_collaborates_on_boards/new.json
  def new
    @user_collaborates_on_board = UserCollaboratesOnBoard.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @user_collaborates_on_board }
    end
  end

  # GET /user_collaborates_on_boards/1/edit
  def edit
    @user_collaborates_on_board = UserCollaboratesOnBoard.find(params[:id])
  end

  # POST /user_collaborates_on_boards
  # POST /user_collaborates_on_boards.json
  def create
    @user_collaborates_on_board = UserCollaboratesOnBoard.new(params[:user_collaborates_on_board])

    respond_to do |format|
      if @user_collaborates_on_board.save
        format.html { redirect_to @user_collaborates_on_board, notice: 'User collaborates on board was successfully created.' }
        format.json { render json: @user_collaborates_on_board, status: :created, location: @user_collaborates_on_board }
      else
        format.html { render action: "new" }
        format.json { render json: @user_collaborates_on_board.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /user_collaborates_on_boards/1
  # PUT /user_collaborates_on_boards/1.json
  def update
    @user_collaborates_on_board = UserCollaboratesOnBoard.find(params[:id])

    respond_to do |format|
      if @user_collaborates_on_board.update_attributes(params[:user_collaborates_on_board])
        format.html { redirect_to @user_collaborates_on_board, notice: 'User collaborates on board was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @user_collaborates_on_board.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /user_collaborates_on_boards/1
  # DELETE /user_collaborates_on_boards/1.json
  def destroy
    @user_collaborates_on_board = UserCollaboratesOnBoard.find(params[:id])
    @user_collaborates_on_board.destroy

    respond_to do |format|
      format.html { redirect_to user_collaborates_on_boards_url }
      format.json { head :no_content }
    end
  end
end
