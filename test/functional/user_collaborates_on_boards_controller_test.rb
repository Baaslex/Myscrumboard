require 'test_helper'

class UserCollaboratesOnBoardsControllerTest < ActionController::TestCase
  setup do
    @user_collaborates_on_board = user_collaborates_on_boards(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:user_collaborates_on_boards)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create user_collaborates_on_board" do
    assert_difference('UserCollaboratesOnBoard.count') do
      post :create, user_collaborates_on_board: @user_collaborates_on_board.attributes
    end

    assert_redirected_to user_collaborates_on_board_path(assigns(:user_collaborates_on_board))
  end

  test "should show user_collaborates_on_board" do
    get :show, id: @user_collaborates_on_board
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @user_collaborates_on_board
    assert_response :success
  end

  test "should update user_collaborates_on_board" do
    put :update, id: @user_collaborates_on_board, user_collaborates_on_board: @user_collaborates_on_board.attributes
    assert_redirected_to user_collaborates_on_board_path(assigns(:user_collaborates_on_board))
  end

  test "should destroy user_collaborates_on_board" do
    assert_difference('UserCollaboratesOnBoard.count', -1) do
      delete :destroy, id: @user_collaborates_on_board
    end

    assert_redirected_to user_collaborates_on_boards_path
  end
end
