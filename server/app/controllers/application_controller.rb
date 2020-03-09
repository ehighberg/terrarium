class ApplicationController < ActionController::API
  SECRET_KEY = Rails.application.secrets.secret_key_base.to_s

  def encode(payload, exp = 24.hours.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, SECRET_KEY)
  end

  def decode(token)
    puts token
    decoded = JWT.decode(token, SECRET_KEY)[0]
    puts decoded
    HashWithIndifferentAccess.new decoded
  end

  def authorize_request
    header = request.headers['Authorization']
    header = header.split(' ').last if header
    puts header
    begin
      @decoded = decode(header)
      puts @decoded
      @current_user = User.find(@decoded[:user_id])
    rescue ActiveRecord::RecordNotFound => e
      puts 'RecordNotFound'
      render json: { errors: e.message }, status: :unauthorized
    rescue JWT::DecodeError => e
      puts 'DecodeError'
      render json: { errors: e.message }, status: :unauthorized
    end
  end
end
