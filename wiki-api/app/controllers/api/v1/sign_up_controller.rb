class Api::V1::SignUpController < ApplicationController
  before_action :authorize_account!, except: [:create]

  def create
    if @account = Account.create(account_params)
      token = JWT.encode( {id: @account.id}, ENV['JWT_SECRET'], ENV['JWT_ALGORITHM'])
      render json: { account: {username: @account.username}, token: token}
    else
      render json: { errors: @account.errors.full_messages }
    end
  end

  def show
    render json: current_account
  end

  private

  def account_params
    params.require(:account).permit(:username, :password, :first_name, :last_name)
  end
end
