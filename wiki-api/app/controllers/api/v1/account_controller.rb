class Api::V1::AccountController < ApplicationController
  before_action :authorize_account!, except: [:create]
  before_action :set_account, only: [:update]

  # POST '/signup'
  def create
    begin
      account = Account.find_by(username: params[:account][:username])
    rescue Mongoid::Errors::DocumentNotFound
      if @account = Account.create(
            username: params[:account][:username],
            password: params[:account][:password],
            first_name: params[:account][:last_name],
            last_name: params[:account][:last_name]
          )
        token = JWT.encode( {id: @account.id}, ENV['JWT_SECRET'], ENV['JWT_ALGORITHM'])
        render json: {
          account: {
            username: @account.username,
            first_name: @account.first_name,
            last_name: @account.last_name
            },
          token: token
        }
      else
        render json: { error: @account.errors.full_messages }
      end
      return
    end
    render json: { error: "A user already exists with that username." }
  end

  def update
    @account.update(
      username: params[:account][:username],
      first_name: params[:account][:last_name],
      last_name: params[:account][:last_name]
    )

    if @account.valid?
      render json: @account
    else
      render json: { error: @account.errors.full_messages }
    end
  end

  private

  def set_account
    @account = Account.find_by(username: params[:username])
  end
end
