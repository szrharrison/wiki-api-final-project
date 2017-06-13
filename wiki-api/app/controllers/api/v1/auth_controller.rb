class Api::V1::AuthController < ApplicationController
  before_action :authorize_account!, only: :show
  def create
    begin
      @account = Account.find_by(username: params[:username])
    rescue Mongoid::Errors::DocumentNotFound
      render json: { error: 'incorrect username or password' }
      return
    end
    if @account.present? && @account.authenticate(params[:password])
      token = JWT.encode( {id: @account.id}, ENV['JWT_SECRET'], ENV['JWT_ALGORITHM'])
      render json: { account: {username: @account.username}, token: token}
    else
      render json: { error: 'incorrect username or password' }
    end
  end

  def show
    render json: current_account
  end
end
