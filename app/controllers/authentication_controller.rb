class AuthenticationController < ApplicationController
  before_action :authorize_request, except: :login

  def login
    @user = User.find_by_username(login_params[:username])
    if @user.authenticate(login_params[:password])
      token = encode(user_id: @user.id, username: @user.username)
      render json: { user: @user, token: token }, status: :ok
    else
      render json: { error: 'unauthorized' }, status: :unauthorized
    end
  end

  def verify
    token = encode(user_id: @current_user.id)
    render json: { user: @current_user, token: token }, status: :ok
  end

  private

  def login_params
    params.permit(:username, :password)
  end
end
