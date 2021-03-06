class UserController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]
  before_action :authorize_request, except: [:create, :index]

  def index
    @users = User.select('id', 'username').all
    render json: @users
  end

  def show
    render json: @user
  end

  def create
    @user = User.new(user_params)
    @user.role = 'user'

    if @user.save
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @user.destroy
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.permit(:username, :email, :password, :name)
  end
end
